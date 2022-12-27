import { Component, ViewChild } from '@angular/core';
import { balancetotal } from '../db/mock-balance';
import { Balance } from '../models/Balance';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css']
})
export class FooterComponent {

  Balance:Balance = balancetotal;

  constructor(){}

  procesarPresupuesto(){
    this.Balance.montoPresupuestado = this.Balance.montoPresupuestado - this.Balance.totalEgresos; 
  }
}
