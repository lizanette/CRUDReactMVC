import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap'
import './App.css';
import TablaContacto from './components/TablaContacto';
import ModalContacto from './components/ModalContacto';

function App() {
    const [contactos, setContactos] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);

    useEffect(() => {
        mostrarContactos();
    }, []);

    async function mostrarContactos() {
        const response = await fetch('/api/Contacto/lista', {
            method: 'GET'
        });

        if (response.ok) {
            const data = await response.json();
            setContactos(data);
        }
    }

    async function guardarContacto(contacto) {
        const response = await fetch('/api/Contacto/guardar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(contacto)
        });

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContactos();
        }
    }

    const editarContacto = async (contacto) => {
        const response = await fetch('/api/Contacto/editar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(contacto)
        });

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContactos();
        }
    }

    const eliminarContacto = async (id) => {
        var confirm = window.confirm("Are you sure you want to delete this contact?");

        if (!confirm)
            return;

        const response = await fetch(`/api/Contacto/eliminar/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            mostrarContactos();
        }
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de contactos</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="primary" onClick={(() => setMostrarModal(!mostrarModal))}>Nuevo contacto</Button>
                            <hr></hr>
                            <TablaContacto
                                data={contactos}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarContacto={eliminarContacto}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalContacto
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarContacto={guardarContacto}
                editar={editar}
                setEditar={setEditar}
                editarContacto={editarContacto}
            />
        </Container>
    )
}

export default App;