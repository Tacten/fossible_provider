import { useParams } from 'react-router-dom'
import { PatientSummarySidebar } from '../components/encounter/PatientSummarySidebar'
import { ClinicalNotesTab } from '../components/encounter/ClinicalNotesTab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, CheckCircle } from 'lucide-react'

// Mock Data
const MOCK_PATIENT = {
    name: 'PAT-001',
    owner: 'admin',
    creation: '2023-01-01',
    modified: '2023-01-01',
    modified_by: 'admin',
    docstatus: 0 as const,
    idx: 0,
    patient_name: 'John Doe',
    sex: 'Male' as const,
    dob: '1990-05-15',
    mobile: '+1 555-0123',
    email: 'john.doe@example.com'
}

const MOCK_VITALS = [
    { name: 'VS-001', owner: 'admin', creation: '2023-10-25', modified: '2023-10-25', modified_by: 'admin', docstatus: 0 as const, idx: 0, patient: 'PAT-001', sign: 'BP', value: '120/80', unit: 'mmHg', date: '2023-10-25', time: '09:00' },
    { name: 'VS-002', owner: 'admin', creation: '2023-10-25', modified: '2023-10-25', modified_by: 'admin', docstatus: 0 as const, idx: 0, patient: 'PAT-001', sign: 'Temp', value: '98.6', unit: 'F', date: '2023-10-25', time: '09:00' },
]


export function EncounterDetailsPage() {
    const { id } = useParams()

    return (
        <div className="flex h-full overflow-hidden">
            {/* Left Sidebar - Patient Context */}
            <aside className="w-[300px] border-r border-border bg-sidebar/30 overflow-y-auto p-6">
                <PatientSummarySidebar patient={MOCK_PATIENT} vitals={MOCK_VITALS} />
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full min-w-0">

                {/* Header / Action Bar */}
                <header className="flex items-center justify-between px-8 py-4 border-b border-border bg-background">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <span>Encounters</span>
                            <span>/</span>
                            <span>{id}</span>
                        </div>
                        <h1 className="text-lg font-semibold tracking-tight">Consultation</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="h-9 px-4 text-sm font-medium border border-border rounded-md hover:bg-accent transition-colors flex items-center gap-2">
                            <Save className="w-4 h-4" />
                            Save Draft
                        </button>
                        <button className="h-9 px-4 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Billed & Complete
                        </button>
                    </div>
                </header>

                {/* Tabs Area */}
                <div className="flex-1 overflow-y-auto p-8">
                    <Tabs defaultValue="notes" className="w-full">
                        <TabsList className="mb-6">
                            <TabsTrigger value="notes">Clinical Notes</TabsTrigger>
                            <TabsTrigger value="history">History</TabsTrigger>
                            <TabsTrigger value="progress">Progress</TabsTrigger>
                        </TabsList>

                        <TabsContent value="notes">
                            <ClinicalNotesTab />
                        </TabsContent>

                        <TabsContent value="history">
                            <div className="p-8 text-center text-muted-foreground border border-border rounded-lg border-dashed">
                                Patient history timeline coming soon.
                            </div>
                        </TabsContent>

                        <TabsContent value="progress">
                            <div className="p-8 text-center text-muted-foreground border border-border rounded-lg border-dashed">
                                Vitals charts and progress graphs coming soon.
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}
