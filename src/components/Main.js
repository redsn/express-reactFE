import { Routes, Route } from "react-router-dom";
import Index from  "../Pages/Index";
import Show from "../Pages/Show";


export default function Main (props) {
    return(
        <>
        <main>
            <Routes>
                <Route path="/"  element={<Index />} />
                <Route path="/people/:id" element={<Show />} />
            </Routes>
        </main>
        </>
    )
}