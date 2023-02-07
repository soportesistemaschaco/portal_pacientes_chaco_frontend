import { Container } from "react-bootstrap";
import * as MdIcon from "react-icons/md";
import { institutionData } from "../../../../components/ComponentsData";

export default function Telefonos() {
    const data = institutionData

    return (
        <Container className="section-contennt in">
                <div className="d-flex">
                    <MdIcon.MdAccountBalance className="menu-icon text-primary me-1" />
                    <h5 className='section-title mb-3'>Datos institucionales</h5>
                </div>
            <div className='main-telefonos mt-3'>
                <div className="container">
                    <div className="row">
                        {/*colum1*/}
                        {/* <div className="encabezado">
                            <h4 className='mb-0 py-1 text-uppercase'>Contacto</h4>
                        </div> */}
                        <div className="col-12">
                            <h5 className="mt-3">{data.name}</h5>
                            <h6 className="mb-3">{data.gob}</h6>
                            <p><MdIcon.MdLocationOn className="menu-icon me-1"/> Dirección:  <a href={data.addressLink} target="_blank">{data.address}</a></p>
                            <p><MdIcon.MdEmail className="menu-icon me-1"/> Email: <a href={`mailto:${data.email}`}>{data.email}</a></p>
                            <p><MdIcon.MdPhone className="menu-icon me-1"/> Teléfono: {data.phone}</p>
                            <p><MdIcon.MdLanguage className="menu-icon me-1"/> Visitar <a href={data.webLink} target="_blank"> sitio web</a> </p>
                        </div>
                        {/*colum2*/}
                        {/* <div className="col">
                        <br />
                        
                    </div> */}

                        {/*colum3*/}

                    </div>
                </div>

            </div>
        </Container>
    )
}
