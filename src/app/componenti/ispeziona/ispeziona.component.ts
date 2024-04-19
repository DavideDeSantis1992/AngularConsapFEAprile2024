import { Component, OnInit } from '@angular/core';
import { RichiestaService } from '../../service/richiesta.service';
import { richiestaAttualeArr } from '../../service/richiesta';

@Component({
  selector: 'app-ispeziona',
  templateUrl: './ispeziona.component.html',
  styleUrls: ['./ispeziona.component.css']
})
export class IspezionaComponent implements OnInit {

  responseData: any;
  idRichiesta: any;
  richiesta:any;
  richiestaShow:any;

  constructor(private richiestaService: RichiestaService) {}

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
    // console.log("RICHIESTE STORICHE: ",this.richiesta);

    const indice = data.elenco.content.length - 1;
    console.log("indice richiesta storica",indice);
    
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
  
}
