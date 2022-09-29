import { Container, Row, Col, Button } from "react-bootstrap";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { useEffect, useState } from "react";
import { Bar, Pie } from 'react-chartjs-2';
import * as MdIcon from "react-icons/md";
import { useCallback } from "react";
import {LoginChart} from "./charts/LoginChart/LoginChart";
import { FamilyGroupChart } from "./charts/FamilyGroupChart/FamilyGroupChart";
import { HSIChart } from "./charts/HSIChart/HSIChart";
import { SumarChart } from "./charts/SumarChart/SumarChart";

export default function AdminDashboard() {
    const [data1, setData1] = useState(new Date());
    const [data2, setData2] = useState(new Date());
    const [data3, setData3] = useState(new Date());
    const [data4, setData4] = useState(new Date());
    const [search, setSearch] = useState(0);

    const getInfo = useCallback((from, to, search) => {
        console.log('getInfo')
        // IndicatorsService
        // Depende la busqueda, se setea una setData determinado y actualiza la info de los componentes
    }, [])

    const handleSearch = (from, to, search) => {
        console.log(search);
        getInfo(from, to, search);
        setSearch(search);
    }

    useEffect(() => {
        getInfo();
    }, [search]);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        ArcElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Usuarios TGD',
                // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Usuarios Portal del Paciente',
                // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };



    return (
        <Container className='p-3'>
            <h5 className='section-title'>Indicadores</h5>
            <Row className="p-3">
                <LoginChart reasults={data1} handleSearch={handleSearch}/>
                <FamilyGroupChart reasults={data2} handleSearch={handleSearch}/>
                <HSIChart reasults={data3} handleSearch={handleSearch}/>
                <SumarChart reasults={data4} handleSearch={handleSearch}/>
            </Row>
        </Container>
    )
}
