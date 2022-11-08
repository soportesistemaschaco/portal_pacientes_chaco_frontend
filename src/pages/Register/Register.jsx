import { Container, Row, Col, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RegisterForm from "../../components/RegisterForm/RegisterForm";

function Register() {

    // Background
    const number = Math.floor(Math.random() * (5 - 0)) + 1;

    return (
        <div className={`bg-container bg${number}`}>
            <Container className='z-index-1 cont d-flex flex-column'>
                <Row className='w-100'>
                    <Col xs={12} className="d-flex flex-column h-100 justify-content-between pb-3 pb-sm-0">
                        <h2 className='d-flex'>Registrarse</h2>
                        <RegisterForm formType={"user"} ></RegisterForm>
                    </Col>
                </Row>
                <Row className="w-100">
                    <Col className="d-flex align-items-end justify-content-end">
                        <Link to="/login" className='text-primary mt-2'>ir a Iniciar sesión</Link>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default Register;
