import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { Button } from '../button/button'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog'

function renderAlertDialog({
  title = 'Delete project',
  description = 'This action cannot be undone.',
  backdrop,
  contentClassName,
}: {
  title?: string
  description?: string
  backdrop?: boolean
  contentClassName?: string
} = {}) {
  return render(
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive">Delete</Button>} />
      <AlertDialogContent className={contentClassName} {...(backdrop !== undefined ? { backdrop } : {})}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogBody>Everything in this project will be removed.</AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogClose render={<Button variant="outline">Cancel</Button>} />
          <AlertDialogClose render={<Button variant="destructive">Delete</Button>} />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>,
  )
}

describe('AlertDialog', () => {
  it('tags the trigger with data-slot', () => {
    renderAlertDialog()
    expect(screen.getByRole('button', { name: 'Delete' }).getAttribute('data-slot')).toBe('alert-dialog-trigger')
  })

  it('does not render content before being opened', () => {
    renderAlertDialog()
    expect(screen.queryByText('Everything in this project will be removed.')).toBeNull()
  })

  it('opens on trigger click and exposes a labelled alertdialog', async () => {
    const user = userEvent.setup()
    renderAlertDialog()

    await user.click(screen.getByRole('button', { name: 'Delete' }))

    const dialog = await screen.findByRole('alertdialog')
    expect(dialog).toHaveAccessibleName('Delete project')
    expect(dialog).toHaveAccessibleDescription('This action cannot be undone.')

    const title = screen.getByText('Delete project')
    expect(title.getAttribute('data-slot')).toBe('alert-dialog-title')
    expect(title.className).toContain('text-foreground-intense')
    expect(title.className).toContain('font-semibold')
  })

  it('forwards className to the content popup', async () => {
    const user = userEvent.setup()
    renderAlertDialog({ contentClassName: 'w-200' })

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    const dialog = await screen.findByRole('alertdialog')

    expect(dialog.getAttribute('data-slot')).toBe('alert-dialog-popup')
    expect(dialog.className).toContain('w-200')
    expect(dialog.className).not.toContain('w-150')
  })

  it('does not render a built-in close button', async () => {
    const user = userEvent.setup()
    renderAlertDialog()

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    await screen.findByRole('alertdialog')

    expect(document.querySelector('[data-slot="alert-dialog-close-button"]')).toBeNull()
  })

  it('omits the backdrop when backdrop is false', async () => {
    const user = userEvent.setup()
    renderAlertDialog({ backdrop: false })

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    await screen.findByRole('alertdialog')

    expect(document.querySelector('[data-slot="alert-dialog-backdrop"]')).toBeNull()
  })

  it('does not close on an outside click (requires an explicit choice)', async () => {
    const user = userEvent.setup()
    renderAlertDialog()

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    await screen.findByRole('alertdialog')

    await user.click(document.body)
    expect(screen.getByRole('alertdialog')).toBeInTheDocument()
  })

  it('closes when an AlertDialogClose action is clicked', async () => {
    const user = userEvent.setup()
    renderAlertDialog()

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    await screen.findByRole('alertdialog')

    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).toBeNull()
    })
  })

  it('has no accessibility violations when open', async () => {
    const user = userEvent.setup()
    renderAlertDialog()

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    const dialog = await screen.findByRole('alertdialog')

    // Scope to the dialog subtree: Base UI's focus-guard sibling spans are
    // framework internals outside our control.
    expect(await axe(dialog)).toHaveNoViolations()
  })
})
