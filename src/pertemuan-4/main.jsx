<<<<<<< HEAD
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
=======
import { createRoot } from "react-dom/client";
import './tailwind.css';
import FrameworkList from "./FrameworkList";
import FrameworkListSearchFilter from "./FrameworkListSearchFilter";
import ResponsiveDesign from "./ResponsiveDesign";

createRoot(document.getElementById("root"))
    .render(
        <div>
            {/* <FrameworkList /> */}
            {/* <FrameworkListSearchFilter /> */}
            <ResponsiveDesign />
        </div>
    )
>>>>>>> 9c39077330e588eb67f35ac18a164664a9b3032f
