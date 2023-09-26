import {QuerySnapshot} from '@firebase/firestore-types';
import {doc} from "firebase/firestore";
import {firestore} from "@/config/firebase.ts";

export const mapDocumentData = <T>(documentResponse: QuerySnapshot) => {
    return documentResponse.docs.map(doc => ({...doc.data(), id: doc.id}) as T)
}

export const createOrderDoc = (id: string) => {
    return doc(firestore, "order", id)
}