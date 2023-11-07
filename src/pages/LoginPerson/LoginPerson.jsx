/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import '../../styles/Transitions.scss'
import useAuth from '../../hooks/useAuth';
import Loader from "../../components/Loader";
import OAuth2Login from 'react-simple-oauth2-login';
import logo from '../../assets/statics/logo-light.svg'
import logoTGD from '../../assets/statics/logo-tgd-colors.svg'
import { environment } from "../../environments/environments.demo";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";


function LoginPerson() {

    // SE OCULTA CUALQUIER POSIBILIDAD DE INGRESAR AL PORTAL QUE NO SEA A TRAVÉS DE TGD !!!!

    // const [loading, setLoading] = useState(false);
    const [loginTGD, setLoginTGD] = useState(true);
    // const [email, setEmail] = useState(JSON.parse(localStorage.getItem("loginDataEmail")) || "");
    // const [password, setPassword] = useState(JSON.parse(localStorage.getItem("loginDataPassword")) || "");
    // const [saveData, setSaveData] = useState(JSON.parse(localStorage.getItem("loginDataEmail")) ? true : false);
    // const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const auth = useAuth();
    const history = useHistory();
    const location = useLocation();
    // LEVANTA DATOS DESDE TGD
    const data = location.search
    const previousObjetURL = location.state?.from

    const tgdCredentials = {
        clientId: environment.tgd.clientId,
        clientSecret: environment.tgd.clientSecret,
        redirectURI: environment.tgd.redirectURI,
        authURL: environment.tgd.authURL + '/auth',
        scope: 'email'
    }

    useEffect(() => {
        // SI LLEGAN DATOS DESDE TGD
        if (data) {
            auth.getUserData(data);
        }
    }, [])

    useEffect(() => {
        if (auth.isLogged()) history.push(previousObjetURL || "/usuario")
    }, [auth, history, previousObjetURL])

    // const handlePassword = (value) => {
    //     setPassword(value)
    //     setValue('password', value)
    // }

    // const onSubmit = () => {
    //     // setLoading(true)
    //     if (loginTGD) {
    //         // DEBE RECIBIR DATOS DE PERSONA DESDE TGD Y AHI REALIZAR EL LOGIN
    //     } else {
    //         // REALIZA LOGIN CON DATOS INGRESADOS EN BASE DE DATOS
    //         auth.loginPerson(email, password);
    //         if (saveData) {
    //             localStorage.setItem("loginDataEmail", JSON.stringify(email));
    //             localStorage.setItem("loginDataPassword", JSON.stringify(password));
    //         } else {
    //             localStorage.removeItem("loginDataEmail");
    //             localStorage.removeItem("loginDataPassword");
    //         }
    //     }
    // }

    // HABILITAR PARA REALIZAR FLUJO CON TGD DESDE FRONT. Actualmente se realiza desde BACK
    // useEffect(() => {
    //     if (code) {
    //         setLoading(true);
    //         getToken(code);
    //     }
    // }, [code])

    // const getToken = (code) => {
    //     const searchParamsTGD = {
    //         grant_type: 'authorization_code',
    //         client_id: tgdCredentials.clientId,
    //         client_secret: tgdCredentials.clientSecret,
    //         redirect_uri: environment.tgd.redirectURI,
    //         code: code
    //     }
    //     auth.getUserTokenTGD(searchParamsTGD);
    //     setLoading(false);
    // }

    // FUNCIONES DE OAUTH 
    const onSuccess = (response) => { }

    const onFailure = response => console.error(response);


    return (
        <div className="bg-container">
            {auth.loading ? <Loader isActive={auth.loading} />
                : <Container className='z-index-1 '>
                    {loginTGD ?
                        <Row className='w-100 d-flex flex-column align-items-center justify-content-center in'>
                            <Col xs={10} md={4} lg={3} className="d-flex flex-column justify-content-around align-items-center h-100">
                                <img src={logo} className="w-100" alt="Logo blanco Portal del paciente Chaco" />
                                <h6 className="text-center text-light my-3">Ingresar con: </h6>
                                <OAuth2Login
                                    className="btn-tgd"
                                    authorizationUrl={tgdCredentials.authURL}
                                    responseType="code"
                                    clientId={tgdCredentials.clientId}
                                    redirectUri={tgdCredentials.redirectURI}
                                    onSuccess={onSuccess}
                                    onFailure={onFailure}>
                                    <img src={logoTGD} className="w-75 my-4" alt="Logo Tu Gobierno Digital" />
                                </OAuth2Login>
                            </Col>
                            {/* <Col xs={10} md={4} lg={3}>
                                <button type="button" className="btn btn-ligth mt-3 w-100" onClick={() => setLoginTGD(false)}>
                                    <p className="text-light text-decoration-underline">O ingresar con usuario <br />  Portal del Paciente</p>
                                </button>
                            </Col> */}
                        </Row>
                        : <Row className="w-100 d-flex justify-content-center in">
                            {/* <Col xs={10} md={6} lg={3} className="d-flex flex-column align-items-center justify-content-around h-100">
                                <img src={logo} className="w-100" alt="Logo blanco Portal del paciente Chaco" />
                                <h6 className="text center text-light my-3">Iniciar sesión</h6>
                                <Form className="form-group in" onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
                                        <Form.Label className="text-light">Email</Form.Label>
                                        <Form.Control
                                            name="email"
                                            type="text"
                                            value={email}
                                            className="form-control"
                                            {...register('email', {
                                                required: {
                                                    value: true,
                                                    message: "El campo es requerido."
                                                },
                                                // pattern: {
                                                //     value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                                                //     message: "El formato ingresado no es válido"
                                                // }
                                            })}
                                            onChange={(e) => { setEmail(e.target.value) }}
                                        />
                                        {errors.email && <ErrorMessage><p>{errors.email.message}</p></ErrorMessage>}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label className="text-light">Password</Form.Label>
                                        <Form.Control
                                            name="password"
                                            type="password"
                                            value={password}
                                            className="form-control"
                                            {...register('password', {
                                                required: {
                                                    value: true,
                                                    message: "El campo es requerido."
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message: "La contraseña debe tener al menos 3 caracteres",
                                                }
                                            })}
                                            onChange={(e) => { handlePassword(e.target.value) }}
                                        />
                                        {errors.password && <ErrorMessage><p>{errors.password.message}</p></ErrorMessage>}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="text-light"><input type="checkbox" checked={saveData} onChange={(e) => { setSaveData(e.target.checked) }} /> Recordar usuario y contraseña</Form.Label>
                                    </Form.Group>
                                    {/* <Form.Group>
                                        <Form.Label>
                                            <Link to="/recuperar-clave" className="text-light text-decoration-underline">¿Olvidaste tu contraseña?</Link>
                                        </Form.Label>
                                    </Form.Group> */}
                            {/* <div className="d-flex flex-column align-items-center mt-2">
                                        <Button variant="primary" type="submit" className="w-100">
                                            Iniciar Sesión
                                        </Button>
                                        <p className="text-light mt-3">O ingresar con:</p>
                                        <OAuth2Login
                                            className="w-100 rounded py-2 bg-light text-primary"
                                            authorizationUrl={tgdCredentials.authURL}
                                            responseType="code"
                                            clientId={tgdCredentials.clientId}
                                            redirectUri={tgdCredentials.redirectURI}
                                            onSuccess={onSuccess}
                                            onFailure={onFailure}>
                                            Tu Gobierno Digital
                                        </OAuth2Login> */}
                            {/* <Link to="/register" className="text-light mt-3 ">Crear cuenta en Portal del Paciente</Link> */}
                            {/* </div> */}
                            {/* </Form> */}
                            {/* </Col> */}
                        </Row>
                    }
                </Container>
            }
        </div>
    )
}

export default LoginPerson;
