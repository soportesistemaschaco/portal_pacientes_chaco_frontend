import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import DataNotFound from '../../../../components/DataNotFound';
import Loader from '../../../../components/Loader';
import { patientTurnHSI } from '../../../../services/applicactionService';
import Swal from 'sweetalert2';
import { error } from '../../../../components/SwalAlertData';
import { Card } from 'react-bootstrap';
import { useEffect } from 'react';
import usePatient from '../../../../hooks/usePatient';
import * as MdIcon from "react-icons/md";

function MisTurnos() {

    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const p = usePatient();
    const [proximoTurno, setProximoTurno] = useState([]);
    const [historialTurno, setHistorialTurno] = useState([]);

    const getData = useCallback(
        (dni, dni_tipo, genero_id) => {
            patientTurnHSI(dni, dni_tipo, genero_id)
                .then((res) => {
                    // console-log()
                    if (res.length > 0) {
                        filterTurn(res)
                    } else {
                        setNotFound(true);
                        setLoading(false)
                    }
                })
                .catch((err) => {
                    console.error(err)
                    Swal.fire(error('Hubo un error al solicitar datos'))
                    setLoading(false);
                })
        }, [])

    const filterTurn = (data) => {
        let today = new Date().getMilliseconds();
        data.map((item, i) => {
            let turnDate = new Date(item.date).getMilliseconds();
            if (turnDate > today) {
                proximoTurno.push(item)
            } else {
                historialTurno.push(item)
            }

            if (data.length === i + 1) {
                setLoading(false)
            }
        })
    }

    useEffect(() => {
        setLoading(true);
        // setData([])
        getData('21770919', '1', '2');
        // getData(p.patient.identification_number, p.patient.id_identification_type, p.patient.id_gender );
    }, []);


    return (
        <div className='in perfil-paciente'>
            {loading ?
                <Loader isActive={loading}></Loader>
                :
                <>
                    <hr />
                    <h6 className='datos-paciente__title mb-3'>Próximos turnos:</h6>
                    {proximoTurno.map((d, i) => {
                        return (
                            <Card key={i} className="mb-3 shadow-sm">
                                <Card.Header>
                                    <span className='mb-0 me-3'>
                                        <MdIcon.MdCalendarToday className="menu-icon text-secondary-lt mb-1 me-1" />
                                        Fecha: {new Date(d.date).toLocaleDateString()}
                                    </span>
                                    <span className='mb-0 me-3'>
                                        <MdIcon.MdOutlineWatchLater className="menu-icon text-secondary-lt mb-1 me-1" />
                                        Hora: {d.hour}
                                    </span>
                                </Card.Header>
                                <Card.Body>
                                    <blockquote className="blockquote mb-0">
                                        <p>Profesional: {d.professional.person.firstName+', '+d.professional.person.firstName || ' - '}</p>
                                        <p>Sobre turno: <span>{d.overturn ? 'Sì' : 'No' || ' - '}</span></p>
                                        <p>Teléfono: <span>{'('+d.phonePrefix+') '+d.phoneNumber || ' - '}</span></p>
                                        <footer className="blockquote-footer">
                                            <p>Observaciones: <span>{d.Observaciones || ' - '}</span></p>
                                        </footer>
                                    </blockquote>
                                </Card.Body>
                            </Card>
                        )
                    })
                    }
                    {notFound || proximoTurno.length === 0 ? <DataNotFound text="próximos turnos" /> : <></>}
                    <hr />
                    <h6 className='datos-paciente__title mb-3'>Historial:</h6>
                    {historialTurno.map((d, i) => {
                        return (
                            <blockquote className="blockquote mb-3">
                                <p className='fw-lighter mb-0 fst-italic me-3'>Fecha: {new Date(d.date).toLocaleDateString()}</p>
                                <p className='fw-lighter mb-0 fst-italic me-3'>Hora: {d.hour}</p>
                                <p className='mb-0 fst-italic'>Profesional: {d.professional.person.firstName+', '+d.professional.person.firstName || ' - '}</p>
                                <p className='mb-0 fst-italic'>Sobre turno: <span>{d.overturn ? 'Sì' : 'No' || ' - '}</span></p>
                                <p className='mb-0 fst-italic'>Teléfono: <span>{'('+d.phonePrefix+') '+d.phoneNumber || ' - '}</span></p>
                                <p className='mb-0 fst-italic'>Observaciones: <span>{d.Observaciones || ' - '}</span></p>
                            </blockquote>
                        )
                    })
                    }
                    {notFound || historialTurno.length === 0 ? <DataNotFound text="historial de turnos" /> : <></>}
                </>
            }
        </div>
    )
}

export default MisTurnos;
