import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationToast } from 'src/app/model/configurationToast/configuration-toast';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  session = {
    userSystem: '',
    password: ''
  };
  configuration = new ConfigurationToast();
  constructor(
    private toastr: ToastrService,
    private service: LoginService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (this.service.logein()) {
      this.router.navigate(['dashboard']);
    }
  }

  onSubmit(): void {
    this.service.login(this.session).subscribe(
      (res) => {
        if (res.code === 200) {
          localStorage.setItem('token', res.message.token);
          this.router.navigate(['dashboard']);
        } else {
          this.OnToast(res.message, res.code);
        }
      }, (err) => {
        if (err.status === 0) {
          this.OnToast('No se pudo Conectar con el servidor', 500);
        }
      }
    );
  }
  OnToast(m: string, code: number): void {
    if (code === 200) {
      this.toastr.success(m, 'Notificacion', this.configuration.array);
    } else if (code === 404) {
      this.toastr.warning(m, 'Advertencia', this.configuration.array);
    } else if (code === 500) {
      this.toastr.error(m, 'Error', this.configuration.array);
    }
  }
}