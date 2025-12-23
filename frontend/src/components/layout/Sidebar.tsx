import {
    Inbox,
    ListTodo,
    SignalHigh,
    Users,
    Hash,
    Settings,
    HelpCircle,
    Plus
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface SidebarItemProps {
    icon: React.ElementType
    label: string
    active?: boolean
    hasAction?: boolean
}

function SidebarItem({ icon: Icon, label, active, hasAction }: SidebarItemProps) {
    return (
        <div
            className={cn(
                "group flex items-center justify-between px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer select-none",
                active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}
        >
            <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span>{label}</span>
            </div>
            {hasAction && (
                <button className="opacity-0 group-hover:opacity-100 hover:bg-background/20 rounded p-0.5 transition-opacity">
                    <Plus className="w-3 h-3" />
                </button>
            )}
        </div>
    )
}

function SidebarSection({ title, children }: { title?: string, children: React.ReactNode }) {
    return (
        <div className="mb-6">
            {title && (
                <h3 className="px-3 mb-2 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
                    {title}
                </h3>
            )}
            <div className="space-y-0.5">
                {children}
            </div>
        </div>
    )
}

export function Sidebar() {
    return (
        <div className="w-[240px] h-screen bg-sidebar border-r border-sidebar-border flex flex-col pt-4 pb-4">

            {/* User / Workspace */}
            <div className="px-4 mb-6 flex items-center gap-2 text-sidebar-foreground font-semibold">
                <div className="w-5 h-5 rounded bg-primary flex items-center justify-center text-[10px] text-primary-foreground">
                    A
                </div>
                <span className="text-sm">Acme Corp</span>
            </div>

            <div className="flex-1 overflow-y-auto px-2">
                <SidebarSection>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="px-3 py-1.5 mb-2 flex items-center gap-2 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground cursor-pointer">
                                <div className="w-4 h-4 rounded-full border border-sidebar-foreground/30 flex items-center justify-center">
                                    <Plus className="w-2.5 h-2.5" />
                                </div>
                                <span>New Issue</span>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create New Issue</DialogTitle>
                                <DialogDescription>
                                    Add a new task to your roadmap. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <label htmlFor="title" className="text-sm font-medium">
                                        Title
                                    </label>
                                    <input
                                        id="title"
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Bug report title..."
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="desc" className="text-sm font-medium">
                                        Description
                                    </label>
                                    <textarea
                                        id="desc"
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Describe the issue..."
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Create Issue</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <div className="px-3 py-1.5 mb-4 flex items-center gap-2 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground cursor-pointer">
                        <div className="w-4 h-4 relative">
                            <span className="absolute inset-0 bg-sidebar-foreground/20 rounded-full animate-ping opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-transparent border border-sidebar-foreground/30 items-center justify-center">
                                <span className="w-2 h-2 rounded-full bg-sidebar-foreground/50"></span>
                            </span>
                        </div>
                        <span>Search</span>
                    </div>
                </SidebarSection>

                <SidebarSection>
                    <SidebarItem icon={Inbox} label="Inbox" active />
                    <SidebarItem icon={ListTodo} label="My Issues" />
                    <SidebarItem icon={SignalHigh} label="Views" />
                </SidebarSection>

                <SidebarSection title="Your Teams">
                    <SidebarItem icon={Hash} label="Engineering" hasAction />
                    <SidebarItem icon={Hash} label="Design" hasAction />
                    <SidebarItem icon={Hash} label="Marketing" hasAction />
                </SidebarSection>

                <SidebarSection title="Projects">
                    <SidebarItem icon={Users} label="Roadmap Q4" />
                    <SidebarItem icon={Users} label="Mobile App" />
                </SidebarSection>
            </div>

            <div className="px-2 mt-auto">
                <SidebarSection>
                    <SidebarItem icon={HelpCircle} label="Help & Support" />
                    <SidebarItem icon={Settings} label="Settings" />
                </SidebarSection>
            </div>
        </div >
    )
}
