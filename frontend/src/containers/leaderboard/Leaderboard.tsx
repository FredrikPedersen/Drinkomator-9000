import {useContext, useEffect, useState} from "react";
import {OrderContext} from "@context/OrderContext.tsx";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";

type DrinkStats = {
    username: string,
    [key: string]: number
}


export function Leaderboard() {
    const {orders, drinks} = useContext(OrderContext);
    const [drinkStats, setDrinkStats] = useState<DrinkStats[]>([])

    //Foreach username, find the occurrence of each drink per username
    useEffect(() => {
        //Find unique usernames
        const usernames = [...new Set(orders.map(drinkOrder => drinkOrder.username))];

        const drinksPerUser = usernames.map(username => {
            const statsForUser: DrinkStats = {
                username: username,
            };

            orders.forEach(drinkOrder => {
                if (drinkOrder.username === username) {
                    drinks.forEach(drink => {
                        if (drink === drinkOrder.drinkName) {
                            const eksisterendeVerdi = statsForUser[drink];
                            if (eksisterendeVerdi) {
                                statsForUser[drink] += 1;
                            } else {
                                statsForUser[drink] = 1
                            }
                        }
                    })

                }
            })

            return statsForUser;
        })

        setDrinkStats(drinksPerUser)
    }, [orders, drinks])

    console.log(drinkStats)
    return (
        <div style={{width: "100%", height: "100%"}}>
            <BarChart
                width={500}
                height={300}
                data={drinkStats}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="username"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                {drinkStats.map(drinkStat => {
                    drinkStat.drinkQuantities.map((drinks, index) => {
                        return (
                            <>
                                <Bar dataKey="quantity" stackId="a" fill="#8884d8"/>
                                <Bar dataKey="amt" stackId="a" fill="#82ca9d"/>
                                <Bar dataKey="uv" stackId="a" fill="#ffc658"/>
                            </>
                        )
                    })

                })}

            </BarChart>
        </div>
    );
}