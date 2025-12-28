import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Folder } from './folder.models';
import { Observable } from 'rxjs';

const API_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:RaqAbOVN/folder';
@Injectable({ providedIn: 'root' })
export class FoldersApiService {
  private http = inject(HttpClient);

  getFolders(): Observable<Folder[]> {
    return this.http.get<Folder[]>(API_URL);
  }
    createFolder(title: string): Observable<Folder> {
    return this.http.post<Folder>(`https://x8ki-letl-twmt.n7.xano.io/api:RaqAbOVN/folder`, { title });
  }
  
}
