import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { SidebarData } from "../../components/Sidebar/SidebarData";


export default function AdminDasboard() {
    const data = SidebarData.admin.find(d => d.id === 14);
    const routes = data.options

    return (
        <Container className='p-3'>
            <h5 className='section-title mb-3'>Indicadores</h5>
            <Row>
               <Col>
               hol
               </Col>
            </Row>
        </Container>
    )
}
