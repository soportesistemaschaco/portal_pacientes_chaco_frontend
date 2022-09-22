/* eslint-disable react-hooks/exhaustive-deps */
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
    const [accessToken, setAccessToken] = useState(null);
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

    // const onSuccess = (response) => {
    //     console.log(response);
    //         // if (code) {
    //             setLoading(true);
    //             getToken(code);
    //         // }
    // }
    const onSuccess = ({ code }) => fetch(`http://stage.ventanillaunica.chaco.gov.ar/oauth/v2/token?grant_type=authorization_code&client_id=109_469fzlhy0084gkscg4gsk8k88ow4kgggso8s44ososo80ccos8&client_secret=1pnatc2ds77ocoggsk0gw4ccsw4gswoocows40ogcww4owg0c8&redirect_uri=https%3A%2F%2Ftest-portal.salud.chaco.gob.ar%2Fcallback&code=${code}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      })
        .then(res => res.json())
        .then((data) => {
          setAccessToken(data.access_token);
          return data.access_token;
        })
        .then(token => fetch(`http://stage.ventanillaunica.chaco.gov.ar/api/v1/persona`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            authorization: `Bearer ${token}`,
          },
        }))
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));
    
    const onFailure = response => console.error(response);

    useEffect(() => {
        if (auth.isLogged()) history.push(previousObjetURL || "/usuario")
    }, [auth, history, previousObjetURL])

    const onSubmit = () => {
        // TODO: HARDCODE
        auth.loginPerson('violeta.pugliese@gmail.com', 123546);
    }

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
    //         redirect_uri: tgdCredentials.redirectURI,
    //         code: code
    //     }
    //     auth.getUserTokenTGD(searchParamsTGD);
    //     setLoading(false);
    // }

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
