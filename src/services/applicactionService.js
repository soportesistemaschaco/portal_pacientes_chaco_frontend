import { API_ENDPOINT_PATIENT_TURN_HSI, API_ENDPOINT_SEND_TURNO_MAIL, AUTH_HEADER } from "../constants/api.constants";
import { get, post } from "./httpServices";

export async function sendApplicationEmailService(person_id, subject, body) {
    try {
      const searchParams = new URLSearchParams({
        person_id: person_id,
        subject: subject,
        body: body,
      });
      let query = searchParams.toString();
      const promise = await post(
        API_ENDPOINT_SEND_TURNO_MAIL(query),
        AUTH_HEADER()
      );
      return promise;
    } catch (err) {
      console.error("Error al enviar email: ", err);
    }
  }

  export async function patientTurnHSI(dni, dni_tipo, genero_id) {
    try {
      const searchParams = new URLSearchParams({
        dni: dni,
        dni_tipo: dni_tipo,
        genero_id: genero_id
      });
      let query = searchParams.toString();
      const promise = await get(API_ENDPOINT_PATIENT_TURN_HSI(query), AUTH_HEADER() )
      return promise
    }
    catch (err) {
      console.error('Error al cargar Historia clínica: ', err);
    }
  }