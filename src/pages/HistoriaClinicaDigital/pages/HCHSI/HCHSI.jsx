import React, { useCallback, useEffect, useState } from 'react';
import usePatient from '../../../../hooks/usePatient';
import Loader from '../../../../components/Loader';
import DataNotFound from '../../../../components/DataNotFound';
import { Accordion, Card, Col, Row } from 'react-bootstrap';
import patientClinicHistoryHSI from '../../../../services/hceServices/HCHSI';
import ItemCard from './components/ItemCard';
import ItemConsulta from './components/ItemConsulta';

function HCHSI() {

    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const p = usePatient();
    const [data, setData] = useState([]);

    const getData = useCallback(
        (dni, dni_type, id_gender) => {
            patientClinicHistoryHSI(dni, dni_type, id_gender)
                .then((res) => {

                    // console.log(res)
                    if (res) {
                        // res.map((d) => {
                        // iterateObject(d)
                        // })
                        setData(res)
                        setNotFound(false);
                        setLoading(false);

                    } else {
                        setData([]);
                        setNotFound(true);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    console.error(err)
                    // Swal.fire(error('Hubo un error al solicitar datos'));
                    setData([]);
                    setNotFound(true);
                    setLoading(false);
                })
        },
        [data],
    )

    const iterateObject = (info) => {
        let patientData = []

        Object.entries(info).forEach(([key, value], i, obj) => {
            if (typeof value === 'string' || typeof value === 'number') {
                patientData.push(`${key}: ${value}`)
            }
            if (typeof value === 'object') {
                Object.entries(value).forEach(([k, v]) => {
                    patientData.push(`${k}: ${v}`)
                })
            }
            if (Object.is(obj.length - 1, i)) {
                setNewData(patientData)
            }
        })

    }

    const setNewData = (enteredInfo) => {
        data.push(enteredInfo);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        getData(p.patient.identification_number, p.patient.id_identification_type, p.patient.id_gender);
    }, [p.patient]);

    return (
        <div className='in'>
            {loading ?
                <Loader isActive={loading}></Loader>
                :
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <h6 className='text-uppercase fw-bold pt-3'>Datos Antropométricos</h6>
                        </Accordion.Header>
                        <Accordion.Body>
                            {data.anthropometricData ?
                                <Row>
                                    <Col className='d-flex flex-column pt-2'>
                                        <ItemCard title={'Grupo sanguíneo'} value={data.anthropometricData.bloodType?.value}></ItemCard>
                                        <ItemCard title={'Altura'} value={data.anthropometricData.height?.value}></ItemCard>
                                        <ItemCard title={'Peso'} value={data.anthropometricData.weight?.value}></ItemCard>
                                        <ItemCard title={'BMI'} value={data.anthropometricData.bmi?.value}></ItemCard>
                                        <ItemCard title={'Perímetro cefálico'} value={data.anthropometricData.headCircumference?.value}></ItemCard>
                                        <ItemCard title={'cisrcunferencia cadera'} value={data.anthropometricData.hipCircumference?.value}></ItemCard>
                                        {data.anthropometricData.gestationalAge ?
                                            <ItemCard title={'Edad Gestacional'} value={data.anthropometricData.gestationalAge?.value}></ItemCard> : ''}
                                        {data.anthropometricData.lastMenstrualPeriod ?
                                            <ItemCard title={'Última menstruacion'} value={data.anthropometricData.lastMenstrualPeriod?.value}></ItemCard> : ''}
                                    </Col>
                                </Row> : <>Sin datos</>}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            <h6 className='text-uppercase fw-bold pt-3'>Factores de riesgo</h6>
                        </Accordion.Header>
                        <Accordion.Body>
                            {data.riskFactors ?
                                <Row className='mt-2'>
                                    <Col className='d-flex flex-column pt-2'>
                                        {data.riskFactors?.current?.bloodGlucose ?
                                            <ItemCard
                                                title={'Glucosa en sangre'}
                                                date={data.riskFactors?.current?.bloodGlucose.effectiveTime}
                                                value={data.riskFactors.current.bloodGlucose?.value}></ItemCard> : ''}
                                        {data.riskFactors?.current?.bloodOxygenSaturation ?
                                            <ItemCard
                                                title={'Oxígeno en sangre'}
                                                date={data.riskFactors?.current?.bloodOxygenSaturation.effectiveTime}
                                                value={data.riskFactors.current.bloodOxygenSaturation?.value}></ItemCard> : ''}
                                        {data.riskFactors?.current?.cardiovascularRisk ?
                                            <ItemCard
                                                title={'Riesgo Cardiovascular'}
                                                date={data.riskFactors?.current?.cardiovascularRisk.effectiveTime}
                                                value={data.riskFactors.current.cardiovascularRisk?.value}></ItemCard> : ''}
                                        {data.riskFactors?.current?.diabetes ?
                                            <ItemCard
                                                title={'Diabetes'}
                                                date={data.riskFactors?.current?.diabetes.effectiveTime}
                                                value={data.riskFactors.current.diabetes?.value}></ItemCard> : ''}
                                        {data.riskFactors?.current?.diastolicBloodPressure ?
                                            <ItemCard
                                                title={'Presión arterial diastólica'}
                                                date={data.riskFactors?.current?.diastolicBloodPressure.effectiveTime}
                                                value={data.riskFactors.current.diastolicBloodPressure?.value}></ItemCard> : ''}
                                        {data.riskFactors?.current?.systolicBloodPressure ?
                                            <ItemCard
                                                title={'Presión arterial sistólica'}
                                                date={data.riskFactors?.current?.systolicBloodPressure.effectiveTime}
                                                value={data.riskFactors.current.systolicBloodPressure?.value}></ItemCard> : ''}
                                        {data.riskFactors?.current?.glycosylatedHemoglobin ?
                                            <ItemCard
                                                title={'Hemoglobina glicosilada'}
                                                date={data.riskFactors?.current?.glycosylatedHemoglobin.effectiveTime}
                                                value={data.riskFactors.current.glycosylatedHemoglobin?.value}></ItemCard> : ''}
                                        {data.riskFactors?.current?.heartRate ?
                                            <ItemCard
                                                title={'Ritmo cardíaco'}
                                                date={data.riskFactors?.current?.heartRate.effectiveTime}
                                                value={data.riskFactors.current.heartRate?.value}></ItemCard> : ''}
                                        {data.riskFactors?.current?.respiratoryRate ?
                                            <ItemCard
                                                title={'Ritmo respiratorio'}
                                                date={data.riskFactors?.current?.respiratoryRate.effectiveTime}
                                                value={data.riskFactors.current.respiratoryRate?.value}></ItemCard> : ''}
                                        {data.riskFactors?.current?.temperature ?
                                            <ItemCard
                                                title={'Temperatura'}
                                                date={data.riskFactors?.current?.temperature.effectiveTime}
                                                value={data.riskFactors.current.temperature?.value}></ItemCard> : ''}

                                    </Col>
                                </Row> : <>Sin Datos</>
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            <h6 className='text-uppercase fw-bold pt-3'>Alergias</h6>
                        </Accordion.Header>
                        <Accordion.Body>
                            Sin Datos
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>
                            <h6 className='text-uppercase fw-bold pt-3'>Medicación</h6>
                        </Accordion.Header>
                        <Accordion.Body>
                            Sin Datos
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>
                            <h6 className='text-uppercase fw-bold pt-3'>Consultas</h6>
                        </Accordion.Header>
                        <Accordion.Body>
                            {data.evolutions?.length > 0 ?
                                <Row>
                                    {data.evolutions.map((item, index) => {
                                        return (
                                            <ItemConsulta key={'itemConsulta' + index} clinicalSpecialty={item.clinicalSpecialty} date={item.startDate}
                                                professional={item.professional} evolutionNote={item.evolutionNote}
                                                clinicalImpressionNote={item.clinicalImpressionNote} physicalExamNote={item.physicalExamNote} />
                                        )
                                    })}
                                </Row>
                                : <>Sin Datos</>}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>}
            {notFound && <DataNotFound text="historia clínica" />}
        </div >
    )
}

export default HCHSI;
