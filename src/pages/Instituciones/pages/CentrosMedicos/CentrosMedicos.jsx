import { useEffect, useState, useCallback } from "react";
import institutionsServices from '../../../../services/institutionsServices'
import useAuth from '../../../../hooks/useAuth.js'
import Loader from '../../../../components/Loader'
import DataNotFound from "../../../../components/DataNotFound";
import { Container, Row } from "react-bootstrap";
import * as FaIcon from "react-icons/fa";

export default function CentrosMedicos() {

    const [ loading, setLoading] = useState(true);
    const [ notFound, setNotFound] = useState(false);
    var tokenUser = useAuth().tokenUser;

    const [institutions, setInstitutions] = useState([]);

    const getInstitutions = useCallback(
        () => {
            institutionsServices(tokenUser)
                .then((res) => {
                    const allInstitutions = res
                    return allInstitutions;
                })
                .then((res) => {
                    if(res.length > 0){
                        setInstitutions(res);
                        setLoading(false);
                        return institutions
                    } else {
                        setNotFound(true);
                        setLoading(false);
                    }
                })
                .catch((err) => { console.log(err) })
        },
        [institutions, tokenUser],
    )

    useEffect(() => {
        getInstitutions()
    }, [])

    return (
        <Container className="section-contennt in">
        <div className="d-flex">
            <FaIcon.FaRegBuilding className="menu-icon text-primary me-1"/>
            <h5 className='section-title mb-3'>Centros de salud pública</h5>
        </div>
        <Loader isActive={loading}></Loader>
        <Row className="my-3">
            {institutions?.length > 0 && institutions.map((ins) => {
                return (
                    <p key={ins.id}>{ins.name}</p>
                )
            })}
            {notFound && <DataNotFound text="instituciones" />}
        </Row>
    </Container>
    )
}
