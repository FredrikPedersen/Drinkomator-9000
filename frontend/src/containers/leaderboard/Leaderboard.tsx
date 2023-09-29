import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {DrinkContext} from "@context/DrinkContext.tsx";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {DrinkOrder} from "@models/drinkOrder.ts";
import {getDocs} from "firebase/firestore";
import {orderCollection} from "@/config/firebase.ts";
import {mapDocumentData} from "@utilities/firebaseUtilities.ts";
import {useInterval} from "@/hooks/usePolling.ts";

interface DynamicModel<T> {
    [key: string]: T
}

type DrinkStats = DynamicModel<number> & {
    username: string
}

export function Leaderboard() {
    const {drinks} = useContext(DrinkContext);
    const [drinkStats, setDrinkStats] = useState<DrinkStats[]>([])
    const chartHeight = useMemo(() => 500, [])

    //Foreach username, find the occurrence of each drink per username
    const getOrders = useCallback(async () => {
        const orderQuery = await getDocs(orderCollection);
        // @ts-ignore - Problems due to a generic
        return mapDocumentData<DrinkOrder>(orderQuery);
    }, [])

    const createStatistics = useCallback(async () => {
        const orders = await getOrders()
        //Find unique usernames
        const usernames = [...new Set(orders.map(drinkOrder => drinkOrder.username))];

        const drinksPerUser = usernames.map(username => {
            // @ts-ignore - This whole logic will be moved to a backend
            const statsForUser: DrinkStats = {username: username};

            orders.filter(drinkOrder => drinkOrder.isDone).forEach(drinkOrder => {
                if (drinkOrder.username === username) {
                    drinks.forEach(drink => {
                        const drinkName = drink.name
                        if (drinkName === drinkOrder.drinkName) {
                            const existingValue = statsForUser[drinkName];
                            if (existingValue) {
                                statsForUser[drinkName] += 1;
                            } else {
                                statsForUser[drinkName] = 1
                            }
                        }
                    })
                }
            })

            return statsForUser;
        })

        return drinksPerUser
    }, [getOrders])

    useEffect(() => {
        createStatistics().then((stats) => setDrinkStats(stats))
    }, [createStatistics])

    useInterval( () => {
        createStatistics().then((stats) => setDrinkStats(stats))
    })

    return (
        <ResponsiveContainer width={"100%"} height={chartHeight}>
            <BarChart
                width={500}
                height={300}
                data={drinkStats}
                margin={{
                    top: 20,
                    right: 40,
                    left: 0,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis
                    dataKey="username"
                    angle={90}
                    dy={30}
                    dx={5}
                />
                <YAxis/>
                <Tooltip/>
                <Legend wrapperStyle={{top: chartHeight, left: 25}}/>
                {drinks.map((drink, index) => {
                    return (
                        <Bar key={drink.name + index} dataKey={drink.name} stackId="a" fill={drink.hexColor}/>
                    )
                })}
            </BarChart>
        </ResponsiveContainer>
    );
}