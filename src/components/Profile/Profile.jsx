import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import FormGroup from '../RegisterForm/Forms/FormGroup';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { getPersonByIdentificationNumber, updatePerson } from '../../services/personServices';
import Loader from '../Loader/Loader';
import { LabelsFormData, ValuesRegisterForm } from '../RegisterForm/Forms/FormData';
import { error, confirm, success } from '../SwalAlertData';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import * as MdIcon from 'react-icons/md'
import { establecimientosDataHardcode } from '../EstablecimientosDataHardcode';

function Profile({ show, handleClose, dataExiste, type, identification_number}) {

    const [loading, setLoading] = useState(true)
    const f = LabelsFormData //Information to build form fields
    const auth = useAuth();
    const dni = type === 'user' ? auth.user.identification_number : identification_number;
    //button
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [values, setValues] = useState(ValuesRegisterForm)
    const [newValue, setNewValue] = useState("") //Get and set values form to required
    const institutionsHardcode = establecimientosDataHardcode;

    //set form with data
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setForm = (data) => {
        if (show) {
            Object.entries(data).forEach(([key, value]) => {
                setValue(`${key}`, value);
                values[`${key}`] = value;
                if (key === 'id' && value) {
                    values.id_person = value;
                    setValue('id_person', value);
                }
                if (key === 'birthdate' && value) {
                    let isoDate = value.includes('T') ? value : value + 'T00:00:00';
                    values.birthdate = new Date(isoDate);
                    setValue(`${key}`, isoDate);
                }
            });
        }
    }

    const getData = useCallback(
        () => {
                getPersonByIdentificationNumber(dni)
                .then((res) => {
                    setForm(res);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                    Swal.fire(error('Error al obtener datos'))
                })
        }, [])

    useEffect(() => {
        getData();
    }, [show])

    // set new values 
    const handleChange = (e) => {
        if (e.target?.name) {
            let targetName = e.target.name;
            let targetValue = e.target.value;
            setValues({
                ...values,
                [`${targetName}`]: targetValue,
            });
            setNewValue(targetName);
        } else if (e) {
            setValues({
                ...values,
                ["birthdate"]: e,
            });
            setValue('birthdate', e);
        }
    }

    const handleInstitution = (e) => {
        if (e.name) {
            let institution = institutionsHardcode[e.id]
            values['id_usual_institution'] = institution.CUIE;
            setValue('id_usual_institution', institution.CUIE)
        }
    }


    const setInstitution = (idInstitution) => {
        let institution = establecimientosDataHardcode.find((inst) => inst.CUIE === idInstitution);
        return institution ? institution.name : ''
    }   

    useEffect(() => {
        setValue(`${newValue}`, values[newValue]);
    }, [newValue, values])

    const onSubmit = () => {
        Swal.fire(confirm(`¿Desea actualizar los datos de ${type === 'user' ? 'usuario' : 'paciente'}`)).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                buildBodyToSend(values);
                values.birthdate = '';
            }
        });
    }

    const buildBodyToSend = (data) => {
        let body = data;
        delete body.confirmEmail
        delete body.confirmPassword
        delete body.postal_address
        delete body.family_group
        delete body.photo_dni_front //note - is necesary, but not now
        delete body.photo_dni_back //note - is necesary, but not now
        delete body.username
        delete body.password
        delete body.access_token
        body.id_person = body.id
        body.is_diabetic = body.is_diabetic?.toString() == 'true' ? true : false
        body.is_hypertensive = body.is_hypertensive?.toString() == 'true' ? true : false
        body.is_chronic_kidney_disease = body.is_chronic_kidney_disease?.toString() == 'true' ? true : false
        body.is_chronic_respiratory_disease = body.is_chronic_respiratory_disease?.toString() == 'true' ? true : false
        let date = new Date(body.birthdate).toLocaleDateString();
        body.birthdate = date;
        sendUpdatePersonForm(body);
    }

    const sendUpdatePersonForm = useCallback(
        (body) => {
            updatePerson(body)
                .then((res) => {
                    if (res.ok) {
                        return res.text().then(text => {
                            let readeble = JSON.parse(text)
                            if (readeble.status) {
                                Swal.fire(success('El usuario ha sido actualizado', true));
                                if (type === 'user') auth.setUserNewData(values);
                                handleClose()
                                setLoading(false)
                            } else {
                                Swal.fire(error('Error al actualizar datos de usuario'));
                                setLoading(false)
                                throw new Error(text)
                            }
                        })
                    }
                })
                .catch((err) => {
                    console.error('error', err)
                    Swal.fire(error('Error al actualizar datos de usuario'))
                    handleClose()
                    setLoading(false)
                })
        },
        [],
    )


    const personalDataForm =
        <Row className='in d-flex'>
            <Col xs={12}>
                <FormGroup
                    inputType={f.name.inputType} l
                    abel={f.name.label}
                    name={f.name.form_name}
                    value={values.name}
                    disabled />
            </Col>
            <Col xs={12}>
                <FormGroup
                    inputType={f.surname.inputType}
                    label={f.surname.label}
                    name={f.surname.form_name}
                    value={values.surname}
                    disabled />
            </Col>
            <Col xs={12} sm={6}>
                <FormGroup
                    inputType={f.id_identification_type.inputType} l
                    abel={f.id_identification_type.label}
                    name={f.id_identification_type.form_name}
                    selectValue={values.id_identification_type}
                    variants={f.id_identification_type.variants}
                    handleChange={(e) => handleChange(e)}
                    {...register(`${f.id_identification_type.form_name}`, f.id_identification_type.register)}
                />
                {errors[f.id_identification_type.form_name] && <ErrorMessage><p>{errors[f.id_identification_type.form_name].message}</p></ErrorMessage>}
            </Col>
            <Col xs={12} sm={6}>
                <FormGroup
                    inputType={f.identification_number.inputType}
                    label={f.identification_number.label}
                    name={f.identification_number.form_name}
                    value={values.identification_number}
                    disabled
                />
            </Col>
            <Col xs={12} sm={6}>
                <FormGroup
                    inputType={f.birthdate.inputType}
                    label={f.birthdate.label}
                    name={f.birthdate.form_name}
                    value={values.birthdate}
                    selectValue={values.birthdate}
                    {...register(`${f.birthdate.form_name}`, f.birthdate.register)}
                    handleChange={(e) => handleChange(e)}
                />
                {errors[f.birthdate.form_name] && <ErrorMessage><p>{errors[f.birthdate.form_name].message}</p></ErrorMessage>}
            </Col>
            <Col xs={12} sm={6}>
                <FormGroup
                    inputType={f.id_gender.inputType}
                    label={f.id_gender.label}
                    name={f.id_gender.form_name}
                    selectValue={values.id_gender}
                    variants={f.id_gender.variants}
                    handleChange={(e) => handleChange(e)}
                    {...register(`${f.id_gender.form_name}`, f.id_gender.register)}
                />
                {errors[f.id_gender.form_name] && <ErrorMessage><p>{errors[f.id_gender.form_name].message}</p></ErrorMessage>}
            </Col>
        </Row>

    const contactDataForm =
        <Row className="in">
            <Col xs={12} >
                <FormGroup
                    inputType={f.email.inputType}
                    label={f.email.label}
                    name={f.email.form_name}
                    value={values.email}
                    {...register(`${f.email.form_name}`, f.email.register)}
                    onChange={handleChange}
                />
                {errors[f.email.form_name] && <ErrorMessage><p>{errors[f.email.form_name].message}</p></ErrorMessage>}
            </Col>
            <Col xs={12} sm={8}>
                <FormGroup
                    inputType={f.address_street.inputType}
                    label={f.address_street.label}
                    name={f.address_street.form_name}
                    value={values.address_street}
                    {...register(`${f.address_street.form_name}`, f.address_street.register)}
                    onChange={handleChange}
                />
                {errors[f.address_street.form_name] && <ErrorMessage><p>{errors[f.address_street.form_name].message}</p></ErrorMessage>}
            </Col>
            <Col xs={12} sm={4}>
                <FormGroup
                    inputType={f.address_number.inputType}
                    label={f.address_number.label}
                    name={f.address_number.form_name}
                    value={values.address_number}
                    {...register(`${f.address_number.form_name}`, f.address_number.register)}
                    onChange={handleChange}
                />
                {errors[f.address_number.form_name] && <ErrorMessage><p>{errors[f.address_number.form_name].message}</p></ErrorMessage>}
            </Col>
            <Col xs={12} sm={6}>
                <FormGroup
                    inputType={f.locality.inputType}
                    label={f.locality.label}
                    name={f.locality.form_name}
                    value={values.locality}
                    {...register(`${f.locality.form_name}`, f.locality.register)}
                    onChange={handleChange}
                />
                {errors[f.locality.form_name] && <ErrorMessage><p>{errors[f.locality.form_name].message}</p></ErrorMessage>}
            </Col>
            <Col xs={12} sm={6}>
                <FormGroup
                    inputType={f.department.inputType}
                    label={f.department.label}
                    name={f.department.form_name}
                    value={values.department}
                    {...register(`${f.department.form_name}`, f.department.register)}
                    onChange={handleChange}
                />
                {errors[f.department.form_name] && <ErrorMessage><p>{errors[f.department.form_name].message}</p></ErrorMessage>}
            </Col>
            <Col xs={12} >
                <FormGroup
                    inputType={f.phone_number.inputType}
                    label={f.phone_number.label}
                    name={f.phone_number.form_name}
                    value={values.phone_number}
                    {...register(`${f.phone_number.form_name}`, f.phone_number.register)}
                    onChange={handleChange}
                />
                {errors[f.phone_number.form_name] && <ErrorMessage><p>{errors[f.phone_number.form_name].message}</p></ErrorMessage>}
            </Col>
        </Row>

    const conditionDataForm =
        <Row className="in">
            <Col xs={12} >
                <p className='text-secondary mb-0'>Institución: {setInstitution(values.id_usual_institution)}</p>
                <FormGroup
                    inputType={f.id_usual_institution.inputType}
                    label={f.id_usual_institution.label}
                    name={f.id_usual_institution.form_name}
                    selectValue={values.id_usual_institution}
                    variants={f.id_usual_institution.variants}
                    handleChange={(e) => handleInstitution(e)}
                    {...register(`${f.id_usual_institution.form_name}`, f.id_usual_institution.register)}
                />
                {errors[f.id_usual_institution.form_name] && <ErrorMessage><p>{errors[f.id_usual_institution.form_name].message}</p></ErrorMessage>}
            </Col>
            <Col xs={12} className="mt-3">
                <Form.Label className="mb-0">¿Padecés alguna de las siguientes afecciones crónicas?</Form.Label>
                <FormGroup
                    inputType={f.is_diabetic.inputType}
                    label={f.is_diabetic.label}
                    name={f.is_diabetic.form_name}
                    value={values.is_diabetic} type={f.is_diabetic.type}
                    onChange={handleChange}
                />
                <FormGroup
                    inputType={f.is_hypertensive.inputType}
                    label={f.is_hypertensive.label}
                    name={f.is_hypertensive.form_name}
                    value={values.is_hypertensive}
                    type={f.is_hypertensive.type}
                    onChange={handleChange}
                />
                <FormGroup
                    inputType={f.is_chronic_respiratory_disease.inputType}
                    label={f.is_chronic_respiratory_disease.label}
                    name={f.is_chronic_respiratory_disease.form_name}
                    value={values.is_chronic_respiratory_disease}
                    type={f.is_chronic_respiratory_disease.type}
                    onChange={handleChange}
                />
                <FormGroup
                    inputType={f.is_chronic_kidney_disease.inputType}
                    label={f.is_chronic_kidney_disease.label}
                    name={f.is_chronic_kidney_disease.form_name}
                    value={values.is_chronic_kidney_disease}
                    type={f.is_chronic_kidney_disease.type}
                    onChange={handleChange}
                />
            </Col>
        </Row>

    return (

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            className="perfil-usuario"
        >
            <Modal.Header>
                <Modal.Title>
                    <MdIcon.MdOutlinePersonOutline className="menu-icon me-1" style={{ fontSize: 'x-large', marginBottom: '5px' }} />
                    Perfil del paciente
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? <Loader isActive={loading} />
                    : <Container fluid>
                        <Form className="form-group form_register" onSubmit={handleSubmit(onSubmit)}>
                            <h5>Datos personales</h5>
                            {personalDataForm}
                            <hr />
                            <h5>Datos de contacto</h5>
                            {contactDataForm}
                            <hr />
                            <h5>Datos de historia clínica</h5>
                            {conditionDataForm}
                            <div className='d-flex justify-content-end'>
                                {dataExiste && <Button variant='outline-secondary' className="me-2" onClick={() => handleClose()}>Cancelar</Button>}
                                <Button variant='primary' type="submit" >Guardar cambios</Button>
                            </div>
                        </Form>
                    </Container>
                }
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default Profile;
