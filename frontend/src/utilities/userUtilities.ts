import {User} from "../models/user.ts";

const getUser = (): User => {
    const userAsString = localStorage.getItem("user")

    if (!userAsString) {
        throw Error();
    }

    return JSON.parse(userAsString)
}

export const getUsername = (): string => {
    return getUser().username;
}