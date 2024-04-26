import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { richiestaAttualeArr } from './richiesta';
import { response } from 'express';
import { error } from 'console';



@Injectable({
  providedIn: 'root'
})
export class RichiestaService {
 
  
  currentPage: number = 1; // fisso a 1
  pageSize:number = 5;
  
  campo:string="dataCreazione";
  ordinamento:string="desc";


  campoDataInserimento:string="dataInserimento"
  constructor(private http: HttpClient) { }

  private urlLogin = 'http://localhost:8080/login';

  private urlBase = `http://localhost:8080/richiesta/${this.currentPage}`;

  private urlElenco = `http://localhost:8080/richiesta/${this.currentPage}-${this.pageSize}?campo=${this.campo}&ordinamento=${this.ordinamento}`;


  private urlOrdineStorico = `http://localhost:8080/richiesta/storico/${this.currentPage}-${this.pageSize}?campo=${this.campoDataInserimento}&ordinamento=desc`;
  


  private urlModifica="http://localhost:8080/richiesta/edit"

  private urlCreaRichiesta = "http://localhost:8080/richiesta/new"
  private urlApplicativo="http://localhost:8080/applicativo"
  private urlStatoRichiestaConsap="http://localhost:8080/statoRichiestaConsap"
  private urlStatoRichiestaOs="http://localhost:8080/statoRichiestaOs"
  private urlStatoApprovazioneConsap="http://localhost:8080/approvazioneConsap"
  private urlStatoApprovazioneOs="http://localhost:8080/statoApprovazioneOs"
  private urlCommessaOs="http://localhost:8080/commessaOs"

  loginPost(data: any): Observable<any> {
    return this.http.post<any>(this.urlLogin, data, { observe: 'response' }).pipe(
      tap(response => {
        const headers = response.headers;
        const accessToken = headers.get('access_token');
        if (accessToken) {
          localStorage.setItem('access_token', accessToken);
          console.log("ACCESS TOKEN: ", accessToken);
        } else {
          console.error('Login fallito: access_token non trovato negli headers');
        }
      })
    );
  }

  elencoPaginatoPost(campo2:string,ordinamento2:string): Observable<any> { // Cambiato il tipo di ritorno in Observable<any>
    const url = this.urlBase + `-${this.pageSize}?campo=${campo2}&ordinamento=${ordinamento2}`;
    console.log("ORDINAMENTO: ",ordinamento2);
    console.log("CAMPO: ",campo2);
    console.log("URL: ",url);

    
    
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.log("ACCESS TOKEN NON TROVATO");
      
    }
    const body = {
      erroreDTO: null,
      filtri: {
        "id": null,
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
      elenco: null
    };
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.post<any>(url, body, { headers }); // Restituisci l'observable
  }


  elencoPaginatoStoricoPost(id:number): Observable<any> { // Cambiato il tipo di ritorno in Observable<any>
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.log("ACCESS TOKEN NON TROVATO");
      
    }
    const body = {
      erroreDTO: null,
      filtri: {
        "id": id,
        
      },
      elenco: null
    };
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.post<any>(this.urlOrdineStorico, body, { headers }); // Restituisci l'observable
  }

  private createRequestObservable(url: string): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.log("ACCESS TOKEN NON TROVATO");
      return new Observable(); // Restituisci un observable vuoto in caso di token non trovato
    }
    const body = {
      erroreDTO: null,
      filtri: {
        "id": null,
        "descrizione": null
      },
      elenco: null
    };
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);
    return this.http.post<any>(url, body, { headers });
  }

  applicativoPost(): Observable<any> {
    return this.createRequestObservable(this.urlApplicativo);
  }

  statoRichiestaConsapPost(): Observable<any> {
    return this.createRequestObservable(this.urlStatoRichiestaConsap);
  }

  statoRichiestaOsPost():Observable<any>{
    return this.createRequestObservable(this.urlStatoRichiestaOs);
  }

  statoApprovazioneConsapPost():Observable<any>{
    return this.createRequestObservable(this.urlStatoApprovazioneConsap);
  }

  statoApprovazioneOsPost():Observable<any>{
    return this.createRequestObservable(this.urlStatoApprovazioneOs);
  }
  commessaOsPost():Observable<any>{
    return this.createRequestObservable(this.urlCommessaOs);
  }

  inserimentoRichiesta(dati:any){ // Cambiato il tipo di ritorno in Observable<any>
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.log("ACCESS TOKEN NON TROVATO");
    }
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.post<any>(this.urlCreaRichiesta, dati, { headers }); // Restituisci l'observable
  }

  idRichiesta(dati:any){ // Cambiato il tipo di ritorno in Observable<any>
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.log("ACCESS TOKEN NON TROVATO");
    }
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.post<any>(this.urlOrdineStorico, dati, { headers }); // Restituisci l'observable
  }
  idRichiestaModifica(dati:any){ // Cambiato il tipo di ritorno in Observable<any>
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.log("ACCESS TOKEN NON TROVATO");
    }
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.post<any>(this.urlElenco, dati, { headers }); // Restituisci l'observable
  }
  
  
  elencoFiltratoPost(dati:any,urlChiamata:any):Observable<any>{
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.log("ACCESS TOKEN NON TROVATO");
      
    }
    //inserire body
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);
    return this.http.post<any>(urlChiamata, dati, { headers }); 
  }

  

  modificaRichiesta(dati:any){ // Cambiato il tipo di ritorno in Observable<any>
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.log("ACCESS TOKEN NON TROVATO");
    }
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.post<any>(this.urlModifica, dati, { headers }); // Restituisci l'observable
  }

  

  elencoAttributiOrdinati(campo1:string,ordinamento1:string,righe:any): Observable<any> { // Cambiato il tipo di ritorno in Observable<any>
    
    const url = this.urlBase + `-${righe}?campo=${campo1}&ordinamento=${ordinamento1}`;
    
    console.log("URL: ",url);
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.log("ACCESS TOKEN NON TROVATO");
      
    }
    
    
    const body = {
      erroreDTO: null,
      filtri: {
        "id": null,
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
      elenco: null
    };
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.post<any>(url, body, { headers }); // Restituisci l'observable
  }

  
  
}