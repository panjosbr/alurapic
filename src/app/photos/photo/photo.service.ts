import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Photo } from "./photo";
import { PhotoComment } from './photo-comment';
import { map, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

import { environment } from "../../../environments/environment";

const API = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class PhotoService {

  constructor(private http: HttpClient) {}

  listFromUser(userName: string) {
    return this.http
      .get<Photo[]>(API + '/' + userName + '/photos');
  }

  listFromUserPaginated(userName: string, page: number) {
    const params = new HttpParams()
        .append('page', page.toString());

    return this.http
      .get<Photo[]>(API + '/' + userName + '/photosx', { params });
  }

  upload(description: string, allowComments: boolean, file: File) {

    const formData = new FormData();

    formData.append('description', description);
    formData.append('allowComments', allowComments ? 'true' : 'false');
    formData.append('imageFile', file);

    return this.http.post(
      API + '/photos/upload',
      formData,
      {
        observe: 'events',
        reportProgress: true,
      }
    );
  }

  findById(photoId: number) {
    const url = `${API}/photos/${photoId}`;

    return this.http.get<Photo>(url);
  }

  getComments(photoId: number) {
    const url = `${API}/photos/${photoId}/comments`;

    return this.http.get<PhotoComment[]>(url);
  }

  addComment(photoId: number, commentText: string) {
    const url = `${API}/photos/${photoId}/comments`;

    return this.http.post(
      url,
      { commentText },
    );
  }

  removePhoto(photoId: number) {
    const url = `${API}/photos/${photoId}`;

    return this.http.delete(url);
  }

  like(photoId: number) {
    const url = `${API}/photos/${photoId}/like`;
    return this.http.post(
      url, {}, {observe: 'response'}
    )
    .pipe(map(res => true))
    .pipe(catchError(err => {
      return err.status == '304' ? of(false) : throwError(err);
    }))
  }
}
