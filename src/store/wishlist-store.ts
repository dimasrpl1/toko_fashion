import { create } from 'zustand'

interface State {
  ids: Set<string>
  isLoaded: boolean
  isLoggedIn: boolean
}

interface Actions {
  init: (ids: string[], isLoggedIn: boolean) => void
  add: (id: string) => void
  remove: (id: string) => void
  has: (id: string) => boolean
}

export const useWishlistStore = create<State & Actions>((set, get) => ({
  ids: new Set<string>(),
  isLoaded: false,
  isLoggedIn: false,

  init: (ids, isLoggedIn) =>
    set({ ids: new Set(ids), isLoaded: true, isLoggedIn }),

  add: (id) =>
    set((s) => ({ ids: new Set([...s.ids, id]) })),

  remove: (id) =>
    set((s) => {
      const next = new Set(s.ids)
      next.delete(id)
      return { ids: next }
    }),

  has: (id) => get().ids.has(id),
}))
