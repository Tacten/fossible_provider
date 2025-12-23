// Common Frappe Types
export interface FrappeDoc {
    name: string;
    owner: string;
    creation: string;
    modified: string;
    modified_by: string;
    docstatus: 0 | 1 | 2;
    idx: number;
    [key: string]: any;
}

// Healthcare DocTypes

export interface Practitioner extends FrappeDoc {
    practitioner_name: string;
    user_id: string; // Link to User
    department?: string; // Link to Medical Department
    mobile_phone?: string;
    cw_days?: string; // Comma separated days
    cw_start?: string; // Start time
    cw_end?: string; // End time
}

export interface Patient extends FrappeDoc {
    patient_name: string;
    sex: 'Male' | 'Female' | 'Other';
    dob?: string;
    mobile?: string;
    email?: string;
    blood_group?: string;
}

export interface Appointment extends FrappeDoc {
    patient: string; // Link to Patient
    practitioner: string; // Link to Practitioner
    appointment_date: string;
    appointment_time: string;
    duration: number;
    status: 'Scheduled' | 'Open' | 'Closed' | 'Cancelled' | 'Expired';
    appointment_type?: string;
}

export interface PatientEncounter extends FrappeDoc {
    patient: string; // Link to Patient
    practitioner: string; // Link to Practitioner
    encounter_date: string;
    encounter_time: string;
    status: 'Draft' | 'Completed' | 'Cancelled';
    symptoms?: string; // Rich Text or String
    diagnosis?: string;
    drug_prescription?: any[]; // Child Table
    lab_test_prescription?: any[]; // Child Table

    // SOAP Note standard fields (custom or mapped)
    subjective?: string;
    objective?: string;
    assessment?: string;
    plan?: string;
}

export interface VitalSign extends FrappeDoc {
    patient: string;
    sign: string; // e.g., 'BP', 'Temperature'
    value: string;
    unit: string;
    date: string;
    time: string;
}
