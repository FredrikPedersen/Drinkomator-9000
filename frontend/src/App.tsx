import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Routes} from "./Routes.tsx";
import {OrderProvider} from "@context/OrderContext.tsx";

function App() {
    const router = createBrowserRouter(Routes);

    return (
        <>
            <OrderProvider>
                <RouterProvider router={router}/>
            </OrderProvider>
        </>
    )
}

export default App
