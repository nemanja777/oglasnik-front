import React from 'react';
import TestAxios from './../../apis/TestAxios';
import { Button, Form } from "react-bootstrap";


class EditOglas extends React.Component {

    constructor(props) {
        super(props);


        let oglas = {
            ime: "",
            opis: "",
            url: "",
            cena: 0.00,
            kategorija: -1,
            korisnik: null,
            datumPostavljanja: "",
            grad: ""

        }

        this.state = { oglas: oglas, kategorije: ['Obuca', 'Automobil', 'Mobilni telefon', 'Bela tehnika'] }
    }

    componentDidMount() {
        this.getData();

    }

    async getData() {
        await this.getOglas();

    }



    async getOglas() {

        try {
            let result = await TestAxios.get("/oglasi/" + this.props.match.params.id);
            if (result && result.status === 200) {
                console.log(result.data)


                this.setState({
                    oglas: result.data
                });
                console.log(this.state)
            }

        } catch (error) {
            alert("Nije uspelo dobavljanje.");
        }
    }


    async doEdit() {
        try {
            let noviOglas = this.state.oglas;

            await TestAxios.put("/oglasi/" + noviOglas.id, noviOglas);
            this.props.history.push("/oglasi");
        } catch (error) {
            alert("Nije uspela izmena!");
        }
    }

    valueInputChange(event) {
        let control = event.target;

        let name = control.name;
        let value = control.value;

        let oglas = this.state.oglas;
        oglas[name] = value;

        this.setState({ oglas: oglas });
    }


    render() {
        return (
            <div>

                <Form>
                    <Form.Group>
                        <Form.Label>Ime</Form.Label>
                        <Form.Control
                            onChange={(event) => this.valueInputChange(event)}
                            name="ime"
                            value={this.state.oglas.ime}
                            as="input"
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Opis</Form.Label>
                        <Form.Control
                            onChange={(event) => this.valueInputChange(event)}
                            name="opis"
                            value={this.state.oglas.opis}
                            as="input"
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Slika</Form.Label>
                        <Form.Control
                            onChange={(event) => this.valueInputChange(event)}
                            name="url"
                            value={this.state.oglas.url}
                            as="input"
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cena</Form.Label>
                        <Form.Control
                            onChange={(event) => this.valueInputChange(event)}
                            name="cena"
                            value={this.state.oglas.cena}
                            as="input"
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Grad</Form.Label>
                        <Form.Control
                            onChange={(event) => this.valueInputChange(event)}
                            name="grad"
                            value={this.state.oglas.grad}
                            as="input"
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Kategorija</Form.Label>
                        <Form.Control
                            onChange={(event) => this.valueInputChange(event)}
                            name="kategorija"
                            value={this.state.oglas.kategorija}
                            as="select"
                        >
                            <option value={-1}></option>
                            {this.state.kategorije.map((kategorija) => {
                                return (
                                    <option value={kategorija} key={kategorija}>
                                        {kategorija}
                                    </option>
                                );
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Korisnik</Form.Label>
                        <Form.Control
                            onChange={(event) => this.valueInputChange(event)}
                            name="korisnik"
                            disabled
                            value={window.localStorage.getItem('korisnik')}
                            as="input"
                        ></Form.Control>
                    </Form.Group>


                    <Button variant="primary" onClick={() => this.doEdit()}>
                        Edit
                  </Button>
                </Form><br></br>

            </div>
        );
    }


}


export default EditOglas;