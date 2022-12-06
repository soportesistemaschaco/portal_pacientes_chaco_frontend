import { API_ENDPOINT_PARAMETRIC, API_ENDPOINT_PATIENT_DOCUMENT_TYPE, API_HEADER } from "../constants/api.constants";
import { get } from "./httpServices";

// LA RIOJA
// export default async function identificationsTypeServices() {
//     try {
//     const promise = await get(`${API_ENDPOINT_PARAMETRIC}/identificationtypes`, API_HEADER())
//     return promise
//     }
//     catch (err) {
//       console.error('Error al cargar las instituciones: ', err);
//     }
//   }

// CHACO via HSI
export async function documentTypeServices() {
  try {
  const promise = await get(API_ENDPOINT_PATIENT_DOCUMENT_TYPE(), API_HEADER())
  return promise
  }
  catch (err) {
    console.error('Error al cargar las instituciones: ', err);
  }
}