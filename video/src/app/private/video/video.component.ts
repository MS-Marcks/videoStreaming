import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationToast } from 'src/app/model/configurationToast/configuration-toast';
import { VideoService } from 'src/app/service/video/video.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  configuration = new ConfigurationToast();
  dataSource: any;
  urlBasePreload = environment.urlBasePreload;
  urlBaseEmission = environment.urlBaseEmission;
  constructor(
    private toastr: ToastrService,
    private service: VideoService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.VideoGetAll();
  }

  VideoGetAll(): void {
    this.service.getUniqueVideo(localStorage.getItem("_idVideo") + "").subscribe(
      (res) => {
        this.dataSource = res;
        console.log(res)
      }, (err) => {
        if (err.status === 0) {
          this.OnToast('No se pudo Conectar con el servidor', 500);
        }
      }
    );
  }

  RedirectVideo(id: number): void {
    localStorage.setItem("_idVide", id + "");
    this.router.navigate(["video/" + id])
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