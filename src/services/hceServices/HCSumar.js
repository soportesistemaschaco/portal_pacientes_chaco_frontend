import { API_ENDPOINT_PRESTACIONES_SUMAR, AUTH_HEADER } from "../../constants/api.constants";
import { get } from "../httpServices";

// CHACO
export default async function HCSumarServices(dni) {
  try {
    const searchParams = new URLSearchParams({
      dni: dni,
    });
    let query = searchParams.toString();
    const promise = await get(API_ENDPOINT_PRESTACIONES_SUMAR(query), AUTH_HEADER() )
    return promise
  }
  catch (err) {
    console.error('Error al cargar datos Programa Sumar: ', err);
  }
}