// // export class AuthService{
// //     checkLogin( userName: string, password: string){
// //                 if(userName==='ranjith' && password==='pass'){
// //                     return true;
// //                 }
// //                 return false;
// //     }
// // }

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient,
    public jwtHelper: JwtHelperService) {}

  checkLogin(username: string, password: string) {
    const API_URL = environment.apiUrl;
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };

    return this.http.post<any>(
      API_URL + "/api/login",
      { name: username, password: password },
      options
    );
  }

  getUserData(token) {
    const API_URL = environment.apiUrl;
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + token
    });
    let options = { headers: headers };

    return this.http.get<any>(API_URL + "/api/user", options);
  }

  checkUserRole(id, token) {
    const API_URL = environment.apiUrl;
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + token
    });
    let options = { headers: headers };

    return this.http.get<any>(API_URL + "/api/get-user-roles/" + id, options);
  }

  /** check permission of the logged in user
   * created on 14/04/2020
   * by siva chandru
   * params: token , roles*/
  checkPermission(token, id) {
    const API_URL = environment.apiUrl;
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + token
    });
    let options = { headers: headers };

    return this.http.get<any>(
      API_URL + "/api/permission/"+ id, options);
  }

  isLoggedIn(): boolean { 
    let token = null;
    if(localStorage.getItem('login') != null){
      let login = JSON.parse(localStorage.getItem('login'));
      token = login["token"];
    }
      return !this.jwtHelper.isTokenExpired(token);
  }
}
