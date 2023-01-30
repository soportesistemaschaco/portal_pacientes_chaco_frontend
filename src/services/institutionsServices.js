import { API_ENDPOINT_EFECTORES_PRIORIZADOS_SUMAR, API_ENDPOINT_EFECTORES_SUMAR, API_HEADER } from "../constants/api.constants";
import { get } from "./httpServices";

// export default async function institutionsServices() {
//   try {
//     const promise = await get(API_ENDPOINT_INSTITUCIONES, API_HEADER()) 
//    return promise
//   }
//   catch (err) {
//     console.log('Error al cargar las instituciones: ', err);
//   }
// }

// CHACO desde SuMAR
export async function efectoresServices() {
  try {
    const promise = await get(API_ENDPOINT_EFECTORES_SUMAR(), API_HEADER()) 
   return promise
  }
  catch (err) {
    console.log('Error al cargar las instituciones: ', err);
  }
}

export async function efectoresPriorizadosServices() {
  try {
    const promise = await get(API_ENDPOINT_EFECTORES_PRIORIZADOS_SUMAR(), API_HEADER()) 
   return promise
  }
  catch (err) {
    console.log('Error al cargar las instituciones: ', err);
  }
}
