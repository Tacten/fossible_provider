import { useEffect, useState } from 'react'
import type { Appointment } from '../types/doctype'
import { useFrappe } from '../hooks/useFrappe'
import { Clock, User } from 'lucide-react'

// Mock data for development when API is not available
const MOCK_APPOINTMENTS: Appointment[] = [
    {
        name: 'APP-2023-001',
        patient: 'John Doe',
        practitioner: 'Dr. Smith',
        appointment_date: '2023-10-25',
        appointment_time: '09:00:00',
        duration: 30,
        status: 'Scheduled',
        owner: 'admin',
        creation: '2023-10-20',
        modified: '2023-10-20',
        modified_by: 'admin',
        docstatus: 0,
        idx: 0
    },
    {
        name: 'APP-2023-002',
        patient: 'Jane Roe',
        practitioner: 'Dr. Smith',
        appointment_date: '2023-10-25',
        appointment_time: '10:00:00',
        duration: 45,
        status: 'Open',
        owner: 'admin',
        creation: '2023-10-21',
        modified: '2023-10-21',
        modified_by: 'admin',
        docstatus: 0,
        idx: 0
    }
]

export function SchedulePage() {
    const { getList, loading, error } = useFrappe()
    const [appointments, setAppointments] = useState<Appointment[]>([])

    useEffect(() => {
        const fetchAppointments = async () => {
            // In a real scenario, we'd filter by the logged-in practitioner
            const data = await getList<Appointment>('Appointment',
                ['name', 'patient', 'appointment_date', 'appointment_time', 'status', 'duration'],
                [['status', '!=', 'Cancelled']]
            )

            if (data && data.length > 0) {
                setAppointments(data)
            } else {
                // Fallback to mock data if API returns empty (or fails silently in our hook for now)
                console.log('Using mock appointments')
                setAppointments(MOCK_APPOINTMENTS)
            }
        }

        fetchAppointments()
    }, [getList])

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Schedule</h1>
                    <p className="text-muted-foreground">My Appointments for Today</p>
                </div>
                <button className="h-9 px-4 text-sm font-medium bg-primary text-primary-foreground rounded-md shadow hover:bg-primary/90 transition-colors">
                    Mark Unavailable
                </button>
            </header>

            {loading && <div className="text-muted-foreground">Loading schedule...</div>}
            {error && <div className="text-red-500 mb-4">Error loading schedule: {error}</div>}

            <div className="space-y-4">
                {appointments.map((apt) => (
                    <div key={apt.name} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="flex flex-col items-center justify-center w-16 h-16 bg-muted rounded-md text-muted-foreground">
                                <span className="text-lg font-bold">{apt.appointment_time.substring(0, 5)}</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-lg flex items-center gap-2">
                                    {apt.patient}
                                    <span className={`px-2 py-0.5 text-xs rounded-full ${apt.status === 'Open' ? 'bg-green-100 text-green-700' :
                                        apt.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {apt.status}
                                    </span>
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{apt.duration} mins</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <User className="w-3.5 h-3.5" />
                                        <span>In Person</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="h-8 px-3 text-sm font-medium border border-border rounded-md hover:bg-accent transition-colors">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
