import { Component, ElementRef, OnInit } from '@angular/core';
import { RichiestaService } from '../../service/richiesta.service';
import { Applicativo, StatoApprovazioneConsap, StatoApprovazioneOs, StatoRichiestaConsap, StatoRichiestaOs, richiestaAttualeArr } from '../../service/richiesta';
import { error } from 'console';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-elenco',
  templateUrl: './elenco.component.html',
  styleUrls: ['./elenco.component.css']
})
export class ElencoComponent implements OnInit {
  

  // pageSizeChiamata=5; //mai a zero
  // currentPageChiamata=1; //sempre fisso a 1
  
  loading = true;
  showSpinner = true;
  
  richieste!: richiestaAttualeArr[];
  
  isDisabled: boolean = true; 

  applicativo!: Applicativo[];
  statoRichiestaConsap!: StatoRichiestaConsap[];
  statoRichiestaOs!: StatoRichiestaOs[];
  statoApprovazioneConsap!: StatoApprovazioneConsap[];
  statoApprovazioneOs!: StatoApprovazioneOs[];

  flagDropdown: boolean = false;

  paginaSelezionata: string = '5/pagina';

  currentPage: any = 1; // fisso a 1
  pageSize:any = 5;
  pagineTotali:any=0;

  constructor(private richiestaService: RichiestaService,private http: HttpClient) {}

  ngOnInit(): void {
    // Nascondi il contenuto fino alla fine del timer
    document.body.style.overflow = 'hidden';

    // Simuliamo il caricamento dei dati
    setTimeout(() => {
      this.loading = false;
      this.showSpinner = false;
      // Ripristina lo scrolling del corpo del documento
      document.body.style.overflow = 'auto';
    }, 3000);

    
    this.getElenco();

    this.getApplicativo();
    this.getStatoRichiestaConsap();
    this.getStatoRichiestaOs();
    this.getStatoApprovazioneConsap();
    this.getStatoApprovazioneOs();
  }

  apriChiudiDropdown() {
    console.log("apriChiudiDropdown");
    
    // Gestione apertura e chiusura dropdown pagerChanger
    if (this.flagDropdown === false) {
      // Apri pagerChanger e porta la flag a true
      const dropdown = document.getElementById('pagerChanger');
      if (dropdown) {
        dropdown.classList.add('show');
        this.flagDropdown = true;
      }
    } else {
      // Chiudi pagerChanger e porta la flag a false
      const dropdown = document.getElementById('pagerChanger');
      if (dropdown) {
        dropdown.classList.remove('show');
        this.flagDropdown = false;
      }
    }
  }
  
  prendiValorePagina(event: MouseEvent){
    const target = event.target as HTMLSpanElement;
    const valueText = target.textContent || '';
    const value = (valueText.split('/')[0].trim());
    console.log('Valore selezionato:', value);
    // Aggiorna il testo del pulsante con il valore selezionato
    this.paginaSelezionata = valueText.trim();

    this.pageSize=value;
    
    
    this.paginata(value).subscribe(data=>{
      this.richieste=data.elenco.content;
      console.log("Elenco richieste paginate: ",data.elenco.content)
      this.pagineTotali=data.elenco.totalPages;
      
      console.log("pagine Totali: ",this.pagineTotali);
      
      // console.log("Richieste: "+ JSON.stringify(this.richieste));
      
    })
    
}



paginata(size:any):Observable<any> {
  

  const numeroTicket = (<HTMLInputElement>(
    document.getElementById('numeroTicketFiltro')
  )).value;
  const numeroTicketParsed = numeroTicket === '' ? null : parseInt(numeroTicket);

  const oggetto = (<HTMLInputElement>document.getElementById('oggettoFiltro')).value;
  const oggettoParsed = oggetto === '' ? null : String(oggetto);  
  
  const applicativo = (<HTMLSelectElement>(
    document.getElementById('applicativoFiltro')
    )).value;
  const applicativoParsed = applicativo ==='' ? null : parseInt(applicativo) || null;

  const statoRichiestaConsap = (<HTMLSelectElement>(
    document.getElementById('statoRichiestaConsapFiltro')
  )).value;
  const statoRichiestaConsapParsed = statoRichiestaConsap === '' ? null : parseInt(statoRichiestaConsap) || null;


  const statoApprovazioneConsap = (<HTMLSelectElement>(
    document.getElementById('statoApprovazioneConsapFiltro')
  )).value;
  const statoApprovazioneConsapParsed = statoApprovazioneConsap === '' ? null : parseInt(statoApprovazioneConsap)||null;
  

  const statoApprovazioneOs = (<HTMLSelectElement>(
    document.getElementById('statoApprovazioneOsFiltro')
  )).value;
  const statoApprovazioneOsParsed = statoApprovazioneOs === '' ? null : parseInt(statoApprovazioneOs)||null;

  const statoRichiestaOs = (<HTMLSelectElement>(
    document.getElementById('statoRichiestaOsFiltro')
  )).value;
  const statoRichiestaOsParsed = statoRichiestaOs === '' ? null : parseInt(statoRichiestaOs)||null;


    const urlElenco = `http://localhost:8080/richiesta/${this.currentPage}-${size}`;

    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.log("ACCESS TOKEN NON TROVATO");
      
    }

