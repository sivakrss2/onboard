import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export class AdminService {
  constructor(private http: HttpClient) {}

/** Get the permissions from the database
   * created on 27/04/2020
   * by siva chandru
   * params: token */

  getPermissions(token) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept' : 'application/json',
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };
    return this.http.get<any>(
      API_URL + "/api/get-permissions",
      options
    );
  }

  /** Get the roles from the database
   * created on 27/04/2020
   * by siva chandru
   * params: token */

  getRoles(token) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept' : 'application/json',
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };
    return this.http.get<any>(
      API_URL + "/api/roles",
      options
    );
  }

  /** Get the Users from the database
   * created on 27/04/2020
   * by siva chandru
   * params: token */

  getUsers(token) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept' : 'application/json',
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };
    return this.http.get<any>(
      API_URL + "/api/users",
      options 
    );
  }

   /** Get the User Roles from the database
   * created on 27/04/2020
   * by siva chandru
   * params: token */

  getUserRoles(token) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept' : 'application/json',
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };
    return this.http.get<any>(
      API_URL + "/api/get-user-roles",
      options 
    );
  }

     /** Get the particular User Roles from the database
   * created on 04/06/2020
   * by siva chandru
   * params: token */

  getParticularUserRoles(token, id) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept' : 'application/json',
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };
    return this.http.get<any>(
      API_URL + "/api/get-particular-user-roles/"+ id,
      options 
    );
  }

     /** Get the particular Designation from the database
   * created on 04/06/2020
   * by siva chandru
   * params: token */

  getParticularDesignation(token, id) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept' : 'application/json',
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };
    return this.http.get<any>(
      API_URL + "/api/get-particular-designation/"+ id,
      options 
    );
  }

  /** Add new Designation roles to the database
   * created on 29/05/2020
   * by siva chandru*/

  addDesignation(token, details) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };
    return this.http.post<any>(
      API_URL + "/api/add-designation",
      details,
      options
    );
  }

  /** update user roles to the database
   * created on 29/05/2020
   * by siva chandru*/

  updateDesignation(token, details) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };
    return this.http.post<any>(
      API_URL + "/api/update-designation",
      details,
      options
    );
  }

  
  
  /** Add new user roles to the database
   * created on 29/05/2020
   * by siva chandru*/

  addUserRoles(token, details) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };
    return this.http.post<any>(
      API_URL + "/api/add-user-role",
      details,
      options
    );
  }

  /** update user roles to the database
   * created on 29/05/2020
   * by siva chandru*/

  updateUserRoles(token, details) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };
    return this.http.post<any>(
      API_URL + "/api/update-user-role",
      details,
      options
    );
  }

  /** Delete user role from database
   * created on 10/06/2020
   * by siva chandru*/
  deleteUserRole(id, token) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.post<any>(
      API_URL + "/api/delete-user-role",
      id,
      options
    );
  }

  
  /** Add new role permission to the database
   * created on 11/06/2020
   * by siva chandru*/

  addRolePermission(token, details) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };
    return this.http.post<any>(
      API_URL + "/api/add-role-permission",
      details,
      options
    );
  }

    /** update role permission to the database
   * created on 10/06/2020
   * by siva chandru*/

  updateRolePermission(token, details) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };
    return this.http.post<any>(
      API_URL + "/api/update-role-permission",
      details,
      options
    );
  }

   /**Get particular role permission from the database
   * created on 11/06/2020
   * by siva chandru*/

  getParticularRolePermission(token, id) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };
    return this.http.get<any>(
      API_URL + "/api/get-role-permissions/" + id,
      options
    );
  }
  
   /** Get the details of department from the database
   * created on 23/07/2020
   * by siva chandru*/

  public getDepartmentDetails(token){
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.get<any>(API_URL + "/api/get-departments", options);
  }

   /** Get the details of designation from the database
   * created on 27/11/2020
   * by siva chandru*/

  public getDesignationDetails(token){
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.get<any>(API_URL + "/api/get-designation", options);
  }
  
  getDepartmentDesignation(token) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };
    return this.http.get<any>(
      API_URL + "/api/get-department-designation",
      options
    );
  }

  /** Get the details of department not on department_designation from the database
   * created on 01/12/2020
   * by siva chandru*/

  public manageDepartmentDetails(token){
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.get<any>(API_URL + "/api/manage-departments", options);
  }

  /** Get the particular details department_designation from the database
   * created on 01/12/2020
   * by siva chandru*/

  public particularDepartmentDesignationDetails(token, id){
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.get<any>(API_URL + "/api/particular-department-designation/" +id, options);
  }

  /** Add new Department-Designation to the database
   * created on 01/12/2020
   * by siva chandru*/

  addDepartmentDesignation(token, details) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };
    return this.http.post<any>(
      API_URL + "/api/add-department-designation",
      details,
      options
    );
  }

  /** Update new Department-Designation to the database
   * created on 01/12/2020
   * by siva chandru*/

  updateDepartmentDesignation(token, details) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };
    return this.http.post<any>(
      API_URL + "/api/update-department-designation",
      details,
      options
    );
  }

}