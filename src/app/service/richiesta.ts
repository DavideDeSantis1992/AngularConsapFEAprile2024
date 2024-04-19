export class richiestaAttualeArr{
    // id!: number;
    numeroTicket!:number;
    applicativo!:Applicativo;
    oggetto!:string;
    statoRichiestaConsap!:StatoRichiestaConsap;
    dataCreazione!:Date;
    statoApprovazioneConsap!:StatoApprovazioneConsap;
    statoApprovazioneOs!:StatoApprovazioneOs;
    statoRichiestaOs!:StatoRichiestaOs;
    dataStimaFinale!:Date;
    importo!:number;
    commessaOs!:CommessaOs;
}

export interface Applicativo{applicativoId:number,descApplicativo:any}
export interface StatoRichiestaConsap{statoRichiestaConsapId:number,descStatoRichiestaConsap:any}
export interface StatoApprovazioneConsap{statoApprovazioneConsapId:number,descStatoApprovazioneConsap:any}
export interface StatoApprovazioneOs{statoApprovazioneOsId:number,descStatoApprovazioneOs:any}
export interface StatoRichiestaOs{statoRichiestaOsId:number,descStatoRichiestaOs:any}
export interface CommessaOs{commessaOsId:number,codiceCommessaOs:any,descCommessaOs:any}