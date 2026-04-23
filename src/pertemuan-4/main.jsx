import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './pertemuan-4/tailwind.css';
import CourseAdmin from './pertemuan-4/components/CourseAdmin.jsx'
import CourseGuest from './pertemuan-4/components/CourseGuest.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CourseGuest />
  </StrictMode>,
)
