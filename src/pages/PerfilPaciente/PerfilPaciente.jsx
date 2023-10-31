import { useState } from "react";
import { Container } from "react-bootstrap"
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Profile from "../../components/Profile/Profile";
import DatosPaciente from "./components/DatosPaciente";
import * as FaIcon from 'react-icons/fa';
import * as MdIcon from 'react-icons/md';
import { useEffect } from "react";
import usePatient from '../../hooks/usePatient';

export default function PerfilPaciente() {

    const history = useHistory()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const location = useLocation();
    const dataExiste = location.search.split('?')[1] === 'user=false' ? false : true;
    const p = usePatient();

    const verHistoriaClinica = () => {
        history.push('/usuario/historia-clinica/hsi')
    }

    useEffect(() => {
        if (!dataExiste) {
            handleShow();
        }
    }, [])
    return (
        <Container className='perfil-paciente p-3'>
            <div className="w-100 d-flex justify-content-between">
                <div className="d-flex">
                    <MdIcon.MdOutlinePersonOutline className="menu-icon text-primary me-1" style={{ fontSize: 'x-large' }} />
                    <h5 className='section-title mb-3'>Perfil del Paciente</h5>
                </div>
                <div className="d-flex align-items-center">
                    <div className="my-tooltip">
                        <button className='btn text-secondary btn-icon' onClick={() => { verHistoriaClinica() }}><MdIcon.MdFolderShared style={{ fontSize: '1.5rem' }} /></button>
                        <span className="tiptext">
                            Ver historia clínica
                        </span>
                    </div>
                    <div className="my-tooltip">
                        <button className='btn text-secondary btn-icon' onClick={() => { handleShow() }} ><FaIcon.FaUserEdit style={{ fontSize: '1.5rem' }} /></button>
                        <span className="tiptext">
                            Editar
                        </span>
                    </div>
                </div>
            </div>
            {dataExiste && p.patient?.id && <DatosPaciente></DatosPaciente>}
            {show && <Profile type={'patient'} show={show} dataExiste={dataExiste} handleClose={handleClose} identification_number={p.patient.identification_number} />}
        </Container>
    )
}

