import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioModelo } from 'src/app/modelos/servicio.model';
import { UsuarioModelo } from 'src/app/modelos/usuario.model';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  listadoClientes: UsuarioModelo[] = []
  listadoEncomiendas: UsuarioModelo[] = []

  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    origen: ['', [Validators.required]],
    destino: ['', [Validators.required]],
    encomienda: ['', [Validators.required]],
    valor: ['', [Validators.required]],
  });

  id: string=''

  constructor(private fb: FormBuilder,
    private servicioService: ServicioService,
    private router: Router,
    private route: ActivatedRoute,
    private clienteService: UsuarioService,
    private encomiendaService: UsuarioService,
    ) {

    }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);

    this.getAllClientes();
    this.getAllEncomiendas();
  }

  buscarRegistro(id: string){
    this.servicioService.getWithId(id).subscribe((data: ServicioModelo) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["origen"].setValue(data.origen)
      this.fgValidacion.controls["destino"].setValue(data.destino)
      this.fgValidacion.controls["encomienda"].setValue(data.encomienda)
      this.fgValidacion.controls["valor"].setValue(data.valor)
    })
  }

  edit(){
    let servicio = new ServicioModelo();
    servicio.id = this.fgValidacion.controls["id"].value;
    servicio.origen = this.fgValidacion.controls["origen"].value;
    servicio.destino = this.fgValidacion.controls["destino"].value;
    servicio.encomienda = this.fgValidacion.controls["encomienda"].value;
    servicio.fecha = '2021-12-11T20:41:17.521Z';
    servicio.hora = '2021-12-11T20:41:17.521Z';
    servicio.valor = this.fgValidacion.controls["valor"].value;
 
    this.servicioService.update(servicio).subscribe((data: ServicioModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
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
