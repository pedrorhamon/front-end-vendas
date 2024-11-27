import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubPermissaoService {

  private baseUrl = 'http://localhost:8080/api/sub-permissoes';

  constructor(private http: HttpClient) { }
}
