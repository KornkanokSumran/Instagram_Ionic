import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadingService {

  DJANGO_API_SERVER: string = "http://localhost:8000";
  constructor(private http: HttpClient) { }

  public uploadFormData(formData) {
    return this.http.post<any>(`${this.DJANGO_API_SERVER}/upload/`, formData);
  }

  public count_like(formData) {
    return this.http.post<any>(`${this.DJANGO_API_SERVER}/upload/count/`, formData);
  }

  public post_comment(formData) {
    return this.http.post<any>(`${this.DJANGO_API_SERVER}/upload/comment/`, formData);
  }
}