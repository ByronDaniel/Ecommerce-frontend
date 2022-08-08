import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from "../models/Login";
import { environment } from 'src/environments/environment';
import { TokenDto } from "../models/TokenDto";
import { Router } from "@angular/router";
import { catchError } from "rxjs";
import Swal from "sweetalert2";
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoaderService } from "../services/loader.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    API_URL: string = environment.API_URL;
    token! : TokenDto;
    constructor(private http: HttpClient, private router: Router, public jwtHelper: JwtHelperService, private loaderService: LoaderService) {

    }

    login(loginBody: Login, rol: string) {
        this.loaderService.loaderState();
        return this.http.post(`${this.API_URL}Token`, loginBody)
        .subscribe(res=>{
            this.token = res as TokenDto;
            this.setSession(this.token.token);
            if(rol == 'user'){
                this.router.navigate(['/ecommerce/products']);
            }else if(rol == 'admin'){
                this.router.navigate(['/admin/products']);
            }
            this.loaderService.loaderState(false);
        });
    }
          
    private setSession(authResult: any) {
        localStorage.setItem('id_token', authResult);
    }          

    logout() {
        localStorage.removeItem("id_token");
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('id_token');
        return !this.jwtHelper.isTokenExpired(token!);
    }
}