import React, { useCallback, useEffect, useState } from 'react';
import usePatient from '../../../../hooks/usePatient';
import Loader from '../../../../components/Loader';
import DataNotFound from '../../../../components/DataNotFound';
import Swal from 'sweetalert2';
import { error } from '../../../../components/SwalAlertData';
import { Card } from 'react-bootstrap';
import HCSumarServices from '../../../../services/hceServices/HCSumar';

function HCSumar() {

    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const p = usePatient();
    const [data, setData] = useState([]);

    const getData = useCallback(
        (dni) => {
            HCSumarServices(dni)
                .then((res) => {
                    setLoading(false);
                    data.pop()
                    if (res.length > 0) {
                        setData(res);
                        setNotFound(false);
                    } else {
                        setData([]);
                        setNotFound(true);
                    }
                })
                .catch((err) => {
                    console.error(err)
                    Swal.fire(error('Hubo un error al solicitar datos'))
                    setLoading(false);
                })
        },
        [data],
    )

    useEffect(() => {
        setLoading(true);
        getData(p.patient.identification_number);
    }, []);

    return (
        <div className='in'>
            {loading ?
                <Loader isActive={loading}></Loader>
                :
                <>
                    {data.map((d, i) => {
                        return (
                            <Card key={i} className="mb-3 shadow-sm">
                                <Card.Header>
                                    <span className='fw-lighter mb-0'>Fecha: {d.FechaPrestacion 
                                    ? new Date(d.FechaPrestacion).toLocaleDateString() 
                                    : '-/-/-'}</span>
                                </Card.Header>
                                <Card.Body>
                                    <blockquote className="blockquote mb-0">
                                        <p>Servicio: {d.Servicio || ' - '}</p>
                                        <p>Diagnóstico: <span>{d.idDiag || ' - '}</span></p>
                                        <p>Descripción: <span>{d.NomPres || ' - '}</span></p>
                                        <footer className="blockquote-footer">
                                            <p>Observaciones: <span>{d.Observaciones || ' - '}</span></p>
                                        </footer>
                                    </blockquote>
                                </Card.Body>
                            </Card>
                        )
                    })
                    }
                    {notFound && <DataNotFound text="programa sumar" />}
                </>
            }
        </div>
    )
}

export default HCSumar;
