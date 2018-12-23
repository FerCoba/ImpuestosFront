import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.scss']
})
export class SeccionComponent implements OnInit {

  constructor(private authService: AuthService) { }

  @Input('name') public seccionName: string;

  public acordeonActivo: boolean;

  public cambiarAcordeonActivo(id) {
    this.acordeonActivo = id;
  }

  public tituloDebitoAutomatico = `
    <div class="debito">¡NUEVO!</div> AHORRÁ UNA CUOTA CON DÉBITO AUTOMÁTICO
  `;

  public consultarDeuda(tipoObj, idObj) {
    this.authService.login().subscribe((data) => {
      let objUser = data;

      objUser.date = new Date();
      objUser.cuit = 'holamundo';

      sessionStorage.setItem('objUser', JSON.stringify(objUser));
      let urlDeuda = 'https://preprod.rentascordoba.gob.ar/nuevaemision/pagoImpuestos/deudaSimple/'.concat(btoa(tipoObj)).concat('/').concat(btoa(idObj));
      window.open(urlDeuda);
     
    },
      (error) => {
      });
  }

  ngOnInit() { }

}
