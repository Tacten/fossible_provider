import type { Patient, VitalSign } from '../../types/doctype'

interface PatientSummarySidebarProps {
    patient: Patient | null
    vitals: VitalSign[]
}

export function PatientSummarySidebar({ patient, vitals }: PatientSummarySidebarProps) {
    if (!patient) return <div className="p-4 text-muted-foreground">No patient selected</div>

    return (
        <div className="space-y-6">
            {/* Patient Header */}
            <div>
                <h2 className="text-xl font-semibold tracking-tight">{patient.patient_name}</h2>
                <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
                    <p>{patient.sex}, {patient.dob} (34y)</p>
                    <p>{patient.mobile}</p>
                    <p>{patient.email}</p>
                </div>
            </div>

            <div className="border border-border rounded-lg bg-card p-4">
                <h3 className="font-medium mb-3 text-sm">Vitals (Latest)</h3>
                <div className="space-y-3">
                    {vitals.map((v, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">{v.sign}</span>
                            <span className="font-semibold">{v.value} <span className="text-xs font-normal text-muted-foreground">{v.unit}</span></span>
                        </div>
                    ))}
                    {vitals.length === 0 && <span className="text-xs text-muted-foreground">No vitals recorded</span>}
                </div>
            </div>

            <div className="border border-border rounded-lg bg-card p-4">
                <h3 className="font-medium mb-3 text-sm">Medications</h3>
                <div className="text-sm text-muted-foreground">
                    No active medications.
                </div>
            </div>

            <div className="border border-border rounded-lg bg-card p-4">
                <h3 className="font-medium mb-3 text-sm">Allergies</h3>
                <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">Penicillin</span>
                </div>
            </div>
        </div>
    )
}
