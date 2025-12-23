import {
    CalendarDays,
    ClipboardList,
    Users,
    Settings,
    HelpCircle,
    LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { NavLink } from 'react-router-dom'

interface SidebarItemProps {
    icon: React.ElementType
    label: string
    to: string
}

function SidebarItem({ icon: Icon, label, to }: SidebarItemProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => cn(
                "group flex items-center justify-between px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer select-none",
                isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}
        >
            <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span>{label}</span>
            </div>
        </NavLink>
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

            {/* Provider Info */}
            <div className="px-4 mb-6 flex items-center gap-2 text-sidebar-foreground font-semibold">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground font-bold">
                    DR
                </div>
                <div className="flex flex-col overflow-hidden">
                    <span className="text-sm truncate">Dr. Smith</span>
                    <span className="text-[10px] text-muted-foreground font-normal truncate">Cardiology</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2">
                <SidebarSection title="Clinical">
                    <SidebarItem icon={CalendarDays} label="Schedule" to="/" />
                    <SidebarItem icon={ClipboardList} label="Encounters" to="/encounters" />
                    <SidebarItem icon={Users} label="Patients" to="/patients" />
                </SidebarSection>

                <SidebarSection title="System">
                    <SidebarItem icon={Settings} label="Settings" to="/settings" />
                    <SidebarItem icon={HelpCircle} label="Help & Support" to="/help" />
                </SidebarSection>
            </div>

            <div className="px-2 mt-auto">
                <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-red-500/70 hover:bg-red-500/10 hover:text-red-600 transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                </button>
            </div>
        </div >
    )
}
