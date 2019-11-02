import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { promise } from 'protractor';
import { resolve } from 'url';
//import { normalizeURL } from 'ionic-angular';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};
const httpOptionsForMedia = {
  headers: new HttpHeaders(
    {
      'enctype': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA'
    }
  )
};
const apiUrlLocal = "http://localhost:8080/";
const apiUrlExternal1 = "";
@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }


  // API for post data local
  postDataLocal(data, route): Observable<any> {
    const url = `${apiUrlLocal}${route}`;
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  getDataLocal(route): Observable<any> {
    const url = `${route}`;
    return this.http.get(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  // API for post data external
  postDataExternal(data, route): Observable<any> {
    const url = `${apiUrlExternal1}${route}`;
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // API for post data external for image
  postDataExternalMedia(data, route): Observable<any> {
    const url = `${apiUrlExternal1}${route}`;
    return this.http.post(url, data, httpOptionsForMedia)
      .pipe(
        catchError(this.handleError)
      );
  }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  //API for getprincipalmemories
  getMemories() {


    let postData = {
      "idUser": "1",
    }
    return new Promise(resolve => {
      this.http.post(apiUrlExternal1 + 'getPrincipalMemories', postData).subscribe(data => {
        resolve(data)
      }, err => {
        console.log(err)
      })
    })
  }
}
