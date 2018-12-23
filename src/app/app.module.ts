import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderRentasComponent } from './header-rentas/header-rentas.component';
import { FooterRentasComponent } from './footer-rentas/footer-rentas.component';
import { BannerComponent } from './banner/banner.component';
import { BotoneraComponent } from './botonera/botonera.component';
import { SeccionComponent } from './seccion/seccion.component';
import { AcordeonComponent } from './acordeon/acordeon.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderRentasComponent,
    FooterRentasComponent,
    BannerComponent,
    BotoneraComponent,
    SeccionComponent,
    AcordeonComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
