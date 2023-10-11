import { Col, Row } from "react-bootstrap"

const ItemCard = (props) => {

    const {title, value, date} = props
    const localeDate = date ? '(' + new Date(date).toLocaleDateString() + ')' : ''
    return (
        <Row>
            <Col className='d-flex justify-content-end'>
                <p className='text-uppercase mb-0'>{title} <span className="fw-light">{localeDate}</span>:</p>
            </Col>
            <Col xs={12} sm={6} className="d-flex align-items-end">
                <input type="text" disabled className='border ps-2 fst-italic fw-light w-100'
                    value={value || 'Sin datos'} />
            </Col>
        </Row>
    )

}
export default ItemCard 