import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
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
import { deleteUserAdmin, getUserAdminById, postCreateUserAdmin, putUpdateUserAdmin } from "../../../../services/adminServices";

export default function RegisterAdmin() {

    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const action = location.pathname.split('/panel/')[1];
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    const editId = params.id;
    const [values, setValues] = useState(ValuesRegisterAdminForm); //Get and set values form
    const [changePassword, setChangePassword] = useState(true);

    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

    // SI EL FORMULARIO ES DE EDICION, BUSCA DATOS DE USUARIo
    useEffect(() => {
        if (action === 'editar' && editId) {
            let data = { user_id: editId }
            getUserData(data);
            setChangePassword(false);
        }
    }, [])


    const getUserData = useCallback((id) => {
        getUserAdminById(id)
            .then(
                (res) => {
                    let user = {
                        id_person: res.id_person,
                        username: res.username,
                        password: res.password
                    }
                    // SETEA EN VALUES
                    setValues(user);
                    // SETEA EN FORM
                    Object.keys(values).forEach((key, value) => {
                        setValue(`${key}`, value);
                    })
                }
            )
            .catch(
                (err) => {
                    console.error(err);
                    Swal.fire(error('Error al cargar datos de usuario administrador'))
                    history.push('/admin/panel/listado')
                }
            )
    }, [])

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
            setValue(`${targetName}`, values[targetName]);
        }
    }
    const handleChangePassword = () => {
        setChangePassword(true);
        setValues({
            ...values,
            ['password']: "",
        });
        // SETVALUE DE REACT FORM SIRVE PARA QUE EL FORM DETECTE LOS CAMBIOS
        setValue('password', "");
    }

    const buildBody = () => {
        let body = values
        delete body.confirmPassword
        if (action === 'registrar') {
            registerNewUserAdmin(body);
        }
        //TODO: como es el body para editar???
        else if (action === 'editar') {
            editUserAdmin(body);
        }
    }

    const onSubmit = () => {
        Swal.fire(confirm(`¿Confirma ${action === 'registrar' ? 'registro' : 'edición'} de usuario administrador?`, false)).then((result) => {
            if (result.isConfirmed) {
                setLoading(true)
                buildBody();
            }
        })
    }

    const registerNewUserAdmin = useCallback((body) => {
        // postCreateUserAdmin(body)
        //     .then((res) => {
        //         if (res.ok) {
        //             Swal.fire(success('Usuario administrador creado'))
        //             history.push('/admin/panel/listado')
        //         } else {
        //             throw new Error('Hubo un error al confirmar datos')
        //         }
        //     })
        //     .catch((err) => {
        //         console.error('error', err)
        //         Swal.fire(error('Hubo un error al crear usuario'))
        //         setLoading(false)
        //     })
    }, []);

    const editUserAdmin = useCallback((body) => {
        putUpdateUserAdmin(body)
            .then((res) => {
                if (res.ok) {
                    Swal.fire(success('Usuario administrador editado'))
                    history.push('/admin/panel/listado')
                } else {
                    throw new Error('Hubo un error al confirmar datos')
                }
            })
            .catch((err) => {
                console.error('error', err)
                Swal.fire(error('Hubo un error al editar usuario'))
                setLoading(false)
            })
    }, [])

    const submitDelete = (idUser) => {
        Swal.fire(confirm(`¿Desea eliminar usuario administrador?`, false)).then((result) => {
            if (result.isConfirmed) {
                setLoading(true)
                let data = { user_id: idUser }
                deleteUser(data);
            }
        })
    }

    const deleteUser = useCallback(
        (idUser) => {
            deleteUserAdmin(idUser)
                .then(
                    //TODO: que sucede al eliminar
                    (res) => {
                        history.push('/admin/panel/listado');
                    }
                )
                .catch(
                    (err) => {
                        console.error(err);
                        Swal.fire(error('Hubo un error al eliminar usuario administrador'));
                    }
                )
        }, []
    )

    return (
        <>
            {loading ?
                <Loader isActive={loading}></Loader>
                : <>
                    <Col xs={12} sm={7} lg={5} className="border border-secundary p-3 rounded mb-2 border-opacity-50">
                        <h5 className="text-capitalize">{action} usuario</h5>
                        <Form className="form-group form_register" onSubmit={handleSubmit(() => onSubmit())}>
                            {/* <Col xs={12}>
                                <FormGroup inputType='input' label='Nombre' name='name' value={values.name}
                                    {...register('name', {
                                        required: { value: true, message: "El campo es requerido." }
                                    })}
                                    onChange={handleChange}
                                />
                                {errors.name && <ErrorMessage><p>{errors.name.message}</p></ErrorMessage>}
                            </Col>
                            <Col xs={12}>
                                <FormGroup inputType='input' label='Apellido' name='surname' value={values.surname}
                                    {...register('surname', {
                                        required: { value: true, message: "El campo es requerido." },
                                    })}
                                    onChange={handleChange}
                                />
                                {errors.surname && <ErrorMessage><p>{errors.surname.message}</p></ErrorMessage>}
                            </Col> */}
                            <Col xs={12} sm={6}>
                                <FormGroup inputType='input' label='Nombre de Usuario' name='username' value={values.username}
                                    {...register('username', {
                                        required: { value: true, message: "El campo es requerido." },
                                    })}
                                    onChange={handleChange}
                                />
                                {errors.username && <ErrorMessage><p>{errors.username.message}</p></ErrorMessage>}
                            </Col>
                            <Col xs={12} sm={6}>
                                <FormGroup inputType='input' type='password' label='Contraseña' name='password'
                                    value={values.password} disabled={!changePassword}
                                    {...register('password', {
                                        required: { value: true, message: "El campo es requerido." },
                                    })}
                                    onChange={handleChange}
                                />
                                {!changePassword &&
                                    <button className="btn text-primary btn-sm"
                                        onClick={() => handleChangePassword()} >Cambiar contraseña
                                    </button>
                                }
                                {errors.password && <ErrorMessage><p>{errors.password.message}</p></ErrorMessage>}
                            </Col>
                            {changePassword && <Col xs={12} sm={6} >
                                <FormGroup inputType='input' label='Confirmar Contraseña' name='confirmPassword' value={values.confirmPassword} type='password'
                                    {...register('confirmPassword', {
                                        validate: (value) => value === getValues("password") || 'Las contraseñas no coinciden'
                                    })}
                                    onChange={handleChange}
                                />
                                {errors.confirmPassword && <ErrorMessage><p>{errors.confirmPassword.message}</p></ErrorMessage>}
                            </Col>}
                            {/* <Col>
                                <FormGroup inputType='radio' label='Activo' name='status' value={values.status} type='radio'
                                    onChange={handleChange}
                                />
                            </Col> */}
                            <Col xs={12} className="my-3">
                                <div className="d-flex w-100 justify-content-end align-items-center">
                                    {action === 'editar' &&
                                        <Button variant="danger" type="button" className="text-capitalize me-3" onClick={() => { submitDelete(values.id_person) }}>Eliminar</Button>
                                    }
                                    <Link to="/admin/panel/listado">
                                        <button className='btn btn-secondary me-3'>Cancelar</button>
                                    </Link>
                                    <Button variant="primary" type="submit" className="text-capitalize">{action}</Button>
                                </div>
                            </Col>
                        </Form>
                    </Col>
                </>
            }
        </>
    )
}
