import { Injectable, Type } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class JoineeService {
  constructor(private http: HttpClient) {}

  
  /** move candidate to onoard
   * created on 25/01/2020
   * by siva chandru*/

  moveOnboard(details, token) {
    // return token;
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.post<any>(
      API_URL + "/api/moveOnboard",
      details,
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
   * created on 23/07/2020
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

  /** Add new joinee to the database
   * created on 18/01/2020
   * by siva chandru
   * params: token , new joinee details*/

  addJoinee(token, details) {
    console.log("get_details", details);
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };
    return this.http.post<any>(
      API_URL + "/api/candidates/add",
      details,
      options
    );
  }

  /** Get the details from the database
   * created on 18/01/2020
   * by siva chandru*/

  public getDetails(token){
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.get<any>(API_URL + "/api/candidates", options);
  }

  /** Get the getcanditateDetails from the database
   * created on 24/01/2020
   * by siva chandru*/

  getcanditateDetails(token, id) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };
    let response = this.http.get<any>(
      API_URL + "/api/candidates/" + id,
      options
    );
    return response;
  }

  /** updatecanditateDetails in the database
   * created on 25/01/2020
   * by siva chandru*/

  updatecanditateDetails(id, token, details) {
    // return token;
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.post<any>(
      API_URL + "/api/candidates/" + id + "/update",
      details,
      options
    );
  }

  /** update candidate lead Details in the database
   * created on 10/06/2020
   * by siva chandru*/

  updateCanditateLeadDetails(id, token, details) {
    // return token;
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.post<any>(
      API_URL + "/api/candidates/" + id + "/update-detail",
      details,
      options
    );
  }

   /** update candidate System Requirements in the database
   * created on 10/06/2020
   * by siva chandru*/

  updateCanditateSysReqDetails(id, token, details) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.post<any>(
      API_URL + "/api/candidates/" + id + "/update-sysReq-detail",
      details,
      options
    );
  }

    /** updatecanditateOnboarding in the database
   * created on 24/08/2020
   * by siva chandru*/

  updatecanditateOnboarding(id, token) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.post<any>(
      API_URL + "/api/candidates/" + id + "/updateOnboarding",
      id,
      options
    );
  }

  /** Add joinee Document Details to the database
   * created on 12/06/2020
   * by siva chandru*/
  addDocument(token, formdata: FormData, id) {
    const API_URL = environment.apiUrl;

    let headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });

    const options = { headers: headers };

    return this.http.post<any>(
      API_URL + "/api/candidates/" + id + "/professional-documents/add",
      formdata,
      options
    );
  }

  
  /** Update document task to the database
   * created on 19/06/2020
   * by siva chandru*/

  updateDocument(token, formdata: FormData, id) {
    console.log(formdata);
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };
    return this.http.post<any>(
      API_URL + "/api/candidates/" + id +"/professional-documents/update",
      formdata,
      options
    );
  }

  /** Delete document from database
   * created on 12/03/2020
   * by siva chandru*/
  deleteDocument(token, id, formData) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.post<any>(
      API_URL + "/api/candidates/" + id + "/professional-documents/delete",
      formData,
      options
    );
  }

  /** Get the towns from the database
   * created on 29/01/2020
   * by siva chandru*/
  getDocument(token, id) {
    const API_URL = environment.apiUrl;

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.get<any>(
      API_URL + "/api/candidates/" + id + "/professional-documents",
      options
    );
  }

  /** Get the document titles from the database
   * created on 10/03/2020
   * by siva chandru*/
  getDocumentTitle(token) {
    const API_URL = environment.apiUrl;

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.get<any>(API_URL + "/api/document_titles", options);
  }

  /** Get the leads from the database
   * created on 21/02/2020
   * by siva chandru*/
  getLeads(token) {
    const API_URL = environment.apiUrl;

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.get<any>(API_URL + "/api/leads", options);
  }

  /** Get the leads from the database
   * created on 24/02/2020
   * by siva chandru*/
  GetRequirement(token) {
    const API_URL = environment.apiUrl;

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.get<any>(API_URL + "/api/requirement", options);
  }

  /** Add new techinical task to the database
   * created on 29/05/2020
   * by siva chandru*/

  addTechinicalTask(token, formdata: FormData, id) {
    console.log(formdata);
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };
    return this.http.post<any>(
      API_URL + "/api/candidates/" + id + "/techinical-task",
      formdata,
      options
    );
  }

  /** UPdate techinical task to the database
   * created on 02/06/2020
   * by siva chandru*/

  updateTechinicalTask(token, formdata: FormData, id) {
    console.log(formdata);
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };
    return this.http.post<any>(
      API_URL + "/api/candidates/" + id +"/techinical-task/update",
      formdata,
      options
    );
  }

  /** Get the techinical task details from the database
   * created on 1/06/2020
   * by siva chandru*/
  getTechDocument(token, id) {
    const API_URL = environment.apiUrl;

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.get<any>(
      API_URL + "/api/candidates/" + id + "/get-techinical-task",
      options
    );
  }

  /** Delete techinical details from database
   * created on 06/01/2020
   * by siva chandru*/
  deleteTechDetails(token, id, formData) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.post<any>(
      API_URL + "/api/candidates/" + id + "/techinical-task/delete",
      formData,
      options
    );
  }

  /** Delete All joinee Doc details from database
   * created on 17/06/2020
   * by siva chandru*/
  deleteAllJoineeDoc(token, id, formData) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.post<any>(
      API_URL + "/api/candidates/" + id + "/professional-documents/deleteall",
      formData,
      options
    );
  }

  /** Delete Particular joinee Doc details from database
   * created on 17/06/2020
   * by siva chandru*/
  deleteParticularJoineeDoc(token, id, formData) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.post<any>(
      API_URL + "/api/candidates/" + id + "/professional-documents/deletesingle",
      formData,
      options
    );
  }

  /** Get the techinical task details from the database
   * created on 18/06/2020
   * by siva chandru*/
  getParticularJoineehDocument(token, id) {
    const API_URL = environment.apiUrl;

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.get<any>(
      API_URL + "/api/candidates/" + id + "/professional-documents/getDetails",
      options
    );
  }

  /** Download the Document from the database
   * created on 19/06/2020
   * by siva chandru*/
  downloadParticularDoc(token, id) {
    const API_URL = environment.apiUrl;

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return top.location.href = API_URL + "/api/candidates/" + id + "/professional-documents/download";
  }

  /** Download the Resume from the database
   * created on 07/06/2020
   * by siva chandru*/
  downloadResume(token, id) {
    const API_URL = environment.apiUrl;

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return top.location.href = API_URL + "/api/downloadresume/" + id;
  }

  /** Get the month count details from the database
   * created on 25/06/2020
   * by siva chandru*/
  getMonthCountDetails(token) {
    const API_URL = environment.apiUrl;

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.get<any>(
      API_URL + "/api/candidates-monthcount",
      options
    );
  }

  /** Get the count of candidates details from the database
   * created on 26/06/2020
   * by siva chandru*/
  getCandidatesCountDetails(token) {
    const API_URL = environment.apiUrl;

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + token
    });
    const options = { headers: headers };

    return this.http.get<any>(
      API_URL + "/api/candidates-count",
      options
    );
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

  /** Download joinee document
   * created on 20/02/2021
   * by siva chandru*/
  downloadCandidateDoc(token, id) {
    console.log('token', token);
    console.log('id', id);
    
    const API_URL = environment.apiUrl;
    
    let headers = new HttpHeaders({
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer" + token
    });
    const options = { headers: headers };
    
    return top.location.href = API_URL + "/api/joineepersonaldocdownload/" + id;
  }

  /** Get joinee details
   * created on 20/02/2021
   * by siva chandru*/
    getJoineeInfoDetails(guid) {
      const API_URL = environment.apiUrl;
      let headers = new HttpHeaders({
      "Content-Type": "application/json"
      });
      let options = { headers: headers };
      
      return this.http.get<any>(
      API_URL + "/api/joineedetail/"+ guid,
      options
      );
    }

    // get failed mails for listing 
    // created on 03/05/2021 
    // by Gowtham Raj
    getFailedMails(token, joineeId){
      const API_URL = environment.apiUrl;
      let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + token
      });
      let options = { headers: headers };
      
      return this.http.get<any>(
      API_URL + "/api/get-failed-mail/"+ joineeId,
      options
      );
    }

    
    // Re-Send failed mails
    //created on 03-05-2021
    //by Gowtham Raj
    sendFailedMails(token) {
      var formData = null;
      const API_URL = environment.apiUrl;
      const headers = new HttpHeaders({
        Authorization: "Bearer" + token
      });
      const options = { headers: headers };
  
      return this.http.post<any>(
        API_URL + "/api/resend-mail",
        formData,
        options
      );
    }
}
