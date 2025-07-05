import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from './src/lib/+state/materials/material.model';
export interface MaterialApi {
  id: number;
  title: string;
  material_linkk: string;
  folder_id: number;
  createdAt?: string;
  
}

@Injectable({ providedIn: 'root' })
export class MaterialsApiService {
  private readonly apiUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:RaqAbOVN';

  constructor(private http: HttpClient) {}

getMaterialsByFolder(folderId: number): Observable<MaterialApi[]> {
  return this.http.get<MaterialApi[]>(
    `${this.apiUrl}/material?folder_id=${folderId}`
  );
}
  createMaterial(folderId: number, materialData: Omit<Material, 'id'>): Observable<Material> {
    return this.http.post<Material>(
      `${this.apiUrl}/folder/${folderId}/materials`,
      materialData
    );
  }

  deleteMaterial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/material/${id}`);
  }
}