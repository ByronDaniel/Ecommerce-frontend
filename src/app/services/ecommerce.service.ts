import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root',
})
export class EcommerceService {
  API_URL: string = environment.API_URL;
  token: string = '';
  constructor(private httpClient: HttpClient, private router: Router) {}

  get(url: string, params = new HttpParams()) {
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('id_token')!}`
    );
    url = this.API_URL + url;
    return this.httpClient
      .get(url, { params, headers })
      .pipe(catchError(async (error) => await this.errorHandler(error)));
  }

  post(url: string, data?: any, params = new HttpParams()) {
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('id_token')!}`
    );
    url = this.API_URL + url;
    return this.httpClient
      .post(url, data, { params, headers })
      .pipe(catchError(async (error) => await this.errorHandler(error)));
  }

  put(url: string, data?: any, params = new HttpParams()) {
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('id_token')!}`
    );
    url = this.API_URL + url;
    return this.httpClient
      .put(url, data, { params, headers })
      .pipe(catchError(async (error) => await this.errorHandler(error)));
  }

  delete(url: string, params = new HttpParams()) {
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('id_token')!}`
    );
    url = this.API_URL + url;
    return this.httpClient
      .delete(url, { params, headers })
      .pipe(catchError(async (error) => await this.errorHandler(error)));
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.status == 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: `Error en la conexion del servidor`,
      });
    } else if (error.status == 401) {
      this.router.navigate(['/login']);
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `Status: ${error.status}`,
        text: `${error}`,
      });
    }
  }
}
