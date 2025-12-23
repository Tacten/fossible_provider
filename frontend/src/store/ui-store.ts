import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { get, set, del } from 'idb-keyval'

// Custom storage adapter for idb-keyval
const storage = {
    getItem: async (name: string): Promise<string | null> => {
        return (await get(name)) || null
    },
    setItem: async (name: string, value: string): Promise<void> => {
        await set(name, value)
    },
    removeItem: async (name: string): Promise<void> => {
        await del(name)
    },
}

interface UIState {
    sidebarOpen: boolean
    toggleSidebar: () => void
    setSidebarOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>()(
    devtools(
        persist(
            (set) => ({
                sidebarOpen: true,
                toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
                setSidebarOpen: (open) => set({ sidebarOpen: open }),
            }),
            {
                name: 'ui-storage', // unique name
                storage: createJSONStorage(() => storage),
            }
        )
    )
)
