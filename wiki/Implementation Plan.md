# Healthcare Provider App Transformation Plan

## Goal Description
Transform the current "fossible_provider" example React application into a specialized Healthcare Provider App. This app will serve as a frontend for ERPNext's Healthcare module, allowing practitioners to manage schedules and patient encounters efficiently.

## User Review Required
> [!IMPORTANT]
> **New Dependency**: We will need to add `frappe-js-sdk` or a custom API wrapper to interact with the ERPNext backend.
> **Design Pattern**: We are strictly following the "Linear-like" layout as requested, but adapting it for clinical workflows.

## Proposed Design & Changes

### 1. Phased Implementation Strategy
**Phase 1: Core Feature Parity (High Priority)**
Focus on establishing the connection with ERPNext and implementing all UI/UX features for Schedule and Encounters. The app must function fully while online.
**Phase 2: Offline Capabilities (Low Priority)**
Once the core features are stable, introduce caching and synchronization layers for offline support.

### 2. Architecture & Integration (Phase 1)
- **Backend**: ERPNext (Healthcare Module)
- **Frontend**: React 19 + Vite + Tailwind CSS v4
- **State Management**: Zustand (Global Store)
- **API Layer**:
    - Direct REST API calls via a custom `useFrappe` hook.
    - Authentication authentication handling.

### 3. Navigation Structure (Sidebar)
Refactor `Sidebar.tsx` to support clinical roles.
- **Top Section**:
    - **Schedule** (Calendar Icon): View daily/weekly appointments.
    - **Encounters** (Clipboard/Stethoscope Icon): Active and past patient encounters.
    - **Patients** (Users Icon): Directory of patients (if applicable).
- **Bottom Section**:
    - Settings / Profile.

### 3. Core Views

#### A. Schedule View (`/schedule`)
- **Doctypes**: `Appointment`, `Practitioner Schedule`.
- **Features**:
    - Calendar or List view of appointments for the logged-in Practitioner.
    - "Mark Unavailable" feature to block time slots.
    - Read-only mode for appointments (bookings done presumably by Front Desk).

#### B. Encounter List View (`/encounters`)
- **Doctypes**: `Patient Encounter`.
- **Features**:
    - Filterable list: Active, Completed, Cancelled.
    - Quick actions to "Open" an encounter.
    - Display key info: Patient Name, Reason, Status, Time.
    - **Offline Indicator**: Visual cue if the list is stale/cached.

#### C. Encounter Details View (`/encounters/:id`)
This is the heart of the application.
- **Layout**: Two-Column Layout (Left Sidebar + Main Content).

**Left Column (Patient Context):**
- **Patient Header**: Name, Age, Gender, ID.
- **Summary Widgets**:
    - **Medication History**: List of `Patient Medication History`.
    - **Vitals**: Sparkline or list of recent `Vital Signs`.
    - **Allergies & Comorbidities**: Tags/List from `Patient Medical Record`.
    - **Reference**: Quick links to external or internal reference docs.

**Main Content Area (Tabs):**
1.  **Clinical Notes (Default)**:
    - Editor for SOAP Notes (Subjective, Objective, Assessment, Plan).
    - Order entry (Lab Tests, Prescriptions).
2.  **Specialization**: 
    - Dynamic tab based on `Medical Department`.
3.  **Patient History**:
    - Timeline of past encounters and procedures.
4.  **Patient Progress**:
    - Charts/Graphs of specific metrics over time.

**Action Bar (Floating or Top Right):**
- **Save**, **Submit**, **Admit**, **Discharge** buttons.

### 4. Component Structure (New Files)
#### [MODIFY] src/components/layout/Sidebar.tsx
- Update menu items to Healthcare context.

#### [NEW] src/pages/SchedulePage.tsx
- Calendar view implementation.

#### [NEW] src/pages/EncounterListPage.tsx
- Data table for encounters.

#### [NEW] src/pages/EncounterDetailsPage.tsx
- Main container for the encounter view.

#### [NEW] src/components/encounter/PatientSummarySidebar.tsx
- The left column widgets.

#### [NEW] src/components/encounter/ClinicalNotesTab.tsx
- The main SOAP note editor.

### 5. Offline & Sync (Phase 2)
*(Deferred until after Phase 1 completion)*
- Implement `OfflineManager` using IndexedDB.
- Wrap API calls with caching logic.
- Implement `MutationQueue` for background syncing.

## Verification Plan

### Manual Verification
- **Mock Data**: Since we might not have a live ERPNext instance with full data immediately, we will create robust mock data generators for:
    - `mockAppointments`
    - `mockEncounters`
    - `mockPatients`
- **Walkthrough**:
    1.  Login (Mocked).
    2.  Navigate to Schedule.
    3.  Click an Appointment -> Go to Encounter.
    4.  Edit Clinical Notes.
    5.  Check Patient History in the left pane.
