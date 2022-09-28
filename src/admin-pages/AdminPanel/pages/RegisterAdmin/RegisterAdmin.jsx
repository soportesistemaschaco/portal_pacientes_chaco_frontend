import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
// import DataNotFound from "../../../../components/DataNotFound";
import Loader from "../../../../components/Loader";
// import { getPersons } from "../../../../services/adminServices";
// import { getAdminStatus } from "../../../../services/personServices";
import Swal from "sweetalert2";
import { error, confirm } from "../../../../components/SwalAlertData";
import { useForm } from "react-hook-form";
import { ValuesRegisterAdminForm } from "../../../../components/RegisterForm/Forms/FormData";
import FormGroup from "../../../../components/RegisterForm/Forms/FormGroup";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";
import { useLocation } from "react-router-dom";

export default function RegisterAdmin() {

    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const action = location.pathname.split('/panel/')[1];
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
    const editId = params.id;
    const [values, setValues] = useState(ValuesRegisterAdminForm); //Get and set values form

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    // SI EL FORMULARIO ES DE EDICION, BUSCA DATOS DE USUARIo
    useEffect(() => {
        if (action === 'editar' && editId) {
            getUserData(editId);
        }
    }, [])


    const getUserData = useCallback((id) => {
        // TRAE DATA DE USUARIO Y LA SETEA EN VALUES y en FORM
        // hardcode data
        let dataHardcode = {
            name: "violeta  ",
            surname: "pugliese",
            password: "123",
            username: "violeta",
            status: true,
        }
        // SETEA EN VALUES
        setValues(dataHardcode);
        // SETEA EN FORM
        Object.keys(values).forEach((key, value) => {
            setValue(`${key}`, values[key]);
        })
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

    const buildBody = () => {
        let body = values
        if (action === 'registrar') registerNewUserAdmin(body)
        else if (action === 'editar') editUserAdmin(body);
    }

    const onSubmit = () => {
        Swal.fire(confirm(`¿Confirma ${action === 'registrar' ? 'registro' : 'edición'} de usuario administrador?`, false)).then((result) => {
            if (result) {
                setLoading(true)
                buildBody();
            }
        })
    }

    const registerNewUserAdmin = useCallback((body) => {
        // registerPersonAndUserService(body)
        //     .then((res) => {
        //         if (res.ok) {
        //             return res.text().then(text => {
        //                 let readeble = JSON.parse(text)
        //                 if (readeble.status) {
        //                     auth.newRegisterUser(body)
        //                     setNewPersonId(readeble.value)
        //                     setStep(4)
        //                     setLoading(false)
        //                 } else {
        //                     Swal.fire(error('Hubo un error al confirmar datos'))
        //                     throw new Error(text)
        //                 }
        //             })
        //         } else {
        //             Swal.fire(error('Hubo un error al confirmar datos'))
        //             setLoading(false)
        //         }
        //     })
        //     .catch((err) => {
        //         console.log('error', err)
        //         Swal.fire(error('Hubo un error al confirmar datos'))
        //         setLoading(false)
        //     })
    }, []);

    const editUserAdmin = useCallback((body) => {
        // updatePerson(body)
        //     .then((res) => {
        //         if (res.ok) {
        //             return res.text().then(text => {
        //                 let readeble = JSON.parse(text)
        //                 if (readeble.status) {
        //                     Swal.fire(confirm('El usuario ha sido actualizado. Verás los cambios cuando vuelvas a iniciar sesión.', true))
        //                     setLoading(false)
        //                     handleClose()
        //                 } else {
        //                     Swal.fire(error('Error al actualizar datos de usuario'))
        //                     setLoading(false)
        //                     throw new Error(text)
        //                 }
        //             })
        //         }
        //     })
        //     .catch((err) => {
        //         console.log('error', err)
        //         Swal.fire(error('Error al actualizar datos de usuario'))
        //         setLoading(false)
        //         handleClose()
        //     })
    }, [])

    return (
        <>
            {loading ?
                <Loader isActive={loading}></Loader>
                : <>
                    <Col xs={12} sm={7} lg={5} className="border border-secundary p-3 rounded mb-2 border-opacity-50">
                        <h5 className="text-capitalize">{action} usuario</h5>
                        <Form className="form-group form_register" onSubmit={handleSubmit(() => onSubmit())}>
                            <Col xs={12}>
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
                            </Col>
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
                                <FormGroup inputType='input' type='password' label='Contraseña' name='password' value={values.password}
                                    {...register('password', {
                                        required: { value: true, message: "El campo es requerido." },
                                    })}
                                    onChange={handleChange}
                                />
                                {errors.password && <ErrorMessage><p>{errors.password.message}</p></ErrorMessage>}
                            </Col>
                            <Col>
                                <FormGroup inputType='radio' label='Activo' name='status' value={values.status} type='radio'
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col xs={12} className="my-3">
                                <div className="d-flex w-100 justify-content-end align-items-center">
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
