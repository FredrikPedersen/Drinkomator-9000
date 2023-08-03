import {CoreLayout} from "./containers/corelayout/CoreLayout.tsx";
import NotFound from "./containers/notfound/NotFound.tsx";
import {RouteObject} from "react-router/dist/lib/context";
import {Queue} from "./containers/queue/Queue.tsx";
import {Leaderboard} from "./containers/leaderboard/Leaderboard.tsx";
import {Order} from "./containers/order/Order.tsx";

export const Routes: RouteObject[] = [
    {
        path: "/",
        element: <CoreLayout/>,
        errorElement: <NotFound/>,
        children: [
            {
                path: "/order",
                element: <Order/>
            },
            {
                path: "queue",
                element: <Queue/>,
            },
            {
                path: "leaderboard",
                element: <Leaderboard/>
            }
        ]
    },
]