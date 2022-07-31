import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Error } from '../models/Error';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class EcommerceService {
  API_URL: string = environment.API_URL;
  constructor(private httpClient: HttpClient) { }

  get(url: string, params = new HttpParams()) {
    url = this.API_URL + url;
    return this.httpClient.get(url, {params})
    .pipe(catchError( async error => await this.errorHandler(error)));
  }
  
  post(url: string, data?: any, params = new HttpParams()) {
    url = this.API_URL + url;
    return this.httpClient.post(url, data, {params})
    .pipe(catchError( async error => await this.errorHandler(error)));
  }
  
  put(url: string, data?: any, params = new HttpParams()) {
    url = this.API_URL + url;
    return this.httpClient.put(url, data, {params})
    .pipe(catchError( async error => await this.errorHandler(error)));
  }

  delete(url: string, params = new HttpParams()) {
    url = this.API_URL + url;
    return this.httpClient.delete(url, {params})
    .pipe(catchError( async error => await this.errorHandler(error)));
  }

  errorHandler(error: HttpErrorResponse) {
    let errorResponse = error.error.errors;
    if(errorResponse){
      let errors : string[] = [];
      Object.keys(errorResponse).forEach(e=>{
        errors.push(errorResponse[e][0]);
      })
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `Status: ${error.status}`,
        text:`${error.error.title} ${errors}`,
      });
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `Status: ${error.status}`,
        text: `${error.message}`
      });
    }
  }
}
