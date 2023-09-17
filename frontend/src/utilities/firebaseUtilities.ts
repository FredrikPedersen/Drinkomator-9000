import {QuerySnapshot} from '@firebase/firestore-types';

export const mapDocumentData = <T>(documentResponse: QuerySnapshot) => {
    return documentResponse.docs.map(doc => doc.data() as T)
}