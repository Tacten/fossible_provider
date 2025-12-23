import { useEffect, useState } from 'react'
import type { PatientEncounter } from '../types/doctype'
import { useFrappe } from '../hooks/useFrappe'
import { Calendar } from 'lucide-react'

const MOCK_ENCOUNTERS: PatientEncounter[] = [
    {
        name: 'ENC-2023-001',
        patient: 'John Doe',
        practitioner: 'Dr. Smith',
        encounter_date: '2023-10-24',
        encounter_time: '14:30:00',
        status: 'Completed',
        owner: 'admin',
        creation: '2023-10-24',
        modified: '2023-10-24',
        modified_by: 'admin',
        docstatus: 1,
        idx: 0
    },
    {
        name: 'ENC-2023-002',
        patient: 'Alice Bob',
        practitioner: 'Dr. Smith',
        encounter_date: '2023-10-25',
        encounter_time: '10:00:00',
        status: 'Draft',
        owner: 'admin',
        creation: '2023-10-25',
        modified: '2023-10-25',
        modified_by: 'admin',
        docstatus: 0,
        idx: 0
    }
]

export function EncounterListPage() {
    const { getList, loading, error } = useFrappe()
    const [encounters, setEncounters] = useState<PatientEncounter[]>([])

    useEffect(() => {
        const fetchEncounters = async () => {
            const data = await getList<PatientEncounter>('Patient Encounter',
                ['name', 'patient', 'encounter_date', 'encounter_time', 'status'],
                [],
                'encounter_date desc'
            )
            if (data && data.length > 0) {
                setEncounters(data)
            } else {
                setEncounters(MOCK_ENCOUNTERS)
            }
        }
        fetchEncounters()
    }, [getList])

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <header className="mb-8">
                <h1 className="text-2xl font-semibold tracking-tight">Encounters</h1>
                <p className="text-muted-foreground">Patient Consultation History</p>
            </header>

            {loading && <div className="text-muted-foreground">Loading...</div>}
            {error && <div className="text-red-500 mb-4">Error: {error}</div>}

            <div className="border border-border rounded-lg bg-card overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                        <tr>
                            <th className="px-4 py-3">Patient</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {encounters.map(enc => (
                            <tr key={enc.name} className="hover:bg-accent/30 transition-colors">
                                <td className="px-4 py-3 font-medium">{enc.patient}</td>
                                <td className="px-4 py-3 text-muted-foreground flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {enc.encounter_date} {enc.encounter_time.substring(0, 5)}
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-0.5 text-xs rounded-full ${enc.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                        'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {enc.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button className="text-primary hover:underline">Open</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
