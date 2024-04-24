import { Component, OnInit } from '@angular/core';
import { RichiestaService } from '../../service/richiesta.service';
import { CommessaOs, StatoApprovazioneConsap, StatoApprovazioneOs, StatoRichiestaConsap, StatoRichiestaOs } from '../../service/richiesta';
import { error } from 'console';
import { FactoryTarget } from '@angular/compiler';

@Component({
  selector: 'app-modifica',
  templateUrl: './modifica.component.html',
  styleUrl: './modifica.component.css'
})
export class ModificaComponent implements OnInit {
  idRichiesta: any;
  richiesta:any;
  // stato richiesta Consap

  statoRichiestaConsap!: StatoRichiestaConsap[];
  idEreditatoStatoRichiestaConsap!: any;
  condizioneVisibleNullStatoRichiestaConsap: boolean = true;
  // letturaStatoRichiestaConsap: boolean = false;

  // stato richiesta Os

  statoRichiestaOs!: StatoRichiestaOs[];
  idEreditatoStatoRichiestaOs!: any;
  condizioneVisibleNullStatoRichiestaOs: boolean = true;
  // condizioneStatoRichiestaOs: boolean = false;
  // letturaStatoRichiestaOs: boolean = false;

  // stato approvazione Consap

  statoApprovazioneConsap!: StatoApprovazioneConsap[];
  idEreditatoStatoApprovazioneConsapBox!: any;
  condizioneVisibleNullStatoApprovazioneConsap: boolean = true;
  // letturaStatoApprovazioneConsap: boolean = false;

  // stato approvazione Os

  statoApprovazioneOs!: StatoApprovazioneOs[];
  idEreditatoStatoApprovazioneOsBox!: any;
  condizioneVisibleNullStatoApprovazioneOs: boolean = true;
  // condizioneStatoApprovazioneOs: boolean = false;
  // letturaStatoApprovazioneOs: boolean = false;
  
  // commessa Os
  commessaOs!: CommessaOs[];

  

  constructor(private richiestaService: RichiestaService) { }

  ngOnInit(): void {
    const id=localStorage.getItem('idRichiesta');
    this.idRichiesta=id;
    this.prendiRichiestaConCombo()

    // console.log("STATO RICHIESTA CONSAP PASSATO : ", this.statoRichiestaConsapPassato.descStatoRichiestaConsap);
    
  }

  

  

 

  

