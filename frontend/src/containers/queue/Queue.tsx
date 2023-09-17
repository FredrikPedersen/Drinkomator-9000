import {Button, Table} from "react-bootstrap";
import {useEffect, useMemo, useState} from "react";
import {DrinkOrder} from "@models/drinkOrder.ts";
import {orderCollection} from "@/config/firebase.ts";
import {getDocs} from "firebase/firestore";
import {mapDocumentData} from "@utilities/firebaseUtilities.ts";
import {ROLE, User, USER_LS_KEY} from "@models/user.ts";

export function Queue() {
    const [sortedOrders, setSortedOrders] = useState<Array<DrinkOrder>>();
    const isAdmin = useMemo(() => {
        const userAsString = localStorage.getItem(USER_LS_KEY);
        if (userAsString) {
            const user: User = JSON.parse(localStorage.getItem(USER_LS_KEY)!);
            return user.role === ROLE.ADMIN;
        }

        return false;
    }, [])

    //TODO Can we move the isDone part of the query to Firebase in order to reduce size of HTTP payload and clientside workload?
    useEffect(() => {
        const getOrders = async () => {
            const orderQuery = await getDocs(orderCollection);
            const orders: DrinkOrder[] = mapDocumentData<DrinkOrder>(orderQuery);

            return orders
                .filter(drinkOrder => !drinkOrder.isDone)
                .sort((a, b) => {
                return a.createdDate - b.createdDate
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
                {isAdmin ?
                    <th>Actions</th>
                    : null
                }
            </tr>
            </thead>
            <tbody>
            {sortedOrders && sortedOrders.map((queueRow, index) => {
                return (
                    <tr key={queueRow.username + index}>
                        <td>{index + 1}</td>
                        <td>{queueRow.username}</td>
                        <td>{queueRow.drinkName}</td>
                        {isAdmin ?
                                <td>
                                    <Button variant="success" style={{width: "100%"}}>Done</Button>
                                    <Button variant="danger" style={{width: "100%"}}>Delete</Button>
                                </td>
                            : null
                        }
                    </tr>
                )
            })}
            </tbody>
        </Table>
    )
}