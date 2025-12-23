

export function ClinicalNotesTab() {
    return (
        <div className="space-y-6 max-w-3xl">
            <div className="grid gap-4">
                <div>
                    <label className="text-sm font-medium mb-1.5 block">Subjective</label>
                    <textarea
                        className="w-full min-h-[100px] p-3 rounded-md border border-input bg-transparent text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        placeholder="Patient's chief complaint, history of present illness..."
                    />
                </div>
                <div>
                    <label className="text-sm font-medium mb-1.5 block">Objective</label>
                    <textarea
                        className="w-full min-h-[100px] p-3 rounded-md border border-input bg-transparent text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        placeholder="Physical exam findings, vital signs interpretation..."
                    />
                </div>
                <div>
                    <label className="text-sm font-medium mb-1.5 block">Assessment</label>
                    <textarea
                        className="w-full min-h-[80px] p-3 rounded-md border border-input bg-transparent text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        placeholder="Diagnosis, differential diagnosis..."
                    />
                </div>
                <div>
                    <label className="text-sm font-medium mb-1.5 block">Plan</label>
                    <textarea
                        className="w-full min-h-[100px] p-3 rounded-md border border-input bg-transparent text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        placeholder="Treatment plan, prescriptions, follow-up..."
                    />
                </div>
            </div>
        </div>
    )
}
