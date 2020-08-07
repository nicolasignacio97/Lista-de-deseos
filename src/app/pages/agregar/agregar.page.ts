import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../service/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem: '';

  constructor(private deeosservice: DeseosService,
              private route: ActivatedRoute) {

    const ListaId = this.route.snapshot.paramMap.get('listaId');
    this.lista = this.deeosservice.obtenerLista(ListaId);
  }

  ngOnInit() {
  }
  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    }
    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);
    this.nombreItem = '';
    this.deeosservice.guardarStorage();
  }
  cambioCheck(item: string) {

    const pendientes = this.lista.items.filter(itemData => !itemData.completado).length;

    if (pendientes === 0){

      this.lista.terminadaEn = new Date();
      this.lista.terminada   = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada   = false;
    }

    this.deeosservice.guardarStorage();
  }

  borrar(i: number){
    this.lista.items.splice(i, 1);
    this.deeosservice.guardarStorage();
  }

}
