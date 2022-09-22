import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import DataNotFound from "../../../../components/DataNotFound";
import Loader from "../../../../components/Loader";
import { getPersons } from "../../../../services/adminServices";
import { getAdminStatus } from "../../../../services/personServices";
import Swal from "sweetalert2";
import { error } from "../../../../components/SwalAlertData";
import { useForm } from "react-hook-form";
import { ValuesRegisterAdminForm } from "../../../../components/RegisterForm/Forms/FormData";
import FormGroup from "../../../../components/RegisterForm/Forms/FormGroup";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";
import { useLocation } from "react-router-dom";

export default function RegisterAdmin() {

    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const action = location.pathname.split('/panel/')[1];
    const [values, setValues] = useState(ValuesRegisterAdminForm); //Get and set values form
    const [newValue, setNewValue] = useState("") //Get and set values form to validate required fields


    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm();


    // set values 
    const handleChange = (e) => {
        console.log(e.target.value)
        if (e.target?.name) {
            let targetName = e.target.name
            setValues({
                ...values,
                [targetName]: e.target?.value,
            }
            );
            console.log(values);
        }
    }


    const buildBody = () => {

    }

    const onSubmit = () => {
        console.log('values', values);
        console.log('newvalues', newValue);

    }

    return (
        <>
            {loading ?
                <Loader isActive={loading}></Loader>
                : <>
                    <h5 className="text-capitalize">{action} usuario</h5>
                    <Form className="form-group form_register" onSubmit={handleSubmit(() => onSubmit())}>
                        <Col xs={12} sm={7} lg={5}>
                            <FormGroup inputType='input' label='Nombre' name='name' value={values.name}
                                {...register('name', {
                                    required: { value: true, message: "El campo es requerido." },
                                })}
                                onChange={handleChange}
                            />
                            {errors.name && <ErrorMessage><p>{errors.name.message}</p></ErrorMessage>}
                        </Col>
                        <Col xs={12} sm={7} lg={5} >
                            <FormGroup inputType='input' label='Apellido' name='surname' value={values.surname}
                                {...register('surname', {
                                    required: { value: true, message: "El campo es requerido." },
                                })}
                                onChange={handleChange}
                            />
                            {errors.surname && <ErrorMessage><p>{errors.surname.message}</p></ErrorMessage>}
                        </Col>
                        <Col xs={12} sm={5} lg={3} >
                            <FormGroup inputType='input' label='Nombre de Usuario' name='username' value={values.username}
                                {...register('username', {
                                    required: { value: true, message: "El campo es requerido." },
                                })}
                                onChange={handleChange}
                            />
                            {errors.username && <ErrorMessage><p>{errors.username.message}</p></ErrorMessage>}
                        </Col>
                        <Col xs={12} sm={5} lg={3} >
                            <FormGroup inputType='input' label='Contraseña' name='password' value={values.password}
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
                        <Col xs={12} sm={7} lg={5} className="my-3">
                            <div className="d-flex w-100 justify-content-end align-items-center">
                                <Button variant="primary" type="submit" className="text-capitalize">{action}</Button>
                            </div>
                        </Col>
                    </Form>
                </>
            }
        </>
    )
}
