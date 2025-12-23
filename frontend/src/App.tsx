import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { SchedulePage } from './pages/SchedulePage'
import { EncounterListPage } from './pages/EncounterListPage'
import { EncounterDetailsPage } from './pages/EncounterDetailsPage'

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<SchedulePage />} />
          <Route path="/encounters" element={<EncounterListPage />} />
          <Route path="/encounters/:id" element={<EncounterDetailsPage />} />
          {/* Add more routes here */}
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
