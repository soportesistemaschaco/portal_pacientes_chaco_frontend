import { useCallback, useEffect, useState } from "react";
import { Col, Table } from "react-bootstrap";
import DataNotFound from "../../../../components/DataNotFound";
import Loader from "../../../../components/Loader";
import { getPersons } from "../../../../services/adminServices";
import { getAdminStatus } from "../../../../services/personServices";
import Swal from "sweetalert2";
import * as MdIcon from "react-icons/md";
import * as FaIcon from 'react-icons/fa';
import { error } from "../../../../components/SwalAlertData";
import { Link } from "react-router-dom";

export default function ManageAdmin() {

    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(1);

    const [patientsPending, setPendingPatients] = useState([]);

    const getData = useCallback(
        () => {
            getPersons()
                .then((res) => {
                    if (res) {
                        let patients = res.filter(p => p.id_admin_status === 3)//note - table db =>  1: pending , 2: validated , 3: refused
                        setPendingPatients(patients)
                        setLoading(false)
                    } else {
                        throw new Error(res)
                    }
                })
                .catch((err) => {
                    console.log('error', err)
                    Swal.fire(error('Hubo un error al cargar pacientes rechazados'));
                    setLoading(false)
                })
        },
        [],
    )

    const getAdminStatusToSetPerson = useCallback(
        () => {
            //     getAdminStatus()
            //         .then((res) => {
            //             setAdminStatus(res)
            //             setLoading(false)
            //         })
            //         .catch((err) => {
            //             console.log('Error', err)
            //             Swal.fire(error('Error al obtenter estados'))
            //         })

        }, []
    )

    useEffect(() => {
        getAdminStatusToSetPerson()
    }, [])


    const reloadTime = () => {
        setTimeout(() => {
            setReload(reload + 1)
        }, 60000);
    }

    useEffect(() => {
        getData()
        reloadTime()
    }, [reload])

    return (
        <>
            {loading ?
                <Loader isActive={loading}></Loader>
                : <>
                    {patientsPending.length > 0 ?
                        <>
                            <Col className="w-100 pr-3 pb-3 d-flex justify-content-end">
                                <Link to="/admin/panel/registrar">
                                    <button className='btn btn-primary'><FaIcon.FaUserPlus className='me-2' style={{ fontSize: '1.5rem' }} />Agregar administrador</button>
                                </Link>
                            </Col>
                            <Table striped bordered borderless hover>
                                <thead>
                                    <tr>
                                        <th>Nombre y apellido</th>
                                        <th>Usuario</th>
                                        <th>Estado</th>
                                        <th style={{ width: "20px" }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patientsPending.map((p, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>Admin General</td>
                                                <td>admin</td>
                                                <td>Activo</td>
                                                <td>
                                                    <div className="my-tooltip">
                                                        <button className='btn text-secondary btn-icon' onClick={() => { }} ><MdIcon.MdEditNote style={{ fontSize: '1.5rem' }} /></button>
                                                        <span className="tiptext">
                                                            Editar
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </>
                        :
                        <DataNotFound text="pacientes rechazados" />
                    }
                </>
            }
        </>
    )
}