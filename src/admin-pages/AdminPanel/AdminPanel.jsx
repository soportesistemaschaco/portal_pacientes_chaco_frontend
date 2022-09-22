import { Container, Row, Col } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { SidebarData } from "../../components/Sidebar/SidebarData";
import AdminPanelRouter from "./AdminPanelRouter";

export default function AdminPanel() {
    const data = SidebarData.admin.find(d => d.id === 14);
    const routes = data.options

    return (
        <Container className='p-3'>
            <h5 className='section-title mb-3'>Panel de administradores</h5>
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
