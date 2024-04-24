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
  statoRichiestaConsapBox!: any;
  condizioneStatoRichiestaConsap: boolean = false;
  letturaStatoRichiestaConsap: boolean = false;

  // stato richiesta Os

  statoRichiestaOs!: StatoRichiestaOs[];
  statoRichiestaOsBox!: any;
  condizioneStatoRichiestaOs: boolean = false;
  letturaStatoRichiestaOs: boolean = false;

  // stato approvazione Consap

  statoApprovazioneConsap!: StatoApprovazioneConsap[];
  statoApprovazioneConsapBox!: any;
  condizioneStatoApprovazioneConsap: boolean = false;
  letturaStatoApprovazioneConsap: boolean = false;

  // stato approvazione Os

  statoApprovazioneOs!: StatoApprovazioneOs[];
  statoApprovazioneOsBox!: any;
  condizioneStatoApprovazioneOs: boolean = false;
  letturaStatoApprovazioneOs: boolean = false;
  
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
    this.richiesta=data.elenco.content[0];
    console.log("RICHIESTA DA PASSARE :",this.richiesta);
    

    // indice che serve per tutte le chiamate
    const indx = 0

    // confronto statoRichiestaConsap e chiamata sul service

    // se il valore di statoRichiestaConsap della richiesta da modificare è diverso da null
    if(data.elenco.content[indx].statoRichiestaConsap != null){

      //effettuo la chiamata
      this.richiestaService.statoRichiestaConsapPost().subscribe((data) => {
        // popolo la variabile con i dati della tabella di statoRichiestaConsap
        this.statoRichiestaConsap = data.elenco;
        // ciclo l'array di statoRichiestaConsap 
        for(let i = 0; i < this.statoRichiestaConsap.length; i++){
          // confronto i valodi dello statoRichiestaConsap variabile con il valore dello statoRichiestaConsap della richiesta
          if(this.statoRichiestaConsap[i].statoRichiestaConsapId == this.richiesta.statoRichiestaConsap.statoRichiestaConsapId){
            // se la i iterata ha valore inferiore alla lunghezza dell'array
            if(i<this.statoRichiestaConsap.length-1){
              this.condizioneStatoRichiestaConsap=true
              this.statoRichiestaConsapBox = this.statoRichiestaConsap[i+1];
            }else{
              this.condizioneStatoRichiestaConsap=false
              this.letturaStatoRichiestaConsap=true
            }
          }
        }
        });
    }else{
      this.richiestaService.statoRichiestaConsapPost().subscribe((data) => {
        this.condizioneStatoRichiestaConsap=true;
        this.statoRichiestaConsap = data.elenco;
        this.statoRichiestaConsapBox = this.statoRichiestaConsap[0];
        });
    }

    // confronto statoRichiestaOs e chiamata sul service
    if(data.elenco.content[indx].statoRichiestaOs != null){
      this.richiestaService.statoRichiestaOsPost().subscribe((data) => {
        this.statoRichiestaOs = data.elenco;
        for(let i = 0; i < this.statoRichiestaOs.length; i++){
          if(this.statoRichiestaOs[i].statoRichiestaOsId == this.richiesta.statoRichiestaOs.statoRichiestaOsId){
            if(i<this.statoRichiestaOs.length-1){
              this.condizioneStatoRichiestaOs=true
              this.statoRichiestaOsBox = this.statoRichiestaOs[i+1];
            }else{
              this.condizioneStatoRichiestaOs=false
              this.letturaStatoRichiestaOs=true
            }
          }
        }
        });
    }else{
      this.richiestaService.statoRichiestaOsPost().subscribe((data) => {
        this.condizioneStatoRichiestaOs=true;
        this.statoRichiestaOs = data.elenco;
        this.statoRichiestaOsBox = this.statoRichiestaOs[0];
        console.log("statoRichiestaOsBox: ",this.statoRichiestaOsBox);
        
        });
    }

    // confronto statoApprovazioneConsap e chiamata sul service
    if(data.elenco.content[indx].statoApprovazioneConsap != null){
      this.richiestaService.statoApprovazioneConsapPost().subscribe((data) => {
        this.statoApprovazioneConsap = data.elenco;
        for(let i = 0; i < this.statoApprovazioneConsap.length; i++){
          if(this.statoApprovazioneConsap[i].statoApprovazioneConsapId == this.richiesta.statoApprovazioneConsap.statoApprovazioneConsapId){
            if(i<this.statoApprovazioneConsap.length-1){
              this.condizioneStatoApprovazioneConsap=true
              this.statoApprovazioneConsapBox = this.statoApprovazioneConsap[i+1];
            }else{
              this.condizioneStatoApprovazioneConsap=false
              this.letturaStatoApprovazioneConsap=true
            }
          }
        }
        });
    }else{
      this.richiestaService.statoApprovazioneConsapPost().subscribe((data) => {
        this.condizioneStatoApprovazioneConsap=true;
        this.statoApprovazioneConsap = data.elenco;
        this.statoApprovazioneConsapBox = this.statoApprovazioneConsap[0];
        console.log("statoApprovazioneConsapBox: ",this.statoApprovazioneConsapBox);
        
        });
    }

    // confronto statoApprovazioneOs e chiamata al service

    if(data.elenco.content[indx].statoApprovazioneOs != null){
      this.richiestaService.statoApprovazioneOsPost().subscribe((data) => {
        this.statoApprovazioneOs = data.elenco;
        for(let i = 0; i < this.statoApprovazioneOs.length; i++){
          if(this.statoApprovazioneOs[i].statoApprovazioneOsId == this.richiesta.statoApprovazioneOs.statoApprovazioneOsId){
            if(i<this.statoApprovazioneOs.length-1){
              this.condizioneStatoApprovazioneOs=true
              this.statoApprovazioneOsBox = this.statoApprovazioneOs[i+1];
            }else{
              this.condizioneStatoApprovazioneOs=false
              this.letturaStatoApprovazioneOs=true
            }
          }
        }
        });
    }else{
      this.richiestaService.statoApprovazioneOsPost().subscribe((data) => {
        this.condizioneStatoApprovazioneOs=true;
        this.statoApprovazioneOs = data.elenco;
        this.statoApprovazioneOsBox = this.statoApprovazioneOs[0];
        console.log("statoApprovazioneOsBox: ",this.statoApprovazioneOsBox);
        
        });
    }

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
}
