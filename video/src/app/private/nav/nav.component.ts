import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private service: LoginService,private routes:Router) { }

  ngOnInit(): void {
  }

  onLogout():void{
    this.service.loginOut();
    this.routes.navigate(["/"]);
  }

}
