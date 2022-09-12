import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import '../../styles/Transitions.scss'
import useAuth from '../../hooks/useAuth';
import Loader from "../../components/Loader";
// import { loginServiceFetch } from "../../services/loginService";
import OAuth2Login from 'react-simple-oauth2-login';
import logo from '../../assets/statics/logo-light.svg'
import logoTGD from '../../assets/statics/logo-tgd-colors.svg'
import { environment } from "../../environments/environments.demo";


function LoginPerson() {

    const [loading, setLoading] = useState(false);
    const auth = useAuth();
    const history = useHistory();
    const location = useLocation();
    const previousObjetURL = location.state?.from

    const search = location.search;
    const code = search.split('code=')[1];
    const { handleSubmit } = useForm();

    const tgdCredentials = {
        clientId: environment.tgd.clientId,
        clientSecret: environment.tgd.clientSecret,
        redirectURI: environment.tgd.redirectURI,
        authURL: environment.tgd.authURL + '/auth'
    }

    const onSuccess = response => console.log(response);
    const onFailure = response => console.error(response);

    useEffect(() => {
        if (auth.isLogged()) history.push(previousObjetURL || "/usuario")
    }, [auth, history, previousObjetURL])

    const onSubmit = () => {
        // TODO: HARDCODE
        auth.loginPerson('violeta.pugliese@gmail.com', 123546);
    }

    useEffect(() => {
        if (code) {
            setLoading(true);
            getUserData(code);
        }
    }, [code])

    const getUserData = (code) => {
        const searchParamsTGD = {
            grant_type: 'authorization_code',
            client_id: tgdCredentials.clientId,
            client_secret: tgdCredentials.clientSecret,
            redirect_uri: tgdCredentials.redirectURI,
            code: code
        }
        auth.getUserTokenTGD(searchParamsTGD);
        setLoading(false);
    }

    return (
        <div className="bg-container">
            {loading ? <Loader isActive={loading} />
                : <Container className='z-index-1 '>
                    <Row className='w-100 d-flex justify-content-center in'>
                        <Col xs={10} md={4} lg={3} className="d-flex flex-column justify-content-around align-items-center h-100">
                            <img src={logo} className="w-100" alt="Logo blanco Portal del paciente Chaco" />
                            <h6 className="text-center text-light my-3">Ingresar con: </h6>
                            <OAuth2Login
                                className="btn-tgd"
                                authorizationUrl={tgdCredentials.authURL}
                                responseType="code"
                                clientId={tgdCredentials.clientId}
                                redirectUri={tgdCredentials.redirectURI}
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
            }
        </div>
    )
}

export default LoginPerson;
