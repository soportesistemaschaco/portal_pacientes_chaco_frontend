import { API_ENDPOINT_PATIENT_CLINICHISTORY_HSI, AUTH_HEADER } from "../../constants/api.constants";
import { get } from "../httpServices";

// CHACO
export default async function patientClinicHistoryHSI(dni, dni_tipo, genero_id) {
  try {
    const searchParams = new URLSearchParams({
      dni: dni,
      dni_tipo: dni_tipo,
      genero_id: genero_id
    });
    let query = searchParams.toString();
    const promise = await get(API_ENDPOINT_PATIENT_CLINICHISTORY_HSI(query), AUTH_HEADER() )
    return promise
  }
  catch (err) {
    console.error('Error al cargar Historia Clínica: ', err);
  }
}