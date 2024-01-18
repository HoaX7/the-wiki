export interface ISidebarProps {
    history: string[]
    search: string
    toggleSearch: (text: string) => void
    reset: () => void
    toggleSideBar: boolean
    setShowSearch: (bool: boolean) => void
    showSearch: boolean
}