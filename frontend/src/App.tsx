import { AppLayout } from './components/layout/AppLayout'
import { Circle, CheckCircle2, AlertCircle } from 'lucide-react'

// Mock Data
const problems = [
  { id: 'PRO-123', title: 'Fix navigation z-index issue', status: 'In Progress', priority: 'High', date: 'Today' },
  { id: 'PRO-124', title: 'Update documentation for API', status: 'Todo', priority: 'Medium', date: 'Yesterday' },
  { id: 'PRO-125', title: 'Implement dark mode toggle', status: 'In Progress', priority: 'High', date: 'Oct 24' },
  { id: 'PRO-126', title: 'Refactor state management', status: 'Done', priority: 'Low', date: 'Oct 22' },
  { id: 'PRO-127', title: 'Design system audit', status: 'Todo', priority: 'Medium', date: 'Oct 20' },
]

function StatusIcon({ status }: { status: string }) {
  if (status === 'In Progress') return <Circle className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500/20" />
  if (status === 'Done') return <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
  return <Circle className="w-3.5 h-3.5 text-muted-foreground" />
}

function PriorityIcon({ priority }: { priority: string }) {
  if (priority === 'High') return <AlertCircle className="w-3.5 h-3.5 text-orange-500" />
  if (priority === 'Medium') return <div className="w-3.5 h-1 rounded-full bg-yellow-500" />
  return <div className="w-3.5 h-1 rounded-full bg-muted-foreground" />
}

function App() {
  return (
    <AppLayout>
      <div className="p-8 max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>Acme Corp</span>
              <span>/</span>
              <span>Engineering</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Active Issues</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-8 px-3 text-sm font-medium border border-border rounded-md bg-background hover:bg-accent/50 transition-colors">
              Filter
            </button>
            <button className="h-8 px-3 text-sm font-medium border border-border rounded-md bg-background hover:bg-accent/50 transition-colors">
              Display
            </button>
          </div>
        </header>

        {/* List */}
        <div className="border border-border rounded-lg bg-card/50 overflow-hidden shadow-sm">
          {/* List Header */}
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-2 border-b border-border bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <div className="w-6 text-center">#</div>
            <div>Title</div>
            <div className="w-24">Status</div>
            <div className="w-24">Priority</div>
            <div className="w-24 text-right">Created</div>
          </div>

          {/* List Items */}
          <div className="divide-y divide-border">
            {problems.map((issue) => (
              <div key={issue.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-3 items-center hover:bg-accent/30 transition-colors group cursor-default">
                <div className="w-6 flex justify-center">
                  <input type="checkbox" className="opacity-0 group-hover:opacity-100 transition-opacity rounded border-muted-foreground/50 w-3.5 h-3.5" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground font-mono">{issue.id}</span>
                  <span className="text-sm font-medium text-foreground">{issue.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon status={issue.status} />
                  <span className="text-xs text-muted-foreground">{issue.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PriorityIcon priority={issue.priority} />
                  <span className="text-xs text-muted-foreground">{issue.priority}</span>
                </div>
                <div className="text-xs text-muted-foreground text-right">{issue.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default App
