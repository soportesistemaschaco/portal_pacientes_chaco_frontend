import { useState, useEffect } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import '../../styles/Transitions.scss'
import useAuth from '../../hooks/useAuth';
import Loader from "../../components/Loader";
// import { loginServiceFetch } from "../../services/loginService";
import OAuth2Login from 'react-simple-oauth2-login';
import logo from '../../assets/statics/logo-light.svg'
import logoTGD from '../../assets/statics/logo-tgd-colors.svg'
import { get } from "../../services/httpServices";
import { useCallback } from "react";


function LoginPerson() {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(JSON.parse(localStorage.getItem("loginDataEmail")) || "");
    const [password, setPassword] = useState(JSON.parse(localStorage.getItem("loginDataPassword")) || "");
    const [saveData, setSaveData] = useState(false);
    const auth = useAuth();
    const history = useHistory();
    const location = useLocation();
    const previousObjetURL = location.state?.from
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [number, setNumber] = useState(2) // Background

    const onSuccess = response => console.log(response);
    const onFailure = response => console.error(response);

    useEffect(() => {
        if (auth.isLogged()) history.push(previousObjetURL || "/usuario")
    }, [auth, history, previousObjetURL])

    const onSubmit = () => {
        // setLoading(true)
        auth.loginPerson('violeta.pugliese@gmail.com', 123546);
        if (saveData) {
            localStorage.setItem("loginDataEmail", JSON.stringify('violeta.pugliese@gmail.com'));
            localStorage.setItem("loginDataPassword", JSON.stringify(123546));
        }
    }

    useEffect(() => {
        setNumber(Math.floor(Math.random() * (5 - 0)) + 1);
    }, [])

    return (
        <>
            {loading
                ? <Loader isActive={loading} />
                : <div className={`bg-container bg${number} `}>
                    <Container className='z-index-1 '>
                        <Row className='w-100 d-flex justify-content-center in'>
                            <Col xs={10} md={4} lg={3} className="d-flex flex-column justify-content-around align-items-center h-100">
                                <img src={logo} className="w-100" alt="Logo blanco Portal del paciente Chaco" />
                                <h6 className="text-center text-light my-3">Ingresar con: </h6>
                                <OAuth2Login
                                    className="btn-tgd"
                                    authorizationUrl="http://stage.ventanillaunica.chaco.gov.ar/oauth/v2/auth"
                                    responseType="code"
                                    clientId="109_469fzlhy0084gkscg4gsk8k88ow4kgggso8s44ososo80ccos8"
                                    redirectUri="http://test-portal.salud.chaco.gob.ar/callback"
                                    isCrossOrigin={true}
                                    onSuccess={onSuccess}
                                    onFailure={onFailure}>
                                        <img src={logoTGD} className="w-75 my-4" alt="Logo Tu Gobierno Digital" />
                                    </OAuth2Login>
                                <Form className="form-group in mt-5" onSubmit={handleSubmit(onSubmit)}>
                                    <Button variant="primary" type="submit">
                                        Iniciar Sesión
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            }
        </>

    )
}

export default LoginPerson;
