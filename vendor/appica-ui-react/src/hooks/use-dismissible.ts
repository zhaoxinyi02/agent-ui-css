'use client'

import { useCallback, useMemo } from 'react'
import { useStorage, type StorageBackend } from './use-local-storage'

export interface UseDismissibleOptions {
  storage?: StorageBackend
}

export interface UseDismissibleReturn {
  open: boolean
  dismiss: () => void
  reset: () => void
}

/**
 * Tracks whether a dismissible surface (banner, callout, etc.) should still be
 * shown, persisting the dismissal under `key`. SSR-safe (`open` is `true` until
 * the stored value is known) and synced across tabs and components.
 */
export function useDismissible(key: string, { storage = 'local' }: UseDismissibleOptions = {}): UseDismissibleReturn {
  // Raw string flag ('1' = dismissed); empty/default means open.
  const [flag, setFlag, removeFlag] = useStorage<string>(storage, key, '', {
    serializer: (v) => v,
    deserializer: (v) => v,
  })

  const open = flag !== '1'
  const dismiss = useCallback(() => setFlag('1'), [setFlag])
  const reset = useCallback(() => removeFlag(), [removeFlag])

  return useMemo(() => ({ open, dismiss, reset }), [open, dismiss, reset])
}
