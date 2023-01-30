import { Container, Row, Col } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { SidebarData } from "../../components/Sidebar/SidebarData";
import AdminPanelRouter from "./AdminPanelRouter";
import * as FaIcon from 'react-icons/fa'

export default function AdminPanel() {
    const data = SidebarData.admin.find(d => d.id === 14);
    const routes = data.options

    return (
        <Container className='p-3'>
            <div className="d-flex">
                <FaIcon.FaUserCheck className="menu-icon text-primary me-2" style={{fontSize: 'x-large'}}/>
                <h5 className='section-title mb-3'>Panel de administradores</h5>
            </div>
            <Row>
                <Col className='switch-container p-3'>
                    {routes.map((route) => {
                        return (
                            <NavLink key={route.path} className='me-2' activeClassName='active-switch' to={route.path}>{route.title}</NavLink>
                        )
                    })}
                </Col>
            </Row>
            <AdminPanelRouter></AdminPanelRouter>
        </Container>
    )
}
