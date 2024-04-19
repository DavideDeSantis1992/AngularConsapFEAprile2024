import { Component, OnInit } from '@angular/core';
import {
  Applicativo,
  CommessaOs,
  StatoApprovazioneConsap,
  StatoApprovazioneOs,
  StatoRichiestaConsap,
  StatoRichiestaOs,
  richiestaAttualeArr,
} from '../../service/richiesta';
import { RichiestaService } from '../../service/richiesta.service';
import { Router } from 'express';

@Component({
  selector: 'app-inserimento',
  templateUrl: './inserimento.component.html',
  styleUrl: './inserimento.component.css',
})
export class InserimentoComponent implements OnInit {
  
  richieste!: richiestaAttualeArr[];

  applicativo!: Applicativo[];
  statoRichiestaConsap!: StatoRichiestaConsap[];
  statoRichiestaOs!: StatoRichiestaOs[];
  statoApprovazioneConsap!: StatoApprovazioneConsap[];
  statoApprovazioneOs!: StatoApprovazioneOs[];
  commessaOs!: CommessaOs[];
  router: any;

  constructor(private connex: RichiestaService) {}

  ngOnInit(): void {
    this.getApplicativo();
    this.getStatoRichiestaConsap();
    this.getStatoRichiestaOs();
    this.getStatoApprovazioneConsap();
    this.getStatoApprovazioneOs();
    this.getCommessaOs();
  }

  getApplicativo() {
    this.connex.applicativoPost().subscribe((data) => {
      this.applicativo = data.elenco;
      console.log('APPLICATIVO:', this.applicativo);
    });
  }

  getStatoRichiestaConsap() {
    this.connex.statoRichiestaConsapPost().subscribe((data) => {
      this.statoRichiestaConsap = data.elenco;
      console.log('STATO RICHIESTA CONSAP:', this.statoRichiestaConsap);
    });
  }

  getStatoRichiestaOs() {
    this.connex.statoRichiestaOsPost().subscribe((data) => {
      this.statoRichiestaOs = data.elenco;
      console.log('STATO RICHIESTA OS:', this.statoRichiestaOs);
    });
  }

  getStatoApprovazioneConsap() {
    this.connex.statoApprovazioneConsapPost().subscribe((data) => {
      this.statoApprovazioneConsap = data.elenco;
      console.log('STATO APPROVAZIONE CONSAP:', this.statoApprovazioneConsap);
    });
  }

  getStatoApprovazioneOs() {
    this.connex.statoApprovazioneOsPost().subscribe((data) => {
      this.statoApprovazioneOs = data.elenco;
      console.log('STATO APPROVAZIONE OS:', this.statoApprovazioneOs);
    });
  }

  getCommessaOs() {
    this.connex.commessaOsPost().subscribe((data) => {
      this.commessaOs = data.elenco;
      console.log('COMMESSA OS:', this.commessaOs);
    });
  }

