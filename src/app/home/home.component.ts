import { Component,ViewChild } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { balancetotal } from '../db/mock-balance'; 
import { Presupuesto } from '../models/Presupuesto';
import { presupuestomovs } from '../db/mock-presupuesto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  Title = 'Expense Tracker - Final Project';
  @ViewChild(FooterComponent) footer: any;

  presupuestoLst:Presupuesto[]=presupuestomovs;

  constructor(private route: Router){}

  montoPre = 0;
  divisa = "USD";
  
  sendForm(){
    balancetotal.montoPresupuestado = this.montoPre;
    balancetotal.divisa = this.divisa;

    let pre:Presupuesto={
      nombre: "Presupuesto Inicial",
      tipoRegistro: 'I',
      montoPresupuestado: this.montoPre,
      montoReal: 0,
      divisa: this.divisa
    };

    this.presupuestoLst.push(pre);
    this.footer.procesarPresupuesto();
    this.route.navigate(['/process']);
  }

}
