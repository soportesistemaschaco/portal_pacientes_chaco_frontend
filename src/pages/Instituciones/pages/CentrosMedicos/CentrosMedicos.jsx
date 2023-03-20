import { useEffect, useState, useCallback } from "react";
import { efectoresServices } from '../../../../services/institutionsServices'
import useAuth from '../../../../hooks/useAuth.js'
import Loader from '../../../../components/Loader'
import DataNotFound from "../../../../components/DataNotFound";
import { Card, Col, Container, Row } from "react-bootstrap";
import * as FaIcon from "react-icons/fa";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

export default function CentrosMedicos() {

    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    var tokenUser = useAuth().tokenUser;

    const [institutions, setInstitutions] = useState([]);
    const [searchInstitutions, setSearchInstitutions] = useState([]);

    const getInstitutions = useCallback(
        () => {
            efectoresServices(tokenUser)
                .then((res) => {
                    const allInstitutions = res
                    return allInstitutions;
                })
                .then((res) => {
                    if (res.length > 0) {
                        let items = res
                            .map((item) => {
                                return {
                                    id: item.cuie,
                                    name: item.Servicio.split(' - ')[1],
                                    direccion: item.Direccion,
                                    localidad: item.Localidad,
                                    zona: item.Zona
                                }
                            })
                            .sort((a, b) => {
                                if (a.name == b.name) { return 0; }
                                if (a.name < b.name) { return -1; }
                                return 1;
                            });
                        setInstitutions(items);
                        setSearchInstitutions(items);
                        setLoading(false);
                        return institutions
                    } else {
                        setNotFound(true);
                        setLoading(false);
                    }
                })
                .catch((err) => { 
                    console.error(err);
                    setNotFound(true);
                    setLoading(false);
                })
        },
        [institutions, tokenUser],
    )

    useEffect(() => {
        getInstitutions()
    }, [])

    const handleOnSearch = (string, results) => {
        setSearchInstitutions(results);
    }
    const handleOnSelect = (item) => {
        setSearchInstitutions([item]);
    }
    const handleOnClear = () => {
        setSearchInstitutions(institutions);
    }

    return (
        <Container className="section-contennt in">
            <div className="d-flex">
                <FaIcon.FaRegBuilding className="menu-icon text-primary me-1" />
                <h5 className='section-title mb-3'>Centros de salud pública</h5>
            </div>
            <Loader isActive={loading}></Loader>
            <Row className="my-3">
                <Col xs={12} md={6} className="mb-3">
                    <ReactSearchAutocomplete
                        items={institutions}
                        onSearch={handleOnSearch}
                        onSelect={handleOnSelect}
                        onClear={handleOnClear}
                        styling={{
                            height: "34px",
                            border: "1px solid gray",
                            borderRadius: "4px",
                            backgroundColor: "white",
                            boxShadow: "none",
                            fontSize: "12px",
                            fontFamily: "Courier",
                            clearIconMargin: "3px 8px 0 0",
                            zIndex: 2,
                        }}
                    />
                </Col>
                {searchInstitutions?.length > 0 && searchInstitutions.map((ins) => {
                    return (
                        <Col key={ins.id} xs={12}>
                            <Card className="mb-3 shadow-sm">
                                <Card.Header>
                                    <span className='fw-bolder mb-0'>{ins.name}</span>
                                </Card.Header>
                                <Card.Body>
                                    <blockquote className="blockquote mb-0">
                                        <p>Dirección: <span>{ins.direccion || ' - '}</span></p>
                                        <p>Localidad: <span>{ins.localidad || ' - '}</span></p>
                                        <p>Zona: <span>{ins.zona || ' - '}</span></p>
                                    </blockquote>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
                {notFound && <DataNotFound text="instituciones" />}
            </Row>
        </Container>
    )
}
