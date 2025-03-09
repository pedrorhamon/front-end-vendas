import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentoAssinadoService {

  private baseUrl = 'http://localhost:8080/api/usuarios';

  constructor(
    private http: HttpClient
  ) { }

  assinarDocumento(userId: number, documento: File) {
    const formData = new FormData();
    formData.append('file', documento);

    return this.http.post(`${this.baseUrl}/${userId}/assinar-documento`, formData, { responseType: 'text' });
  }

  listarDocumentosAssinados(userId: number) {
    return this.http.get(`${this.baseUrl}/${userId}/documentos`);
  }

  baixarDocumentoAssinado(documentoId: number) {
    return this.http.get(`${this.baseUrl}/documento`, { responseType: 'blob' });
  }
}
