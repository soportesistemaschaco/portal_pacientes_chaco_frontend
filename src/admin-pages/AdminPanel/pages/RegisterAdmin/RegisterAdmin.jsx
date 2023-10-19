import { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
// import DataNotFound from "../../../../components/DataNotFound";
import Loader from "../../../../components/Loader";
// import { getPersons } from "../../../../services/adminServices";
// import { getAdminStatus } from "../../../../services/personServices";
import Swal from "sweetalert2";
import { error, confirm, success } from "../../../../components/SwalAlertData";
import { useForm } from "react-hook-form";
import { ValuesRegisterAdminForm } from "../../../../components/RegisterForm/Forms/FormData";
import FormGroup from "../../../../components/RegisterForm/Forms/FormGroup";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
    getUserAdminById,
    postCreateUserAdmin,
    putAssignInstitutionsAdmin,
    putOnOffAdmin,
    putUpdateUserAdminPassword
} from "../../../../services/adminServices";
import * as FaIcon from 'react-icons/fa'
import Selector from "../../../Establecimientos/components/Selector/Selector";
import { efectoresServices } from "../../../../services/institutionsServices";
// import { getInstitutionsAllWithNewData } from "../../../../services/institutionsServices";

export default function RegisterAdmin() {

    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const userName = localStorage.getItem('userName');
    const action = location.pathname.split('/panel/')[1];
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    const editId = params.id;
    const [values, setValues] = useState(ValuesRegisterAdminForm); //Get and set values form
    const [changePassword, setChangePassword] = useState(false);
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
    /////// SELECTORES ////////////////////////////////////////////////////////
    const [instituciones, setInstituciones] = useState([]);
    const [institucionesSelected, setInstitucionesSelected] = useState([]);
    const [showSelector, setShowSelector] = useState(false);
    const [tipoSelector, setTipoSelector] = useState('');
    const openSelector = (tipo) => {
        setTipoSelector(tipo)
        setShowSelector(true);
    }
    const closeSelector = (tipo, dataSelecetd) => {
        if (dataSelecetd) {
            setInstitucionesEnForm(tipo, dataSelecetd)
        }
        setShowSelector(false);
    }

    const setInstitucionesEnForm = (tipo, data) => {
        let arrayIDs = data?.map((item) => item.id)
        values[tipo] = arrayIDs
        if (tipo === 'institutions') setInstitucionesSelected(data)
    }
    /////// SELECTORES ////////////////////////////////////////////////////////

    // SI EL FORMULARIO ES DE EDICION, BUSCA DATOS DE USUARIo
    useEffect(() => {
        if (action === 'editar' && editId) {
            setLoading(true)
        }
        if (action === 'registrar') {
            setForm({
                username: "",
                id: "",
                institutions: []
            })
            setChangePassword(true);
        }
        getInstituciones()
    }, [])

    const getUserData = useCallback((id, institutions) => {
        getUserAdminById(id)
            .then(
                (res) => {
                    // SETEA EN VALUES
                    let data = res
                    setForm(data)

                    // SETEA EN FORM
                    setValue('username', data.username)
                    setValue('confirmPassword', 'password')
                    return values
                }
            )
            .then((res) => {
                let institutionsAssigned = res.institutions
                if (res.old_institutions?.length > 0) {
                    res.old_institutions.forEach((instId) => {
                        let find = institutions.find((inst) => inst.id === instId)
                        if (find) institutionsAssigned.push(find)
                    })
                }
                return institutionsAssigned
            })
            .then((res) => setInstitucionesEnForm('institutions', res))
            .then(() => setLoading(false))
            .catch(
                (err) => {
                    console.error(err);
                    Swal.fire(error('Error al cargar datos de usuario administrador'))
                    history.push('/admin/panel/listado')
                }
            )
    }, [])

    //SET VALUES FROM DATA
    const setForm = (data) => {
        Object.entries(data).forEach(([key, value], index, arr) => {
            setValue(`${key}`, value);
            values[`${key}`] = value;
        });
    }

    // set values 
    const handleChange = (e) => {
        if (e.target?.name) {
            let targetName = e.target.name
            setValues({
                ...values,
                [targetName]: e.target?.value,
            }
            );
            // SETVALUE DE REACT FORM SIRVE PARA QUE EL FORM DETECTE LOS CAMBIOS
            setValue(`${targetName}`, e.target.value);
        }
    }
    const handleChangePassword = () => {
        if (!changePassword) {
            setChangePassword(true);
            setPassword("");
            setConfirmPassword("");
            // SETVALUE DE REACT FORM SIRVE PARA QUE EL FORM DETECTE LOS CAMBIOS
            setValue('password', "");
        }
    }

    const onPasswordChange = (value) => {
        setValue('password', value)
        setPassword(value);
    }
    const onConfirmPasswordChange = (value) => {
        setConfirmPassword(value);
        setValue('confirmPassword', value)
    }

    const getInstituciones = useCallback(
        () => {
            efectoresServices()
                .then((res) => {
                    let ordenado = res.sort((a, b) => {
                        if (a.name === b.name) { return 0; }
                        if (a.name < b.name) { return -1; }
                        return 1;
                    });
                    return ordenado
                })
                .then((res) => {
                    if (res?.length > 0) setInstituciones(res);
                    return res
                })
                .then((res) => {
                    if (action === 'editar') {
                        let data = { user_id: editId }
                        getUserData(data, res);
                    }
                })
                .catch((err) => { console.error(err) })
        },
        [],
    )

    const buildBody = (psw, name) => {
        let body = {...values}
        body.username = name;
        body.password = psw;
        return body
    }

    const onSubmit = () => {
        Swal.fire(confirm(`¿Confirma ${action === 'registrar' ? 'registro' : 'edición'} de usuario administrador?`, false)).then((result) => {
            if (result.isConfirmed) {
                setLoading(true)

                if (action === 'registrar') {
                    registerNewUserAdmin(password, values.username, institucionesSelected);
                }
                else if (action === 'editar') {
                    const arrayInstitutions = institucionesSelected?.map(item => item.id);
                    assignInstitutions({ username: values.username }, arrayInstitutions, password)
                }
            }
        })
    }

    const registerNewUserAdmin = useCallback((psw, name, instituciones) => {
        const body = buildBody(psw, name)
        postCreateUserAdmin(body)
            .then((res) => {
                if (res.ok) {
                    return res.text().then(text => {
                        let readeble = JSON.parse(text)
                        if (readeble.status) {
                            const arrayInstitutions = instituciones.map(item => item.id);
                            assignInstitutions({ username: name }, arrayInstitutions, password)
                        } else {
                            Swal.fire(error('Hubo un error al crear usuario'))
                            throw new Error(text)
                        }
                    })
                }
            })
            .catch((err) => {
                console.error('error', err)
                Swal.fire(error('Hubo un error al crear usuario'))
                setLoading(false)
            })
    }, []);


    const editUserAdminPassword = useCallback((psw, username) => {
        const body = buildBody(psw, username.username)
        putUpdateUserAdminPassword(body)
            .then((res) => {
                if (res.ok) {
                    Swal.fire(success('Usuario actualizado'))
                    history.push('/admin/panel/listado')
                }
            })
            .catch((err) => {
                console.error('error', err)
                Swal.fire(error('Hubo un error al editar usuario'))
                setLoading(false)
                let data = { user_id: editId }
                getUserData(data)
            })
    }, [changePassword])

    const assignInstitutions = useCallback(
        (username, arrayIDsInst, psw) => {
            // putAssignInstitutionsAdmin(username, arrayIDsInst)
            //     .then((res) => {
            //         if (res.ok) {
            //             if (action === 'registrar') {
            //                 Swal.fire(success('Usuario administrador creado'))
            //                 history.push('/admin/panel/listado')
            //             } else {
            //                 if (changePassword) {
                                editUserAdminPassword(psw, username)
                //             } else {
                //                 Swal.fire(success('Usuario actualizado'))
                //                 history.push('/admin/panel/listado')
                //             }
                //         }
                //     }
                // })
                // .catch((err) => console.error(err));
        }, [changePassword])

    const submitOnOff = (idUser, estadoActual) => {
        let change = estadoActual === 1 ? 'desactivar' : 'activar'
        Swal.fire(confirm(`¿Desea ${change} usuario administrador?`, false)).then((result) => {
            if (result.isConfirmed) {
                setLoading(true)
                let data = { user_id: idUser }
                onOffUser(data);
            }
        })
    }

    const onOffUser = useCallback(
        (idUser) => {
            putOnOffAdmin(idUser)
                .then(
                    (res) => {
                        if (res.status) {
                            history.push('/admin/panel/listado');
                            Swal.fire(success('El administrador ha sido modificado'));
                        } else {
                            throw new Error('Hubo un error al eliminar usuario administrador')
                        }
                    }
                )
                .catch(
                    (err) => {
                        console.error(err);
                        Swal.fire(error('Hubo un error al eliminar usuario administrador'));
                        history.push('/admin/panel/listado');
                    }
                )
        }, []
    )

    return (
        <>
            {loading ?
                <Loader isActive={loading}></Loader>
                : <>
                    <Row className="border border-secundary p-3 rounded mb-2 border-opacity-50">
                        <h5 className="text-capitalize">{action} usuario</h5>
                        <Form className="form-group form_register" onSubmit={handleSubmit(() => onSubmit())}>
                            <Col xs={12} md={6} lg={4}>
                                <Col xs={12} className="mb-2">
                                    <FormGroup
                                        inputType='input'
                                        label='Nombre de Usuario'
                                        name='username'
                                        value={values.username}
                                        disabled={action === 'editar'}
                                        {...register('username', {
                                            required: { value: true, message: "El campo es requerido." },
                                        })}
                                        onChange={handleChange}
                                    />
                                    {errors.username && <ErrorMessage><p>{errors.username.message}</p></ErrorMessage>}
                                </Col>
                                {!changePassword &&
                                    <Col xs={12} className="mb-2">
                                        <p className="text-primary mt-2 cursor"
                                            onClick={() => handleChangePassword()} ><FaIcon.FaKey /> Cambiar contraseña
                                        </p>
                                    </Col>
                                }
                                {changePassword &&
                                    <Col xs={12} className="mb-2">
                                        <FormGroup inputType='input' type='password' label='Contraseña' name='password'
                                            value={password}
                                            {...register('password', {
                                                required: { value: true, message: "El campo es requerido." },
                                            })}
                                            onChange={(e) => onPasswordChange(e.target.value)}
                                        />
                                        {errors.password && <ErrorMessage><p>{errors.password.message}</p></ErrorMessage>}
                                    </Col>
                                }
                                {changePassword &&
                                    <Col xs={12} className="mb-2">
                                        <FormGroup inputType='input' type='password' label='Confirmar Contraseña' name='confirmPassword'
                                            value={confirmPassword}
                                            {...register('confirmPassword', {
                                                validate: (value) => value === getValues("password") || 'Las contraseñas no coinciden'
                                            })}
                                            onChange={(e) => onConfirmPasswordChange(e.target.value)}
                                        />
                                        {errors.confirmPassword && <ErrorMessage><p>{errors.confirmPassword.message}</p></ErrorMessage>}
                                    </Col>
                                }
                            </Col>
                            <Col xs={12} className="mb-2 d-flex">
                                <div className="d-flex align-items-baseline mb-2">
                                    <label className="form-label me-1">Establecimientos asignados</label>
                                    <button className="btn text-primary" type="button" onClick={() => openSelector('institutions')}>{values.institutions?.length > 0 ? 'Agregar/Quitar' : 'Agregar'}...</button>
                                </div>
                                <div className="est-list">
                                    {institucionesSelected?.length > 0 && institucionesSelected.map((item) => {
                                        return <span className="me-1 d-inline-block" key={item.id}>{item.name + ' - '}</span>
                                    })}
                                </div>
                            </Col>
                            <Col xs={12} className="my-3">
                                <div className="d-flex w-100 justify-content-end align-items-center">
                                    {values.username && action === 'editar' && values.username !== userName &&
                                        <>
                                            {values.is_admin_activate === 1 && <Button variant="danger" type="button" className="text-capitalize me-3" onClick={() => { submitOnOff(values.id, values.is_admin_activate) }}>Desactivar Usuario</Button>}
                                            {values.is_admin_activate === 0 && <Button variant="success" type="button" className="text-capitalize me-3" onClick={() => { submitOnOff(values.id, values.is_admin_activate) }}>Activar Usuario</Button>}
                                        </>
                                    }
                                    <Link to="/admin/panel/listado">
                                        <button className='btn btn-outline-secondary me-3'>Cancelar</button>
                                    </Link>
                                    {(changePassword || institucionesSelected?.length > 0) && <Button variant="primary" type="submit" className="text-capitalize">{action}</Button>}
                                </div>
                            </Col>
                        </Form>
                    </Row>
                </>
            }
            {showSelector &&
                <Selector
                    show={showSelector}
                    tipo={tipoSelector}
                    close={closeSelector}
                    values={values}
                    dataList={instituciones} />
            }
        </>
    )
}
