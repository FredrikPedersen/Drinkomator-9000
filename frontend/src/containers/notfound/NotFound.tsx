import {isRouteErrorResponse, useRouteError} from "react-router-dom";
import './NotFound.css'
import {useEffect, useMemo, useState} from "react";
import {User, USER_LS_KEY} from "@models/user.ts";

export default function NotFound() {
    const error = useRouteError();
    const [user, setUser] = useState<User | undefined>(undefined)

    useEffect(() => {
        if (!user) {
            const userAsString = localStorage.getItem(USER_LS_KEY)

            if (userAsString) {
                setUser(JSON.parse(userAsString))
            }
        }
    }, [user]);


    const errorMessage = useMemo(() => {
        if (isRouteErrorResponse(error)) {
            // error is type `ErrorResponse`
            return error.error?.message || error.statusText;
        } else if (error instanceof Error) {
            return error.message;
        } else if (typeof error === 'string') {
            return error;
        } else {
            console.error(error);
            return 'Unknown error';
        }
    }, [error])


    return (
        <div id="not-found">
            <h1>{`I'm afraid I can't do that, ${user ? user.username : 'Dave'}`}</h1>
            <p>
                <i>{errorMessage}</i>
            </p>
        </div>
    );
}