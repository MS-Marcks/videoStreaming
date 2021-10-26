import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationToast } from 'src/app/model/configurationToast/configuration-toast';
import { VideoService } from 'src/app/service/video/video.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @ViewChild('poster', { static: true }) poster: ElementRef | any;
  @ViewChild('video', { static: true }) video: ElementRef | any;
  @ViewChild('barloading', { static: true }) barloading: ElementRef | any;



  formPoster: FormData = new FormData();
  formVideo: FormData = new FormData();
  title: string = "";
  percentaje: string = "0%";
  configuration = new ConfigurationToast();
  constructor(private toastr: ToastrService, private service: VideoService) { }

  ngOnInit(): void {
  }

  onLoadPost(e: any): void {
    if (e.target.files && e.target.files[0]) {
      this.formPoster.delete("poster");
      this.formPoster.append("poster", e.target.files[0], e.target.files[0].name);
      let reader = new FileReader();
      reader.onload = (ei: any) => {
        const data: any = ei.target.result;
        this.poster.nativeElement.src = data;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  onVideoPost(e: any): void {
    if (e.target.files && e.target.files[0]) {
      this.formVideo.delete("video");
      this.formVideo.append("video", e.target.files[0], e.target.files[0].name);
      let reader = new FileReader();
      reader.onload = (ei: any) => {
        const data: any = ei.target.result;
        this.video.nativeElement.src = data;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  onUpload(): void {
    let uploadFile = false;
    let idVideo = "";
    if (this.formPoster.get("poster") && this.formVideo.get("video") && this.title !== "") {
      this.percentaje = "0%";
      this.service.uploadPoster(this.formPoster).subscribe(
        (res) => {
          if (res.type === 1) {
            this.percentaje = ((res.loaded * 100) / res.total).toFixed(0) + "%";
            this.barloading.nativeElement.style.width = this.percentaje;
            if (res.loaded === res.total) {
              uploadFile = true;
            }
          } else {
            if (res.body !== undefined) {
              idVideo = res.body;
            }
          }
          if (uploadFile && idVideo !== "") {
            this.uploadVideo(idVideo)
          }
        }, (err) => {
          if (err.status === 0) {
            this.OnToast('No se pudo Conectar con el servidor', 500);
          }
        }
      );
    } else {
      this.OnToast("Debes de rellenar todos lo campos", 500);
    }
  }

  uploadVideo(id: any): void {
    this.percentaje = "0%";
    this.formVideo.delete("title");
    this.formVideo.delete("idVideo");
    this.formVideo.append("title", this.title);
    this.formVideo.append("idVideo", id + "");
    this.service.uploadVideo(this.formVideo).subscribe(
      (res) => {
        if (res.type === 1) {
          this.percentaje = ((res.loaded * 100) / res.total).toFixed(0) + "%";
          this.barloading.nativeElement.style.width = this.percentaje;
        } else {
          if (res.body !== undefined) {
            if (res.body === "OK") {
              this.OnToast("SE SUBIO EL VIDEO EXTOSAMENTE", 200);
              this.onReset()
            }
          }
        }
      }, (err) => {
        if (err.status === 0) {
          this.OnToast('No se pudo Conectar con el servidor', 500);
        }
      }
    );
  }

  onReset(): void {
    this.title = "";
    this.formPoster = new FormData();
    this.formVideo = new FormData();
    this.video.nativeElement.src = "";
    this.poster.nativeElement.src = "";
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