import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService {

  private baseUrl = 'http://localhost:8080/api/permissoes';

  constructor(private http: HttpClient) { }
}