    const body = {
      "erroreDTO": null,
      "filtri": {
          "id": null,
          "numeroTicket": numeroTicketParsed,
          "applicativo": {"applicativoId":applicativoParsed},
          "oggetto": oggettoParsed,
          "statoRichiestaConsap": {"statoRichiestaConsapId":statoRichiestaConsapParsed},
          "dataCreazione": null,
          "statoApprovazioneConsap": {"statoApprovazioneConsapId":statoApprovazioneConsapParsed},
          "statoApprovazioneOs": {"statoApprovazioneOsId":statoApprovazioneOsParsed},
          "statoRichiestaOs": {"statoRichiestaOsId":statoRichiestaOsParsed},
          "dataStimaFinale": null,
          "importo": null,
          "commessaOsId": null
      },
      "elenco": null
  };

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.post<any>(urlElenco, body, { headers });
}

numeroPaginata(currentPage:any):Observable<any> {
  

  const numeroTicket = (<HTMLInputElement>(
    document.getElementById('numeroTicketFiltro')
  )).value;
  const numeroTicketParsed = numeroTicket === '' ? null : parseInt(numeroTicket);

  const oggetto = (<HTMLInputElement>document.getElementById('oggettoFiltro')).value;
  const oggettoParsed = oggetto === '' ? null : String(oggetto);  
  
  const applicativo = (<HTMLSelectElement>(
    document.getElementById('applicativoFiltro')
    )).value;
  const applicativoParsed = applicativo ==='' ? null : parseInt(applicativo) || null;

  const statoRichiestaConsap = (<HTMLSelectElement>(
    document.getElementById('statoRichiestaConsapFiltro')
  )).value;
  const statoRichiestaConsapParsed = statoRichiestaConsap === '' ? null : parseInt(statoRichiestaConsap) || null;


  const statoApprovazioneConsap = (<HTMLSelectElement>(
    document.getElementById('statoApprovazioneConsapFiltro')
  )).value;
  const statoApprovazioneConsapParsed = statoApprovazioneConsap === '' ? null : parseInt(statoApprovazioneConsap)||null;
  

  const statoApprovazioneOs = (<HTMLSelectElement>(
    document.getElementById('statoApprovazioneOsFiltro')
  )).value;
  const statoApprovazioneOsParsed = statoApprovazioneOs === '' ? null : parseInt(statoApprovazioneOs)||null;

  const statoRichiestaOs = (<HTMLSelectElement>(
    document.getElementById('statoRichiestaOsFiltro')
  )).value;
  const statoRichiestaOsParsed = statoRichiestaOs === '' ? null : parseInt(statoRichiestaOs)||null;


    const urlElenco = `http://localhost:8080/richiesta/${currentPage}-${this.pageSize}`;

    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.log("ACCESS TOKEN NON TROVATO");
      
    }

    const body = {
      "erroreDTO": null,
      "filtri": {
          "id": null,
          "numeroTicket": numeroTicketParsed,
          "applicativo": {"applicativoId":applicativoParsed},
          "oggetto": oggettoParsed,
          "statoRichiestaConsap": {"statoRichiestaConsapId":statoRichiestaConsapParsed},
          "dataCreazione": null,
          "statoApprovazioneConsap": {"statoApprovazioneConsapId":statoApprovazioneConsapParsed},
          "statoApprovazioneOs": {"statoApprovazioneOsId":statoApprovazioneOsParsed},
          "statoRichiestaOs": {"statoRichiestaOsId":statoRichiestaOsParsed},
          "dataStimaFinale": null,
          "importo": null,
          "commessaOsId": null
      },
      "elenco": null
  };

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.post<any>(urlElenco, body, { headers });
}
  getElenco(){
    this.richiestaService.elencoPaginatoPost().subscribe(data=>{
      this.richieste=data.elenco.content;
      console.log("Elenco richieste aggiornate: ",data.elenco.content)
      // console.log("Richieste: "+ JSON.stringify(this.richieste));
      this.pagineTotali=data.elenco.totalPages;
      
      console.log("pagine Totali: ",this.pagineTotali);
      
    })
  }

  // Metodo per aprire il modal
  openModal() {
    const modal = document.getElementById('modalright');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  // Metodo per chiudere il modal
  closeModal() {
    const modal = document.getElementById('modalright');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  prendiId(richiestaId:any){
    localStorage.setItem('idRichiesta', richiestaId.id);
  }

  getApplicativo() {
    this.richiestaService.applicativoPost().subscribe((data) => {
      this.applicativo = data.elenco;
      console.log('APPLICATIVO:', this.applicativo);
    });
  }

  getStatoRichiestaConsap() {
    this.richiestaService.statoRichiestaConsapPost().subscribe((data) => {
      this.statoRichiestaConsap = data.elenco;
      console.log('STATO RICHIESTA CONSAP:', this.statoRichiestaConsap);
    });
  }

  getStatoRichiestaOs() {
    this.richiestaService.statoRichiestaOsPost().subscribe((data) => {
      this.statoRichiestaOs = data.elenco;
      console.log('STATO RICHIESTA OS:', this.statoRichiestaOs);
    });
  }

  getStatoApprovazioneConsap() {
    this.richiestaService.statoApprovazioneConsapPost().subscribe((data) => {
      this.statoApprovazioneConsap = data.elenco;
      console.log('STATO APPROVAZIONE CONSAP:', this.statoApprovazioneConsap);
    });
  }

  getStatoApprovazioneOs() {
    this.richiestaService.statoApprovazioneOsPost().subscribe((data) => {
      this.statoApprovazioneOs = data.elenco;
      console.log('STATO APPROVAZIONE OS:', this.statoApprovazioneOs);
    });
  }

  applicaFiltri(){
    console.log("Applica filtri");
    const numeroTicket = (<HTMLInputElement>(
      document.getElementById('numeroTicketFiltro')
    )).value;
    const numeroTicketParsed = numeroTicket === '' ? null : parseInt(numeroTicket);

    const oggetto = (<HTMLInputElement>document.getElementById('oggettoFiltro')).value;
    const oggettoParsed = oggetto === '' ? null : String(oggetto);  
    
    const applicativo = (<HTMLSelectElement>(
      document.getElementById('applicativoFiltro')
      )).value;
    const applicativoParsed = applicativo ==='' ? null : parseInt(applicativo) || null;

    const statoRichiestaConsap = (<HTMLSelectElement>(
      document.getElementById('statoRichiestaConsapFiltro')
    )).value;
    const statoRichiestaConsapParsed = statoRichiestaConsap === '' ? null : parseInt(statoRichiestaConsap) || null;


    const statoApprovazioneConsap = (<HTMLSelectElement>(
      document.getElementById('statoApprovazioneConsapFiltro')
    )).value;
    const statoApprovazioneConsapParsed = statoApprovazioneConsap === '' ? null : parseInt(statoApprovazioneConsap)||null;
    

    const statoApprovazioneOs = (<HTMLSelectElement>(
      document.getElementById('statoApprovazioneOsFiltro')
    )).value;
    const statoApprovazioneOsParsed = statoApprovazioneOs === '' ? null : parseInt(statoApprovazioneOs)||null;

    const statoRichiestaOs = (<HTMLSelectElement>(
      document.getElementById('statoRichiestaOsFiltro')
    )).value;
    const statoRichiestaOsParsed = statoRichiestaOs === '' ? null : parseInt(statoRichiestaOs)||null;
   
    console.log("NUMERO TICKET FILTRO: ", numeroTicketParsed);
    console.log("OGGETTO FILTRO: ", oggettoParsed);
    console.log("APPLICATIVO FILTRO: ", applicativoParsed);
    console.log("STATO RICHIESTA CONSAP FILTRO: ", statoRichiestaConsapParsed);
    console.log("STATO APPROVAZIONE CONSAP FILTRO: ", statoApprovazioneConsapParsed);
    console.log("STATO APPROVAZIONE OS FILTRO: ", statoApprovazioneOsParsed);
    console.log("STATO RICHIESTA OS FILTRO: ", statoRichiestaOsParsed);

    const dati = {
      "erroreDTO": null,
      "filtri": {
          "id": null,
          "numeroTicket": numeroTicketParsed,
          "applicativo": {"applicativoId":applicativoParsed},
          "oggetto": oggettoParsed,
          "statoRichiestaConsap": {"statoRichiestaConsapId":statoRichiestaConsapParsed},
          "dataCreazione": null,
          "statoApprovazioneConsap": {"statoApprovazioneConsapId":statoApprovazioneConsapParsed},
          "statoApprovazioneOs": {"statoApprovazioneOsId":statoApprovazioneOsParsed},
          "statoRichiestaOs": {"statoRichiestaOsId":statoRichiestaOsParsed},
          "dataStimaFinale": null,
          "importo": null,
          "commessaOsId": null
      },
      "elenco": null
  };
  console.log("Dati filtro: ", dati);
  
  this.richiestaService.elencoFiltratoPost(dati).subscribe((data) => {
    this.richieste=data.elenco.content;
    console.log("Elenco richieste filtrate: ",this.richieste);
    
  }, (error)=>{
    console.log(error);
  })
  

    
  }

  resetFiltri() {
    // Ripristina i valori originali dei campi
    const numeroTicketInput = <HTMLInputElement>document.getElementById('numeroTicketFiltro');
    numeroTicketInput.value = '';
    
    const oggettoInput = <HTMLInputElement>document.getElementById('oggettoFiltro');
    oggettoInput.value = '';
    
    const applicativoSelect = <HTMLSelectElement>document.getElementById('applicativoFiltro');
    applicativoSelect.value = 'null';
  
    const statoRichiestaConsapSelect = <HTMLSelectElement>document.getElementById('statoRichiestaConsapFiltro');
    statoRichiestaConsapSelect.value = 'null';
  
    const statoRichiestaOsSelect = <HTMLSelectElement>document.getElementById('statoRichiestaOsFiltro');
    statoRichiestaOsSelect.value = 'null';
  
    const statoApprovazioneConsapSelect = <HTMLSelectElement>document.getElementById('statoApprovazioneConsapFiltro');
    statoApprovazioneConsapSelect.value = 'null';
  
    const statoApprovazioneOsSelect = <HTMLSelectElement>document.getElementById('statoApprovazioneOsFiltro');
    statoApprovazioneOsSelect.value = 'null';

    this.getElenco();
  }



  prendiNumeroPagina(event: MouseEvent){
    const target = event.target as HTMLSpanElement;
    const valueText = target.textContent || '';
    const currentPageSelezionato = (valueText.split('/')[0].trim());
    console.log('Valore selezionato:', currentPageSelezionato);
    
    this.currentPage=currentPageSelezionato;
    this.numeroPaginata(currentPageSelezionato).subscribe(data=>{
      this.richieste=data.elenco.content;
      console.log("Elenco richieste paginate: ",data.elenco.content)
      // console.log("Richieste: "+ JSON.stringify(this.richieste));
      this.pagineTotali=data.elenco.totalPages;
      console.log("pagine Totali: ",this.pagineTotali);
    })
    
}

prendiNumeroPaginaInput(){
  // devo prendere il valore del campo con id "numeroPaginaInput"
    const numeroPaginaInput = (<HTMLInputElement>document.getElementById('numeroPaginaInput')).value;
    if(numeroPaginaInput<=this.pagineTotali){
    this.currentPage=numeroPaginaInput;

    this.numeroPaginata(numeroPaginaInput).subscribe(data=>{
      this.richieste=data.elenco.content;
      console.log("Elenco richieste paginate: ",data.elenco.content)
      // console.log("Richieste: "+ JSON.stringify(this.richieste));
      this.pagineTotali=data.elenco.totalPages;
      
      console.log("pagine Totali: ",this.pagineTotali);
    })
  } else {
    alert("Numero pagina non presente, pagine totali: "+this.pagineTotali);
  }
}

paginaPrecedente() {
  if (this.currentPage > 1) {
    let currentPageCopy = this.currentPage; // Salviamo il valore corrente di currentPage in una variabile locale
    currentPageCopy--; // Decrementiamo il valore per la pagina precedente

    this.numeroPaginata(currentPageCopy).subscribe(data => {
      this.currentPage = currentPageCopy; // Aggiorniamo this.currentPage con il valore corretto
      this.richieste = data.elenco.content;
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

    this.numeroPaginata(currentPageCopy).subscribe(data => {
      this.currentPage = currentPageCopy; // Aggiorniamo this.currentPage con il valore corretto
      this.richieste = data.elenco.content;
      console.log("Elenco richieste paginate: ", data.elenco.content);
      this.pagineTotali = data.elenco.totalPages;
      console.log("Pagina corrente: ", this.currentPage);
      console.log("Pagine Totali: ", this.pagineTotali);
    });
  }
}


  
  
}
