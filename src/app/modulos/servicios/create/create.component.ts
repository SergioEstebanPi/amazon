import { Component, OnInit } from '@angular/core';
import { UsuarioModelo } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  listadoClientes: UsuarioModelo[] = []
  listadoEncomiendas: UsuarioModelo[] = []

  constructor(
    private clienteService: UsuarioService,
    private encomiendaService: UsuarioService,
  ) {

  }

  ngOnInit(): void {
    this.getAllClientes();
    this.getAllEncomiendas();
  }

  getAllClientes(){
    this.clienteService.getAll().subscribe((data: UsuarioModelo[]) => {
      this.listadoClientes = data
      console.log(data)
    })
  }

  getAllEncomiendas(){
    this.encomiendaService.getAll().subscribe((data: UsuarioModelo[]) => {
      this.listadoEncomiendas = data
      console.log(data)
    })
  }
}