  openSalva() {
    const campi = [
      { id: 'numeroTicket', nome: 'Numero Ticket' },
      { id: 'oggetto', nome: 'Oggetto' },
      { id: 'applicativo', nome: 'Applicativo' },
      { id: 'dataCreazione', nome: 'Data Creazione' }
    ];
  
    const campiMancanti = [];
  
    for (const campo of campi) {
      const campoElement = document.getElementById(campo.id);
      if (campoElement) {
        const campoValue = (<HTMLInputElement>campoElement).value;
        if (!campoValue || campoValue.trim().length < 5) {
          campiMancanti.push(campo.nome);
        }
      }
    }
  
    if (campiMancanti.length > 0) {
      let messaggio = 'Mancano dati nei seguenti campi:\n';
      messaggio += campiMancanti.join(', ');
      alert(messaggio);
    } else {
      const modal = document.getElementById('modalSalvataggio');
      if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
      }
    }
  }
  
  
  
  
  
  

  // Metodo per chiudere il modal
  closeSalva() {
    const modal = document.getElementById('modalSalvataggio');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }
  openConferma() {
    const modal = document.getElementById('modalConferma');
    if (modal) {
      this.closeSalva();
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  // Metodo per chiudere il modal
  closeConferma() {
    const modal = document.getElementById('modalConferma');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  creaRichiesta(){
    const numeroTicket = (<HTMLInputElement>(
      document.getElementById('numeroTicket')
    )).value;
    const numeroTicketParsed = parseInt(numeroTicket);

    const oggetto = (<HTMLInputElement>document.getElementById('oggetto')).value;
    const oggettoParsed: string = String(oggetto);  
    
    const applicativo = (<HTMLSelectElement>(
      document.getElementById('applicativo')
      )).value;
    const applicativoParsed = applicativo ==='' ? null : parseInt(applicativo);
    
    const dataCreazione = (<HTMLInputElement>(
      document.getElementById('dataCreazione')
    )).value;
    const dataCreazioneParsed: string = String(dataCreazione);

    const statoRichiestaConsap = (<HTMLSelectElement>(
      document.getElementById('statoRichiestaConsap')
    )).value;
    const statoRichiestaConsapParsed = statoRichiestaConsap === '' ? null : parseInt(statoRichiestaConsap);


    const importo = (<HTMLInputElement>document.getElementById('importo'))
      .value;
      const importoParsed = importo === '' ? null : importo;

    const statoApprovazioneConsap = (<HTMLSelectElement>(
      document.getElementById('statoApprovazioneConsap')
    )).value;

    const statoApprovazioneConsapParsed = statoApprovazioneConsap === '' ? null : parseInt(statoApprovazioneConsap);
    

    const statoApprovazioneOs = (<HTMLSelectElement>(
      document.getElementById('statoApprovazioneOs')
    )).value;
    const statoApprovazioneOsParsed = statoApprovazioneOs === '' ? null : parseInt(statoApprovazioneOs);

    const statoRichiestaOs = (<HTMLSelectElement>(
      document.getElementById('statoRichiestaOs')
    )).value;
    const statoRichiestaOsParsed = statoRichiestaOs === '' ? null : parseInt(statoRichiestaOs);
    
    const dataStimaFinale = (<HTMLInputElement>(
      document.getElementById('dataStimaFinale')
    )).value;

    const dataStimaFinaleParsed = dataStimaFinale === '' ? null : String(dataStimaFinale);
  
    const commessaOs = (<HTMLSelectElement>(
      document.getElementById('commessaOs')
    )).value;
    const commessaOsParsed = commessaOs === '' ? null : parseInt(commessaOs);

    
    
    const dati = {
      erroreDTO: null,
      filtri: null,
      elenco: 
      [
          {
              id: null,
              numeroTicket: numeroTicketParsed,
              applicativo: {
                  applicativoId: applicativoParsed
              },
              oggetto: oggettoParsed,
              statoRichiestaConsap: {
                  statoRichiestaConsapId: statoRichiestaConsapParsed
              },
              dataCreazione: dataCreazioneParsed,
              statoApprovazioneConsap: {
                  statoApprovazioneConsapId: statoApprovazioneConsapParsed
              },
              statoApprovazioneOs: {
                  statoApprovazioneOsId: statoApprovazioneOsParsed
              },
              statoRichiestaOs: {
                  statoRichiestaOsId: statoRichiestaOsParsed
              },
              dataStimaFinale: dataStimaFinaleParsed,
              importo: importoParsed,
              commessaOs: {
                  commessaOsId: commessaOsParsed
              }
          }
      ]
  };
    this.connex.inserimentoRichiesta(dati).subscribe((data) => {
      console.log("RICHIESTA SALVATA:",dati);
      
    }, (error) => {
      console.error(error);
    })
  }

  // crea metodo di reload della pagina corrente
  reload(){
    window.location.reload();
  }

  showErrorNumeroTicket = false;

  checkNumeroTicket(event: any) {
    const inputText = event.target.value;
    this.showErrorNumeroTicket = !(/^\d{5}$/.test(inputText));
  }
}
