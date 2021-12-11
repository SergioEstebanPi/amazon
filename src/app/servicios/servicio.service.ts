import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicioModelo } from '../modelos/servicio.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  url = "http://localhost:3000"
  token: string = ''

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {
      this.token = this.seguridadService.getToken();
  }

  store(servicio: ServicioModelo): Observable<ServicioModelo> {
    return this.http.post<ServicioModelo>(`${this.url}/servicios`, {
      origen: servicio.origen,
      destino: servicio.destino,
      encomienda: servicio.encomienda,
      fecha: servicio.fecha,
      hora: servicio.hora,
      valor: servicio.valor
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  getAll(): Observable<ServicioModelo[]>{
    return this.http.get<ServicioModelo[]>(`${this.url}/servicios`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(servicio: ServicioModelo): Observable<ServicioModelo> {
    return this.http.patch<ServicioModelo>(`${this.url}/servicios/${servicio.id}`, {
      origen: servicio.origen,
      destino: servicio.destino,
      encomienda: servicio.encomienda,
      fecha: servicio.fecha,
      hora: servicio.hora,
      valor: servicio.valor
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  delete(id: string): Observable<ServicioModelo[]>{
    return this.http.delete<ServicioModelo[]>(`${this.url}/servicios/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<ServicioModelo>{
    return this.http.get<ServicioModelo>(`${this.url}/servicios/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }
}
