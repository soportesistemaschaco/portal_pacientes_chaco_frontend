import { Col } from "react-bootstrap"

const ItemConsulta = (props) => {

    const { clinicalSpecialty, date, professional, evolutionNote, clinicalImpressionNote, physicalExamNote } = props
    const localeDate = new Date(date).toLocaleDateString();

    return (
        <Col xs={12} className="border m-2 p-2">
            <span className="fw-bold">{clinicalSpecialty.name}</span> <span className="">{localeDate}</span>
            <p>{professional.person.lastName}, {professional.person.firstName}</p>
            <p className="fst-italic fw-light">Informe: {evolutionNote} {clinicalImpressionNote} {physicalExamNote} 
            {!evolutionNote && !clinicalImpressionNote & !physicalExamNote ? 'Sin datos' : ''} </p>
        </Col>
    )
}
export default ItemConsulta