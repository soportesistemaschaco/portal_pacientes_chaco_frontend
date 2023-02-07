import { useCallback, useEffect, useState } from "react";
import { createContext } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
// import patientBasicDataServices from "../services/patientService";
import { completeProfile, errorActivePatient, toastPatient } from "../components/SwalAlertData";
import { getPersonByIdentificationNumber } from "../services/personServices";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const PatientContext = createContext();

const PatientProvider = ({ children }) => {
  const auth = useAuth();
  const history = useHistory();
  const [allPatients, setAllPatients] = useState([auth.user]);
  const [patient, setPatient] = useState(
    JSON.parse(localStorage.getItem("patient")) || allPatients[0]
  );
  const [patientInstitution, setPatientInstitution] = useState(
    patient.id_usual_institution
  );
  const [idPatient, setIdPatient] = useState(
    JSON.parse(localStorage.getItem("idPatient")) || patient.id_patient || null
  );
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    try {
      localStorage.setItem("patient", JSON.stringify(patient));
      localStorage.setItem("idPatient", JSON.stringify(idPatient));
    } catch (error) {
      localStorage.removeItem("idPatient");
      localStorage.removeItem("patient");
    }
  }, [patient, idPatient]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  useEffect(() => {
    if (auth.user.family_group.length > 0) {
      auth.user.family_group.map((p) => allPatients.push(p));
    }
  }, [allPatients]);

  const getPatient = useCallback((identification_number) => {
    setLoading(true);
    getPersonByIdentificationNumber(identification_number)
      .then((res) => {
        setLoading(false);
        if (res.id) {
          let p = res;
          if (p) {

            if (p.id_usual_institution) {
              setPatientInstitution(p.id_usual_institution);
              setPatient(p);
          
              if (p.id_patient) {
                setIdPatient(p.id_patient);
              } else {
                setIdPatient(null);
              }
          
              Toast.fire(toastPatient(`${p.name} ${p.surname}`));
              return patient;
  
            
            } else {
               Swal.fire(completeProfile()).then((result) => {
                if (result.isConfirmed) {
                  history.push('/usuario/perfil-paciente?user=false')
                }
              });
            }
          }
        } else {
          throw new Error("No se encontró información del paciente");
        }
      })
      .catch((err) => {
        console.log("error", err);
        Swal.fire(errorActivePatient).then((result) => {
          if (result.isConfirmed) {
            auth.logout();
          }
        });
        setLoading(false);
      });
  }, []);

  const changeInstitution = (e) => {
    let id_institution = parseInt(e.target.value);
    setPatientInstitution(id_institution);
  };

  const contextValue = {
    loading,
    patient,
    allPatients,
    getPatient,
    patientInstitution,
    changeInstitution,
    idPatient
  };

  return (
    <PatientContext.Provider value={contextValue}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientProvider;
