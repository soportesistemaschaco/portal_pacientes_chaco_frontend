import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import CalendarioVacunacionRouter from './CalendarioVacunacionRouter';
import { SidebarData } from '../../components/Sidebar/SidebarData';
import vaccines from "../../assets/statics/vaccines_icon_blue.svg";

function CalendarioVacunacion() {
    const datahc = SidebarData.perfilDelPaciente.find(d => d.id === 7)
    const routes = datahc.options;

    return (
        <Container className='p-3'>
            <div className="d-flex"> 
                <img src={vaccines} className="custom-icon menu-icon me-1" fill="#000000" style={{ maxHeight: '23px' }} alt="vacunacion" />
                <h5 className='section-title mb-3'>Calendario de vacunación</h5>
            </div>
            <Row>
                <Col className='switch-container'>
                    {routes.map((route) => {
                        return (
                            <NavLink key={route.path} className='me-2' activeClassName='active-switch' to={route.path}>{route.title}</NavLink>
                        )
                    })}
                </Col>
            </Row>
            <CalendarioVacunacionRouter />
        </Container>
    )
}

export default CalendarioVacunacion;
