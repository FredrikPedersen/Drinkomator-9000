import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {useContext, useEffect, useState} from "react";
import {OrderContext} from "@context/OrderContext.tsx";

type DrinkQuantity = {
    drinkName: string,
    quantity: number
}

type DrinkStats = {
    username: string,
    drinkQuantities: DrinkQuantity[]
}

export function Leaderboard() {
    const {orders} = useContext(OrderContext);
    const [drinkStats, setDrinkStats] = useState<DrinkStats[]>([])

    //Foreach username, find the occurrence of each drink per username
     useEffect(()  => {
        //Find unique usernames
        const usernames = [...new Set(orders.map(drinkOrder => drinkOrder.username))];

        const drinksPerUser = usernames.map(username => {
            const statsForUser: DrinkStats = {
                username: username,
                drinkQuantities: []
            };

            orders.forEach(drinkOrder => {
                if (drinkOrder.username === username) {
                    const drinkQuantitiesForUser = statsForUser.drinkQuantities
                    const drinkQuantity = drinkQuantitiesForUser.find((drink) => drinkOrder.drinkName === drink.drinkName)
                    if (drinkQuantity) {
                        drinkQuantity.quantity += 1
                    } else {
                        drinkQuantitiesForUser.push({
                            drinkName: drinkOrder.drinkName,
                            quantity: 1
                        })
                    }
                }
            })

            return statsForUser;
        })

         setDrinkStats(drinksPerUser)
    }, [orders])


    console.log(drinkStats)
    return (
        <>
            <BarChart width={300} height={500} data={drinkStats}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="pv" fill="#8884d8"/>
                <Bar dataKey="uv" fill="#82ca9d"/>
            </BarChart>
        </>
    )
}