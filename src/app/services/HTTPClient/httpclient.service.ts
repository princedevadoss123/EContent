import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HTTPClientService {

  constructor(private http: HttpClient) { }

   requestPayload(content) {
    let body = new URLSearchParams();
    for( let key in content) {
      if(content.hasOwnProperty(key)) {
        body.set(key, content[key]);
      }
    }
    return body;
  }

  register(content) {
    let bodyContent = this.requestPayload(content);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post('/app/api/register', bodyContent.toString(), options );
  }

}
