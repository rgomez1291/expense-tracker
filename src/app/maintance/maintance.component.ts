import { Component, OnInit, ViewChild } from '@angular/core';
import { presupuestomovs } from 'src/app/db/mock-presupuesto';
import { Presupuesto } from 'src/app/models/Presupuesto';
import { balancetotal } from '../db/mock-balance'; 
import { Balance } from '../models/Balance';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-maintance',
  templateUrl: './maintance.component.html',
  styleUrls: ['./maintance.component.css']
})
export class MaintanceComponent implements OnInit {
  @ViewChild(FooterComponent) footer: any;
  new_nombre = "";
  new_tipoRegistro = "";
  new_montoPre = NaN;

  nombre;
  presuestoEditado: Presupuesto = { nombre: "", tipoRegistro: "", montoPresupuestado: 0, montoReal:0, divisa:"" };
  Title = 'Maintance';

  constructor(private router: ActivatedRoute,private _route: Router) {

    this.nombre = this.router.snapshot.paramMap.get('id');
    presupuestomovs.forEach(element => {
      if (element.nombre == this.nombre) {
        this.presuestoEditado = element;
        this.new_nombre = this.presuestoEditado.nombre;
        this.new_tipoRegistro = this.presuestoEditado.tipoRegistro;
        this.new_montoPre = this.presuestoEditado.montoPresupuestado;
      }
    });
  };

  ngOnInit(): void {

  }

  add_registro() {
    presupuestomovs.forEach(element => {
      if (element.nombre == this.nombre) {
        this.presuestoEditado = element;
        this.presuestoEditado.nombre = this.new_nombre;
        this.presuestoEditado.tipoRegistro = this.new_tipoRegistro;
        this.presuestoEditado.montoPresupuestado = this.new_montoPre;
      }
    });

    this.footer.calcularBalance();
    this._route.navigate(['/process']);
  }
  cancelar(){
    this._route.navigate(['/process']);
  }

}
