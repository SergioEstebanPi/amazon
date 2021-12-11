import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioModelo } from 'src/app/modelos/servicio.model';
import { UsuarioModelo } from 'src/app/modelos/usuario.model';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  listadoClientes: UsuarioModelo[] = []
  listadoEncomiendas: UsuarioModelo[] = []

  fgValidacion = this.fb.group({
    origen: ['', [Validators.required]],
    destino: ['', [Validators.required]],
    encomienda: ['', [Validators.required]],
    valor: ['', [Validators.required]],
  });

  constructor(
    private servicioService: ServicioService,
    private clienteService: UsuarioService,
    private encomiendaService: UsuarioService,
    private fb: FormBuilder,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getAllClientes();
    this.getAllEncomiendas();
  }

  store(){
    let servicio = new ServicioModelo();
    servicio.origen = this.fgValidacion.controls["origen"].value;
    servicio.destino = this.fgValidacion.controls["destino"].value;
    servicio.encomienda = this.fgValidacion.controls["encomienda"].value;
    servicio.fecha = '2021-12-11T20:41:17.521Z';
    servicio.hora = '2021-12-11T20:41:17.521Z';
    servicio.valor = this.fgValidacion.controls["valor"].value;
 
    this.servicioService.store(servicio).subscribe((data: ServicioModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/servicios/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
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
