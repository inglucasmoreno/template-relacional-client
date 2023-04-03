import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  // Usuario por ID
  getUsuario(id: number): Observable<any> {
    return this.http.get(`${base_url}/usuarios/${id}`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }).pipe(
      map((resp: any) => resp.usuario)
    )
  }

  // Listar usuarios
  listarUsuarios({direccion = 'ASC', columna = 'apellido'}): Observable<any> {
    return this.http.get(`${base_url}/usuarios`, {
      params: {
        direccion: String(direccion),
        columna
      },
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
  }

  // Nuevo usuario
  nuevoUsuario(data: any): Observable<any> {
    return this.http.post(`${base_url}/usuarios`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
  }

  // Actualizar usuario
  actualizarUsuario(id: number, data: any): Observable<any> {
    return this.http.patch(`${base_url}/usuarios/${id}`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
  }

  // Actualizar password
  actualizarPasswordPerfil(id: number, data: any): Observable<any> {
    console.log(data);
    return this.http.patch(`${base_url}/usuarios/password/${id}`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
  }

}
