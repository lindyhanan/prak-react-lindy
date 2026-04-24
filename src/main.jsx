import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './pertemuan-4/tailwind.css';
import CourseAdmin from './pertemuan-4/components/CourseAdmin.jsx'
import CourseGuest from './pertemuan-4/components/CourseGuest.jsx'
import Dashboard from './pertemuan-5/pages/Dashboard.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Dashboard />
  </StrictMode>,
)