  prendiRichiestaConCombo(){
    const idParsato = parseInt(this.idRichiesta);
    console.log("idRichiesta Parsato: ",idParsato);
    
    const dati = {
      "erroreDTO": null,
      "filtri": {
          "id": idParsato,
          
      },
      "elenco": null
  };
    
  this.richiestaService.idRichiestaModifica(dati).subscribe((data) => {
    this.richiesta = data.elenco.content[0];
    console.log("RICHIESTA DA PASSARE :", this.richiesta);
///////////////////////////////////////////////////////////////////////////////////////////////

    // controllo stato richiesta consap
    

    this.richiestaService.statoRichiestaConsapPost().subscribe((data) => {

      if (this.richiesta.statoRichiestaConsap == null) {
        this.idEreditatoStatoRichiestaConsap = null;
    } else {
        this.idEreditatoStatoRichiestaConsap = this.richiesta.statoRichiestaConsap.statoRichiestaConsapId;
    }
    console.log("statoRichiestaConsapId: ", this.idEreditatoStatoRichiestaConsap);

        this.statoRichiestaConsap = data.elenco;
        const ultimo = this.statoRichiestaConsap.length;
        const penultimo = this.statoRichiestaConsap.length - 1;
        
        
        if (this.idEreditatoStatoRichiestaConsap == null) {
          // Se lo stato è null, abilita solo il primo elemento
          this.statoRichiestaConsap.forEach((elemento, indice) => {
            
              this.statoRichiestaConsap[indice].abilitato = (indice === 0);
          });
      } else {
          this.condizioneVisibleNullStatoRichiestaConsap = false;
          if(this.idEreditatoStatoRichiestaConsap<=penultimo){
            this.statoRichiestaConsap.forEach((elemento, indice) => {
              
                // abilita l'elemento quello attuale e il precedente
                this.statoRichiestaConsap[indice].abilitato = (indice === (this.idEreditatoStatoRichiestaConsap-1) || indice === this.idEreditatoStatoRichiestaConsap);
                
            });
          }
          // se lo stato è uguale a ultimo, abilita l'elemento attuale e disabilita i precedenti
          if (this.idEreditatoStatoRichiestaConsap == ultimo) {
            this.statoRichiestaConsap.forEach((elemento, indice) => {
              
              console.log("indice ultimo array SRC: ", indice);
              
                this.statoRichiestaConsap[indice].abilitato = (indice === this.idEreditatoStatoRichiestaConsap-1);
              });
          }
      }
      
      
      
      

      console.log('STATO RICHIESTA CONSAP:', this.statoRichiestaConsap);
    });
  // OK FUNZIONA

///////////////////////////////////////////////////////////////////////////////////////////////

    // controllo stato richiesta Os
    this.richiestaService.statoRichiestaOsPost().subscribe((data) => {
      this.statoRichiestaOs = data.elenco;
      const ultimo = this.statoRichiestaOs.length;
      const penultimo = ultimo - 1;
  
      if (this.richiesta.statoRichiestaOs == null) {
          this.idEreditatoStatoRichiestaOs = null;
      } else {
          this.idEreditatoStatoRichiestaOs = this.richiesta.statoRichiestaOs.statoRichiestaOsId;
      }
      console.log("statoRichiestaOsId: ", this.idEreditatoStatoRichiestaOs);
  
      if (this.idEreditatoStatoRichiestaOs == null) {
        console.log("CAVOLO ID NULL");
        
          // Se lo stato è null, abilita solo il primo elemento
          this.statoRichiestaOs.forEach((elemento, indice) => {
              this.statoRichiestaOs[indice].abilitato = (indice === 0);
              console.log("indice 0: ", indice);
              
          });
      } else {
          this.condizioneVisibleNullStatoRichiestaOs = false;
          if (this.idEreditatoStatoRichiestaOs <= penultimo) {
              this.statoRichiestaOs.forEach((elemento, indice) => {
                  // abilita l'elemento corrente e il precedente
                  this.statoRichiestaOs[indice].abilitato = (indice === (this.idEreditatoStatoRichiestaOs - 1) || indice === this.idEreditatoStatoRichiestaOs);
              });
          }
          // se lo stato è uguale a ultimo, abilita l'elemento corrente e disabilita i precedenti
          if (this.idEreditatoStatoRichiestaOs == ultimo) {
              this.statoRichiestaOs.forEach((elemento, indice) => {
                  this.statoRichiestaOs[indice].abilitato = (indice === penultimo);
              });
          }
      }
  
      console.log('STATO RICHIESTA OS:', this.statoRichiestaOs);
  });
  
  // OK FUNZIONA

  ///////////////////////////////////////////////////////////////////////////////////////////////
    
  // controllo stato approvazione consap

  this.richiestaService.statoApprovazioneConsapPost().subscribe((data) => {
    this.statoApprovazioneConsap = data.elenco;
    const ultimo = this.statoApprovazioneConsap.length;
    const penultimo = ultimo - 1;

    if (this.richiesta.statoApprovazioneConsap == null) {
        this.idEreditatoStatoApprovazioneConsapBox = null;
    } else {
        this.idEreditatoStatoApprovazioneConsapBox = this.richiesta.statoApprovazioneConsap.statoApprovazioneConsapId;
    }
    console.log("statoApprovazioneConsapId: ", this.idEreditatoStatoApprovazioneConsapBox);

    if (this.idEreditatoStatoApprovazioneConsapBox == null) {
        // Se lo stato è null, abilita solo il primo elemento
        this.statoApprovazioneConsap.forEach((elemento, indice) => {
            this.statoApprovazioneConsap[indice].abilitato = (indice === 0);
        });
    } else {
        this.condizioneVisibleNullStatoApprovazioneConsap = false;
        if (this.idEreditatoStatoApprovazioneConsapBox <= penultimo) {
            this.statoApprovazioneConsap.forEach((elemento, indice) => {
                // abilita l'elemento corrente e il precedente
                this.statoApprovazioneConsap[indice].abilitato = (indice === (this.idEreditatoStatoApprovazioneConsapBox - 1) || indice === this.idEreditatoStatoApprovazioneConsapBox);
            });
        }
        // se lo stato è uguale a ultimo, abilita l'elemento corrente e disabilita i precedenti
        if (this.idEreditatoStatoApprovazioneConsapBox == ultimo) {
            this.statoApprovazioneConsap.forEach((elemento, indice) => {
                this.statoApprovazioneConsap[indice].abilitato = (indice === penultimo);
            });
        }
    }

    console.log('STATO APPROVAZIONE CONSAP:', this.statoApprovazioneConsap);
});

// OK FUNZIONA

  //////////////////////////////////////////////////////////////////////////////////////////////
    
  // controllo stato approvazione os

  this.richiestaService.statoApprovazioneOsPost().subscribe((data) => {
    this.statoApprovazioneOs = data.elenco;
    const ultimo = this.statoApprovazioneOs.length;
    const penultimo = ultimo - 1;

    if (this.richiesta.statoApprovazioneOs == null) {
        this.idEreditatoStatoApprovazioneOsBox = null;
    } else {
        this.idEreditatoStatoApprovazioneOsBox = this.richiesta.statoApprovazioneOs.statoApprovazioneOsId;
    }
    console.log("statoApprovazioneOsId: ", this.idEreditatoStatoApprovazioneOsBox);

    if (this.idEreditatoStatoApprovazioneOsBox == null) {
        // Se lo stato è null, abilita solo il primo elemento
        this.statoApprovazioneOs.forEach((elemento, indice) => {
            this.statoApprovazioneOs[indice].abilitato = (indice === 0);
        });
    } else {
        this.condizioneVisibleNullStatoApprovazioneOs = false;
        if (this.idEreditatoStatoApprovazioneOsBox <= penultimo) {
            this.statoApprovazioneOs.forEach((elemento, indice) => {
                // abilita l'elemento corrente e il precedente
                this.statoApprovazioneOs[indice].abilitato = (indice === (this.idEreditatoStatoApprovazioneOsBox - 1) || indice === this.idEreditatoStatoApprovazioneOsBox);
            });
        }
        // se lo stato è uguale a ultimo, abilita l'elemento corrente e disabilita i precedenti
        if (this.idEreditatoStatoApprovazioneOsBox == ultimo) {
            this.statoApprovazioneOs.forEach((elemento, indice) => {
                this.statoApprovazioneOs[indice].abilitato = (indice === penultimo);
            });
        }
    }

    console.log('STATO APPROVAZIONE OS:', this.statoApprovazioneOs);
});

    

    /////////////////////////////////////////////////////////////////////////////////////////

    this.richiestaService.commessaOsPost().subscribe((data) => {
      this.commessaOs = data.elenco;
      console.log('COMMESSA OS:', this.commessaOs);
      });


    });

   
   

    
    
    
    

    
     
  }

