import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { Presupuesto } from 'src/app/models/Presupuesto';
import { Balance } from 'src/app/models/Balance';
import { presupuestomovs } from 'src/app/db/mock-presupuesto';
import { balancetotal } from '../db/mock-balance';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})

export class ProcessComponent implements OnInit {
  @ViewChild(FooterComponent) footer: any;
  Presupuesto:Presupuesto[] = presupuestomovs;
  Balance:Balance = balancetotal;

  Title = 'Movimientos';
  displayedColumns: string[] = ['nombre', 'tipoRegistro', 'montoPresupuestado', 'acciones'];
  dataSource = presupuestomovs;

  new_nombre = "";
  new_tipoRegistro = "";
  new_montoPre = 0;
  new_montoReal=0;

  ngOnInit(): void {
    //this.sumaTotal();
  }

  constructor(private route: Router) {}

  add() {
    const newData = [...this.dataSource];
    newData.push({ nombre: this.new_nombre, tipoRegistro: this.new_tipoRegistro, montoPresupuestado: this.new_montoPre, montoReal:this.new_montoReal, divisa:'USD'});
    this.dataSource = newData;
    this.sumaTotal();
    
    this.clean();
  }

  update(registro: Presupuesto) {
    this.route.navigate(['/maintance',registro.nombre]);
  }

  delete(registro: Presupuesto) {
    this.dataSource = this.dataSource.filter((c) => c.nombre !== registro.nombre);
    this.dataSource = presupuestomovs.filter((c) => c.nombre !== registro.nombre);
    this.footer.procesarPresupuesto();
  }

  clean() {
    this.new_nombre = "";
    this.new_tipoRegistro = "";
    this.new_montoPre = 0;
    this.new_montoReal = 0;

  }

  sumaTotal() {
    presupuestomovs.forEach(element => {
      if (element.tipoRegistro == "E") {
        this.Balance.totalEgresos = this.Balance.totalEgresos + element.montoPresupuestado;
      }
      if (element.tipoRegistro == "I") {
        this.Balance.totalIngresos = this.Balance.totalIngresos + element.montoPresupuestado;
      }
      this.Balance.saldoFavor = (this.Balance.montoPresupuestado - this.Balance.totalEgresos);
    });
    this.footer.procesarPresupuesto();
  }

}
