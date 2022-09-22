import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import CalendarioVacunacionRouter from './CalendarioVacunacionRouter';
import { SidebarData } from '../../components/Sidebar/SidebarData'

function CalendarioVacunacion() {
    const datahc = SidebarData.perfilDelPaciente.find(d => d.id === 7)
    const routes = datahc.options;

    return (
        <Container className='p-3'>
            <Row>
                <Col className='switch-container'>
                {routes.map((route) => {
                    return(
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
