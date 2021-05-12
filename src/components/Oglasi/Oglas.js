import React from 'react'; 
import { Table, Button, Form} from 'react-bootstrap'
import TestAxios from './../../apis/TestAxios';
import './../../index.css';


class Oglas extends React.Component{

    constructor(props) {
        super(props);

        this.state = { 
            oglasi: [],
            pageNo: 0,
            totalPages: 1,
            kategorije: ['Obuca', 'Automobil', 'Mobilni telefon', 'Bela tehnika'],
            search: { kategorija: -1, ime: "", cenaOd: "", cenaDo: ""}
           
                     
    }

   


    }

   


    componentDidMount(){
        this.getData();
     
    }

    async getData(){
        await this.getOglasi(0);
        
     }

    
    //PAGINARNI PRIKAZ SVIH I PRETRAGA

    async getOglasi(page){
        let config = {
            params:{
                pageNo: page
            }
        }

        if (this.state.search.kategorija != -1) {
          config.params.kategorija = this.state.search.kategorija;
        }

        if (this.state.search.ime != "") {
            config.params.ime = this.state.search.ime;
          }
      

          if (this.state.search.cenaOd != "") {
            config.params.cenaOd = this.state.search.cenaOd;
          }

          if (this.state.search.cenaDo != "") {
            config.params.cenaDo = this.state.search.cenaDo;
          }

        try {
            console.log(config);
            let result = await TestAxios.get("/oglasi", config);
            
            if (result && result.status === 200) {
              this.setState({
                pageNo: page,
                oglasi: result.data,
                totalPages: result.headers["total-pages"],
              });
            }
          } catch (error) {
            alert("Nije uspelo dobavljanje.");
          }
        }

        // BRISANJE ENTITETA 

        deleteFromState(oglasId){
            var oglasi = this.state.oglasi;
            oglasi.forEach((element, index) => {
                if (element.id === oglasId) {
                    oglasi.splice(index, 1);
                    this.setState({oglasi: oglasi});
                }
            });
        }

        delete(oglasId) {
            TestAxios.delete('/oglasi/' + oglasId)
            .then(res => {
                // handle success
                console.log(res);
                alert('Oglas je uspesno obrisan!');
                this.deleteFromState(oglasId); // ili refresh page-a window.location.reload();
            })
            .catch(error => {
                // handle error
                console.log(error);
                alert('Error occured please try again!');
             });
        }

        
    

    // RENDER ENTITETA 

    
    renderOglasi(){
        return this.state.oglasi.map((oglas,index) => {
            return(
                <tr key={oglas.id}>
                  <td>{oglas.ime}</td>
                  <td>{oglas.opis}</td>
                  <td><img width="100px" height="100px" src={oglas.url}/></td>
                  <td>{oglas.cena}</td>
                  <td>{oglas.kategorija}</td>
                  <td>{oglas.korisnik.korisnickoIme}</td>
                  <td>{oglas.datumPostavljanja}</td>
                  <td>{oglas.grad}</td>
                
                  

                
                  <td><button className="btn btn-warning"  onClick={() => this.goToEdit(oglas.id)}>Edit</button></td>
                  <td><button className="btn btn-danger" onClick={() => this.delete(oglas.id)}>Delete</button></td>
                  
               </tr>
            )
        })
    }

    // IDI NA STRANICU ZA DODAVANJE

    goToAdd(){
        this.props.history.push('/oglasi/add');
    }

    // IDI NA STRANICU ZA IZMENU

    goToEdit(oglasId){
        this.props.history.push('/oglasi/edit/'+ oglasId); 
    }

    // METODA ZA PRETRAGU

    searchValueInputChange(event) {
        let control = event.target;
    
        let name = control.name;
        let value = control.value;
    
        let search = this.state.search;
        search[name] = value;
    
        this.setState({ search: search });

        this.doSearch();

      }

      
      // PRETRAZI

      doSearch() {
        this.getOglasi(0);
      }

      

      // RENDER 

        render(){
            return(
                <div>
                    <h1>Oglasi</h1>
                   
                    <div>
                    <button className="btn btn-success" onClick={() => this.goToAdd() }>Dodaj novi oglas</button>

                    <br/><br/>

                   
                    <Table className="table-hover table-dark visina " id="oglasi-table">
                        <thead >
                            <tr>
                           
                                <th>Ime</th>
                                <th>Opis</th>
                                <th>Slika</th>
                                <th>Cena</th>
                                <th>Kategorija</th>
                                <th>Korisnik</th>
                                <th>Datum</th>
                                <th>Grad</th>
                                <th></th>
                                
                                
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderOglasi()}
                        </tbody>                  
                    </Table>
                    <div className="donjaMargina"><Button  disabled={this.state.pageNo==0} onClick={()=>this.getOglasi(this.state.pageNo-1)}>Previous</Button>
                    <Button className="margina " disabled={this.state.pageNo==this.state.totalPages-1} onClick={()=>this.getOglasi(this.state.pageNo+1)}>Next</Button></div>
                   
                </div>

            
   
                


               
            <Form style={{marginTop:35}}>
        <Form.Group>

        <Form.Label>Kategorija</Form.Label>
              <Form.Control
                onChange={(event) => this.searchValueInputChange(event)}
                name="kategorija"
                  value={this.state.search.kategorija}
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
          <Form.Label>Ime Oglasa</Form.Label>
          <Form.Control
            value={this.state.search.ime}
            name="ime"
            as="input"
            onChange={(e) => this.searchValueInputChange(e)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
              <Form.Label>Cena od</Form.Label>
              <Form.Control
                value={this.state.search.cenaOd}
                name="cenaOd"
                as="input"
                onChange={(e) => this.searchValueInputChange(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Cena do</Form.Label>
              <Form.Control
                value={this.state.search.cenaDo}
                name="cenaDo"
                as="input"
                onChange={(e) => this.searchValueInputChange(e)}
              ></Form.Control>
            </Form.Group>
      </Form>


         </div> 
            )
        }


    
    }

  

export default Oglas; 