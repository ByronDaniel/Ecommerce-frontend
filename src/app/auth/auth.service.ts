import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from "../models/Login";
import { environment } from 'src/environments/environment';
import { TokenDto } from "../models/TokenDto";
import { Router } from "@angular/router";
import { catchError } from "rxjs";
import Swal from "sweetalert2";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    API_URL: string = environment.API_URL;
    token! : TokenDto;
    constructor(private http: HttpClient, private router: Router, public jwtHelper: JwtHelperService) {

    }

    login(loginBody: Login) {
        return this.http.post(`${this.API_URL}Token`, loginBody)
        .subscribe(res=>{
            this.token = res as TokenDto;
            this.setSession(this.token.token);
        });
    }
          
    private setSession(authResult: any) {
        localStorage.setItem('id_token', authResult);
        this.router.navigate(['/products']);
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