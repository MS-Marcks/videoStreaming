import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private urlBase = environment.urlBase + 'video';

  constructor(private http: HttpClient) { }

  getAllVideo(): Observable<any> {
    return this.http.get<any>(this.urlBase);
  }
  getUniqueVideo(id: string): Observable<any> {
    return this.http.get<any>(this.urlBase + "/" + id);
  }
  uploadPoster(item: any): Observable<any> {
    return this.http
      .post(this.urlBase + "/upload/poster", item, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(catchError(this.errorMgmt));
  }

  uploadVideo(item: any): Observable<any> {
    return this.http
      .post(this.urlBase + "/upload/video", item, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(catchError(this.errorMgmt));
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}