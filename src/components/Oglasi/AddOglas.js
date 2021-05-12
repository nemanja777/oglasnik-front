import React from 'react';
import TestAxios from './../../apis/TestAxios';
import { Form, Row, Col } from "react-bootstrap";

class AddOglas extends React.Component {

    constructor(props) {
        super(props);

        let oglas = {
            ime: "",
            opis: "",
            url: "",
            cena: 0.00,
            kategorija: "",
            korisnik: {
                korisnickoIme: window.localStorage.getItem('korisnik')
            },
            datumPostavljanja: "",
            grad: ""

        }

        this.state = { oglas: oglas, kategorije: ['Obuca', 'Automobil', 'Mobilni telefon', 'Bela tehnika'] }
        console.log('AA' + window.localStorage.getItem('korisnik'));
    }

    componentDidMount() {
        this.getData();

    }

    async getData() {

    }



    valueInputChanged(e) {
        let input = e.target;

        let name = input.name;
        let value = input.value;

        let oglas = this.state.oglas;
        oglas[name] = value;

        this.setState({ oglas: oglas });
    }


    async create(e) {
        e.preventDefault();

        try {
            let oglas = this.state.oglas;
            let oglasDTO = {
                ime: oglas.ime,
                opis: oglas.opis,
                url: oglas.url,
                cena: oglas.cena,
                kategorija: oglas.kategorija,
                grad: oglas.grad,
                korisnik: oglas.korisnik,
                datumPostavljanja: new Date().toISOString().slice(0, 10)

            }
            console.log(oglasDTO);
            let response = await TestAxios.post("/oglasi", oglasDTO);
            console.log(response);
            this.props.history.push("/oglasi");
        } catch (error) {
            alert("Couldn't save the oglas!");
        }
    }


    render() {
        return (
            <>
                <Row>
                    <Col></Col>
                    <Col xs="12" sm="10" md="8">

                        <Form id="forma123">
                            <Form.Label htmlFor="zIme">Ime oglasa</Form.Label>
                            <Form.Control type="text" id="zIme" name="ime" onChange={(e) => this.valueInputChanged(e)} /><br />
                            <Form.Label htmlFor="zOpis">Opis oglasa</Form.Label>
                            <Form.Control type="text" id="zOpis" name="opis" onChange={(e) => this.valueInputChanged(e)} /><br />
                            <Form.Label htmlFor="zSlika">Dodaj sliku</Form.Label>
                            <Form.Control type="text" id="zSlika" name="url" onChange={(e) => this.valueInputChanged(e)} /><br />
                            <Form.Label htmlFor="zkategorija">Izaberi kategoriju</Form.Label>
                            <div class="input-group">
                                <select class="custom-select" id="inputGroupSelect04" name="kategorija" onChange={event => this.valueInputChanged(event)}>
                                    <option></option>
                                    {
                                        this.state.kategorije.map((kategorija) => {
                                            return (
                                                <option key={kategorija} value={kategorija}>{kategorija}</option>
                                            )
                                        })
                                    }
                                </select><br /><br /><br />
                            </div>

                            <Form.Label htmlFor="pCena">Cena</Form.Label>
                            <Form.Control type="number" step=".01" id="cK" name="cena" onChange={(e) => this.valueInputChanged(e)} /><br />
                            <Form.Label htmlFor="zGrad">Grad</Form.Label>
                            <Form.Control type="text" id="zGrad" name="grad" onChange={(e) => this.valueInputChanged(e)} /><br />



                            <button id="dugme" className="btn btn-primary" onClick={(event) => { this.create(event); }}>DODAJ</button>

                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </>


        )
    }






}

export default AddOglas;