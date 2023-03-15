// import React, { useCallback, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { SidebarData } from '../../components/Sidebar/SidebarData'
import HCDRouter from './HCDRouter';
import * as MdIcon from "react-icons/md";

const HistoriaClinicaDigital = () => {

    const datahc = SidebarData.perfilDelPaciente.find(d => d.id === 6)
    const routes = datahc.options;

    return (
        <Container className='historia-clinica p-3'>
            <div className="d-flex">
                <MdIcon.MdOutlineFolderShared className="menu-icon text-primary me-1" style={{ fontSize: 'x-large' }} />
                <h5 className='section-title mb-3'>Historia clínica digital</h5>
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
            <Row>
                <Col className='switch-container__hc py-3'>
                    <HCDRouter></HCDRouter>
                </Col>
            </Row>

        </Container>
    )
}

export default HistoriaClinicaDigital;
