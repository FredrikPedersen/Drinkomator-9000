import { useRouteError } from "react-router-dom";
import './NotFound.css'

export default function NotFound() {
    const error = useRouteError();

    console.log(error)

    return (
        <div id="not-found">
            <h1>HVA FAEN ER DET DU DRIVER MED!?</h1>
            {error.statusText === "Not Found"
                ? <p>Denna siden eksisterer ikke. Pell deg tilbake til landingssiden og ta en drink til!</p>
                : <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            }
        </div>
    );
}