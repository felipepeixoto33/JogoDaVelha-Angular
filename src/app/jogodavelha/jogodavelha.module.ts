import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JogodavelhaComponent } from './jogodavelha.component';
import { JogodavelhaService } from './shared';

@NgModule({
  declarations: [JogodavelhaComponent],
  imports: [CommonModule],
  exports: [JogodavelhaComponent],
  providers: [JogodavelhaService],
})
export class JogodavelhaModule {}
