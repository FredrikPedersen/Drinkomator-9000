import {Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {DrinkOrder} from "@models/drinkOrder.ts";
import {orderCollection} from "@/config/firebase.ts";
import {getDocs} from "firebase/firestore";
import {mapDocumentData} from "@utilities/firebaseUtilities.ts";

export function Queue() {
    const [sortedOrders, setSortedOrders] = useState<Array<DrinkOrder>>();

    useEffect(() => {
        const getOrders = async () => {
            const orderQuery = await getDocs(orderCollection);
            const orders: DrinkOrder[] = mapDocumentData<DrinkOrder>(orderQuery);

            return orders.sort((a, b) => {
                return a.createdDate.seconds - b.createdDate.seconds
            });
        }


        getOrders().then(sorted => setSortedOrders(sorted));
    }, []);

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Brukernavn</th>
                <th>Drink</th>
            </tr>
            </thead>
            <tbody>
            {sortedOrders && sortedOrders.map((queueRow, index) => {
                return (
                    <tr key={queueRow.username + index}>
                        <td>{index + 1}</td>
                        <td>{queueRow.username}</td>
                        <td>{queueRow.drinkName}</td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
    )
}