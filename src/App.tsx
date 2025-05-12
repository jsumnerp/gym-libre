import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider'
import { WorkoutsPage } from '@/pages/WorkoutsPage'
import { WorkoutDetailPage } from '@/pages/WorkoutDetailPage'

function App() {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<WorkoutsPage />} />
        <Route path="/workout/:id" element={<WorkoutDetailPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