  editRichiesta(){
    const numeroTicket = (<HTMLInputElement>(
      document.getElementById('numeroTicket')
    )).value;
    const numeroTicketParsed = parseInt(numeroTicket);

    const oggetto = (<HTMLInputElement>document.getElementById('oggetto'))
      .value;
    const oggettoParsed: string = String(oggetto);

    const applicativoInput = document.getElementById('applicativo') as HTMLInputElement;
const applicativoIdString = applicativoInput.getAttribute('applicativoId');
const applicativoId = applicativoIdString ? parseInt(applicativoIdString) : null;




    const dataCreazione = (<HTMLInputElement>(
      document.getElementById('dataCreazione')
    )).value;
    const dataCreazioneParsed: string = String(dataCreazione);

    const statoRichiestaConsap = (<HTMLSelectElement>(
      document.getElementById('statoRichiestaConsap')
    )).value;
    const statoRichiestaConsapParsed =
      statoRichiestaConsap === '' ? null : parseInt(statoRichiestaConsap);

    const importo = (<HTMLInputElement>document.getElementById('importo'))
      .value;
    const importoParsed = importo === '' ? null : importo;

    const statoApprovazioneConsap = (<HTMLSelectElement>(
      document.getElementById('statoApprovazioneConsap')
    )).value;

    const statoApprovazioneConsapParsed =
      statoApprovazioneConsap === '' ? null : parseInt(statoApprovazioneConsap);

    const statoApprovazioneOs = (<HTMLSelectElement>(
      document.getElementById('statoApprovazioneOs')
    )).value;
    const statoApprovazioneOsParsed =
      statoApprovazioneOs === '' ? null : parseInt(statoApprovazioneOs);

    const statoRichiestaOs = (<HTMLSelectElement>(
      document.getElementById('statoRichiestaOs')
    )).value;
    const statoRichiestaOsParsed =
      statoRichiestaOs === '' ? null : parseInt(statoRichiestaOs);

    const dataStimaFinale = (<HTMLInputElement>(
      document.getElementById('dataStimaFinale')
    )).value;

    const dataStimaFinaleParsed =
      dataStimaFinale === '' ? null : String(dataStimaFinale);

    const commessaOs = (<HTMLSelectElement>(
      document.getElementById('commessaOs')
    )).value;
    const commessaOsParsed = commessaOs === '' ? null : parseInt(commessaOs);

    const dati = {
      erroreDTO: null,
      filtri: {id : this.idRichiesta},
      elenco: [
        {
          id: null,
          numeroTicket: numeroTicketParsed,
          applicativo: {
            applicativoId: applicativoId,
          },
          oggetto: oggettoParsed,
          statoRichiestaConsap: {
            statoRichiestaConsapId: statoRichiestaConsapParsed,
          },
          dataCreazione: dataCreazioneParsed,
          statoApprovazioneConsap: {
            statoApprovazioneConsapId: statoApprovazioneConsapParsed,
          },
          statoApprovazioneOs: {
            statoApprovazioneOsId: statoApprovazioneOsParsed,
          },
          statoRichiestaOs: {
            statoRichiestaOsId: statoRichiestaOsParsed,
          },
          dataStimaFinale: dataStimaFinaleParsed,
          importo: importoParsed,
          commessaOs: {
            commessaOsId: commessaOsParsed,
          },
        },
      ],
    };

    // console.log('DATI DA MODIFICARE:', dati);
    this.richiestaService.modificaRichiesta(dati).subscribe(
      (data) => {
        console.log('RICHIESTA MODIFICATA:', data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  reload() {
    window.location.reload();
  }

  openModifica() {
    
      const modal = document.getElementById('modalOpenModifica');
      if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
      }
    
  }

  // Metodo per chiudere il modal
  closeModifica() {
    const modal = document.getElementById('modalOpenModifica');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }
  openConferma() {
    const modal = document.getElementById('modalConfermaModifica');
    if (modal) {
      this.closeModifica();
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  // Metodo per chiudere il modal
  closeConferma() {
    const modal = document.getElementById('modalConfermaModifica');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }
}
