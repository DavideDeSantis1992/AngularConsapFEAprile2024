import { Component, OnInit } from '@angular/core';
import { RichiestaService } from '../../service/richiesta.service';
import { richiestaAttualeArr } from '../../service/richiesta';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ispeziona',
  templateUrl: './ispeziona.component.html',
  styleUrls: ['./ispeziona.component.css']
})
export class IspezionaComponent implements OnInit {

  // responseData: any;

  idRichiesta: any;
  
  richiesta:any;
  richiestaShow:any;

  currentPage: any = 1; // fisso a 1
  pageSize:any = 5;
  pagineTotali:any=0;

  constructor(private richiestaService: RichiestaService,private http: HttpClient) {}

  ngOnInit() {
    const id=localStorage.getItem('idRichiesta');
    this.idRichiesta=id;
    this.prendiRichiesta();
  }

  prendiRichiesta(){
    const idParsato = parseInt(this.idRichiesta);
    console.log("idRichiesta Parsato: ",idParsato);
    
    const dati = {
      "erroreDTO": null,
      "filtri": {
          "id": idParsato,
          "numeroTicket": null,
          "applicativoId": null,
          "oggetto": null,
          "statoRichiestaConsapId": null,
          "dataCreazione": null,
          "statoApprovazioneConsapId": null,
          "statoApprovazioneOsId": null,
          "statoRichiestaOsId": null,
          "dataStimaFinale": null,
          "importo": null,
          "commessaOsId": null
      },
      "elenco": null
  };
    console.log("ID RICHIESTA DA CERCARE: ",dati);
    this.richiestaService.idRichiesta(dati).subscribe((data) => {

    
    
    this.richiesta=data.elenco.content;
    console.log("RICHIESTE STORICHE INVERTITE: ",this.richiesta);

    const indice = 0;
    console.log("indice richiesta storica",indice);
    
    this.pagineTotali=data.elenco.totalPages;
        
        console.log("pagine Totali: ",this.pagineTotali);

    this.richiestaShow = data.elenco.content[indice];
    console.log("RICHIESTA SHOW: ",this.richiestaShow);
    console.log("RICHIESTE STORICHE: ",data.elenco.content);
    
    
  }, (error) => {
    console.error(error);
  })
  }

  visualizzaRichiestaStorica(elementoStorico : any) {
    const indice = this.richiesta.indexOf(elementoStorico);
    console.log("Indice elemento storico: ",indice);
    this.richiestaShow = this.richiesta[indice];
  }

  prendiNumeroPaginaInput(){
    // devo prendere il valore del campo con id "numeroPaginaInput"
      const numeroPaginaInput = (<HTMLInputElement>document.getElementById('numeroPaginaInput')).value;
      if(numeroPaginaInput<=this.pagineTotali){
      this.currentPage=numeroPaginaInput;
  
      this.numeroPaginataStorica(numeroPaginaInput).subscribe(data=>{
        this.richiesta=data.elenco.content;
        console.log("Elenco richieste paginate: ",data.elenco.content)
        // console.log("Richieste: "+ JSON.stringify(this.richieste));
        this.pagineTotali=data.elenco.totalPages;
        
        console.log("pagine Totali: ",this.pagineTotali);
      })
    } else {
      alert("Numero pagina non presente, pagine totali: "+this.pagineTotali);
    }
  }

  numeroPaginataStorica(paginaCorrente:any){
    const urlElenco = `http://localhost:8080/richiesta/storico/${paginaCorrente}-${this.pageSize}`;

    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.log("ACCESS TOKEN NON TROVATO");
      
    }

    const body = {
      "erroreDTO": null,
      "filtri": {
          "id": this.idRichiesta
          
      },
      "elenco": null
  };

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.post<any>(urlElenco, body, { headers });
  }

  paginaPrecedente() {
    if (this.currentPage > 1) {
      let currentPageCopy = this.currentPage; // Salviamo il valore corrente di currentPage in una variabile locale
      currentPageCopy--; // Decrementiamo il valore per la pagina precedente
  
      this.numeroPaginataStorica(currentPageCopy).subscribe(data => {
        this.currentPage = currentPageCopy; // Aggiorniamo this.currentPage con il valore corretto
        this.richiesta = data.elenco.content;
        console.log("Elenco richieste paginate: ", data.elenco.content);
        this.pagineTotali = data.elenco.totalPages;
        console.log("Pagina corrente: ", this.currentPage);
        console.log("Pagine Totali: ", this.pagineTotali);
      });
    }
  }
  
  paginaSuccessiva() {
    if (this.currentPage < this.pagineTotali) {
      let currentPageCopy = this.currentPage; // Salviamo il valore corrente di currentPage in una variabile locale
      currentPageCopy++; // Incrementiamo il valore per la pagina successiva
  
      this.numeroPaginataStorica(currentPageCopy).subscribe(data => {
        this.currentPage = currentPageCopy; // Aggiorniamo this.currentPage con il valore corretto
        this.richiesta = data.elenco.content;
        console.log("Elenco richieste paginate: ", data.elenco.content);
        this.pagineTotali = data.elenco.totalPages;
        console.log("Pagina corrente: ", this.currentPage);
        console.log("Pagine Totali: ", this.pagineTotali);
      });
    }
  }
  
}
