import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { saveClient } from '../api/clients.api';
import { useHistory } from "react-router-dom";

const Form = () => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [birthdate, setBirthdate] = useState(null);

    const [loading, setLoading] = useState(false);

    const toast = useRef(null);
    const history = useHistory();

    const handleSubmit = () => {
        if (!name || !lastname || !birthdate) {
            toast.current.show({
                severity: 'warn',
                summary: 'Aviso',
                detail: 'Rellene todos los campos para continuar con el registro.',
                life: 3000
            });
        } else {
            setLoading(true);
            const body = {
                name,
                lastname,
                birthdate
            }
            saveClient(body).then((response) => {
                if (response) {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: response.data.message,
                        life: 3000
                    });
                    history.push('/');
                    setLoading(false);
                }
            }).catch((error) => {
                console.log(error);
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Ha ocurrido un error.',
                    life: 3000
                });
                setLoading(false);
            })
        }
    }
    return (
        <div>
            <Toast ref={toast} />
            <div className="card" style={{ margin: 30, width: 300 }}>
                <span className="p-float-label" style={{ marginTop: 25 }}>
                    <InputText style={{ width: '100%' }} id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="name">Nombre</label>
                </span>

                <span className="p-float-label" style={{ marginTop: 25 }}>
                    <InputText style={{ width: '100%' }} id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    <label htmlFor="lastname">Apellidos</label>
                </span>

                <span className="p-float-label" style={{ marginTop: 25 }}>
                    <Calendar
                        monthNavigator 
                        yearNavigator
                        yearRange="1900:2030"
                        maxDate={new Date()}
                        minDate={new Date(1900, 0, 1)}
                        style={{ width: '100%' }}
                        placeholder='Nacimiento'
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.value)}
                        showIcon />
                </span>

                <span className="p-float-label" style={{ marginTop: 25 }}>
                    <Button
                        style={{ width: '100%' }}
                        onClick={handleSubmit}
                        label="Submit"
                        loading={loading} />
                </span>
            </div>
        </div>
    );
}

export default Form;