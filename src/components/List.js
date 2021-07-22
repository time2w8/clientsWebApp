import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import BarsLoading from '../shared/BarsLoading';
import { getClients, getAverage } from '../api/clients.api';
import { Chart } from 'primereact/chart';

const List = () => {

    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState([]);
    const [average, setAverage] = useState(0);

    const [chartDataState, setChartDataState] = useState([]);

    const chartData = [];

    const lightOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    };

    const getAge = (date) => {
        var today = new Date();
        var birthDate = new Date(date);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const newDataItem = (age) => {
        if (chartData.length === 0) {
            chartData.push({ label: age + ' años', count: 1, value: age });
        } else {
            let filter = chartData.filter((item) => { return item.value === age });
            if (filter.length > 0) {
                let indexOf = chartData.indexOf(filter[0]);
                chartData[indexOf].count++;
            } else {
                chartData.push({ label: age === 1 ? age + ' año' : age + ' años', count: 1, value: age });
            }
        }
        setChartDataState(chartData);
    }

    useEffect(() => {
        setLoading(true);
        getClients().then((response) => {
            if (response) {
                setClients(response.data.data);
                response.data.data.forEach(element => {
                    newDataItem(getAge(element.birthdate))
                });
                getAverage().then((response) => {
                    if (response) {
                        setAverage(response.data.data);
                        setLoading(false);
                    }
                }).catch((error) => {
                    console.log(error);
                    setLoading(false);
                })
            }
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }, [])



    return (
        <>
            {loading && (
                <BarsLoading />
            )}
            {!loading && (
                <div style={{ width: '100%' }}>
                    <h1 style={{ marginLeft: 30 }}>El promedio de edades entre los clientes es de {Math.round(average)}</h1>
                    <div className="card" style={{ margin: 30 }}>
                        <DataTable value={clients}>
                            <Column field="id" header="ID"></Column>
                            <Column field="name" header="Nombre"></Column>
                            <Column field="lastname" header="Apellido"></Column>
                            <Column field="birthdate" header="Nacimiento"></Column>
                        </DataTable>
                    </div>

                    <div className="card p-d-flex p-jc-center">
                        <Chart
                            type="pie"
                            data={{
                                labels: chartDataState.length === 0 ? [] : chartDataState.map((item) => { return item.label }),
                                datasets: [
                                    {
                                        data: chartDataState.length === 0 ? [] : chartDataState.map((item) => { return item.count }),
                                        backgroundColor: [
                                            "#42A5F5",
                                            "#66BB6A",
                                            "#FFA726"
                                        ],
                                        hoverBackgroundColor: [
                                            "#64B5F6",
                                            "#81C784",
                                            "#FFB74D"
                                        ]
                                    }
                                ]
                            }}
                            options={lightOptions}
                            style={{ position: 'absolute', left: '25%', width: '50%' }}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default List;