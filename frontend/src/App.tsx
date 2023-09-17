import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Routes} from "./Routes.tsx";
import {DrinkProvider} from "@context/DrinkContext.tsx";

function App() {
    const router = createBrowserRouter(Routes);

    return (
        <>
            <DrinkProvider>
                <RouterProvider router={router}/>
            </DrinkProvider>
        </>
    )
}

export default App
