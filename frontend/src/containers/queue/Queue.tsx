import {Button, Table} from "react-bootstrap";
import {useCallback, useEffect, useMemo, useState} from "react";
import {DrinkOrder} from "@models/drinkOrder.ts";
import {orderCollection} from "@/config/firebase.ts";
import {deleteDoc, getDocs, updateDoc} from "firebase/firestore";
import {createOrderDoc, mapDocumentData} from "@utilities/firebaseUtilities.ts";
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
        getOrders().then(sorted => setSortedOrders(sorted));
    }, []);

    const getOrders = useCallback(async () => {
        const orderQuery = await getDocs(orderCollection);
        const orders: DrinkOrder[] = mapDocumentData<DrinkOrder>(orderQuery);

        return orders
            .filter(drinkOrder => !drinkOrder.isDone)
            .sort((a, b) => {
                return a.createdDate - b.createdDate
            });
    }, [])

    const markAsDone = useCallback( async (id: string) => {
        const drinkOrderDoc = createOrderDoc(id);
        const newField = {isDone: true}
        await updateDoc(drinkOrderDoc, newField);
        const sorted = await getOrders()
        setSortedOrders(sorted)
    }, [getOrders])

    const deleteOrder = useCallback(async (id: string)=> {
        const drinkOrderDoc = createOrderDoc(id)
        await deleteDoc(drinkOrderDoc)
        const sorted = await getOrders()
        setSortedOrders(sorted)
    }, [getOrders])

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Brukernavn</th>
                <th>Drink</th>
                {isAdmin ?
                    <th>Handlinger</th>
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
                                    <Button variant="success" style={{width: "100%"}} onClick={() => markAsDone(queueRow.id)}>Ferdig</Button>
                                    <Button variant="danger" style={{width: "100%"}} onClick={() => deleteOrder(queueRow.id)}>Slett</Button>
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