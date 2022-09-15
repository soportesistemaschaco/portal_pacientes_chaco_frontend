import { TGD_GET_USER_DATA, TGD_GET_USER_TOKEN, TGD_HEADER } from "../constants/api.constants";
import { get } from "./httpServices";

export default async function tgdServiceToken(params) {
    try {
        const searchParams = new URLSearchParams(params);
        let query = searchParams.toString();
        const promise = await get(TGD_GET_USER_TOKEN(query))
        return promise
    }
    catch (err) {
        console.error('Error al solicitar token TGD: ', err);
    }
}

export async function tgdServiceUserData(tgdToken) {
    try {
        const promise = await get(TGD_GET_USER_DATA(), TGD_HEADER(tgdToken))
        return promise
    }
    catch (err) {
        console.error('Error al solicitar datos de persona TGD: ', err);
    }
}