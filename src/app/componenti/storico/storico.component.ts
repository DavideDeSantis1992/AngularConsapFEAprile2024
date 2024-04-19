import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storico',
  templateUrl: './storico.component.html',
  styleUrl: './storico.component.css'
})
export class StoricoComponent implements OnInit {
  loading = true;
  showSpinner = true; // Aggiunto

  ngOnInit(): void {
    // Nascondi il contenuto fino alla fine del timer
    document.body.style.overflow = 'hidden';

    // Simuliamo il caricamento dei dati
    setTimeout(() => {
      this.loading = false;
      this.showSpinner = false; // Aggiunto
      // Ripristina lo scrolling del corpo del documento
      document.body.style.overflow = 'auto';
    }, 2000);
  }
}
