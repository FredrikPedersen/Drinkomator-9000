import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Routes} from "./Routes.tsx";

function App() {

    const router = createBrowserRouter(Routes)

    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
