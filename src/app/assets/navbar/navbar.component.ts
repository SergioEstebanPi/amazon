import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioModelo } from 'src/app/modelos/usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  activeSession:boolean = false;
  subs: Subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {

  }

}
