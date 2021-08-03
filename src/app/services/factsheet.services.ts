import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()

export class FactSheetService {


  constructor(private http: HttpClient) {  }

  /** Get the states from the datavbase
   * created on 25/01/2020
   * by siva chandru*/
  getState(token)
  {
    const API_URL = environment.apiUrl;
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept' : 'application/json',
    'Authorization': 'Bearer' + token
  });
  const options = { headers: headers } 

  return this.http.get<any>(API_URL + '/api/factsheet/getState', options );
  }

  /** Get the towns from the datavbase
   * created on 25/01/2020
   * by siva chandru*/
  getTowns(token)
  {
    const API_URL = environment.apiUrl;
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept' : 'application/json',
    'Authorization': 'Bearer' + token
  });
  const options = { headers: headers } 

  return this.http.get<any>(API_URL + '/api/factsheet/getTown', options );
  }

    /** Add new factsheet database
   * created on 30/01/2020
   * by siva chandru*/

   factSheetAdd(joineeDetails, token) {
    const API_URL = environment.apiUrl;
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization': 'Bearer' + token
    });
    const options = { headers: headers }
  
    return this.http.post<any>(API_URL + '/api/factsheet/add', { joineeDetails }, options);
  }


}
