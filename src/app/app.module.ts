import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { JogodavelhaModule } from './jogodavelha';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, JogodavelhaModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
