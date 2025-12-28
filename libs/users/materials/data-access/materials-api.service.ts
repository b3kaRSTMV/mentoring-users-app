import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Material } from './src/lib/+state/materials/material.model';
interface MaterialApi {
  id: number;
  title: string;
  folder_id: number;
  material_link?: string;
  material_linkk?: string;
  url?: string;
  type?: 'video'|'pdf'|'audio';
  created_at?: number | string;
}

// Что шлём на создание (DTO для бэка)
interface CreateMaterialDto {
  folder_id: number;
  title: string;
  material_link: string; // если у тебя в Swagger material_linkk — переименуй здесь
  type?: 'video'|'pdf'|'audio';
}

function apiToMaterial(m: MaterialApi): Material {
  return {
    id: m.id,
    title: m.title,
    url: m.material_link ?? m.material_linkk ?? m.url ?? '', // ← фолбэки
    folderId: m.folder_id ?? m.folder_id,
    createdAt: m.created_at ?? m.created_at ?? null,
  };
}

@Injectable({ providedIn: 'root' })
export class MaterialsApiService {
  private readonly apiUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:RaqAbOVN';

  constructor(private http: HttpClient) {}


getMaterialsByFolder(folderId: number): Observable<Material[]> {
  return this.http
    .get<any[]>(`${this.apiUrl}/material?folder_id=${folderId}`)
    .pipe(
      // если бэк всё равно возвращает все — подстрахуемся фильтром:
      map(rows => rows.filter(r => (r.folder_id ?? r.folderId) === folderId)),
      map(rows => rows.map(apiToMaterial))
      
    );
}

// 3) POST как уже починили, но используем тот же маппер
createMaterial(folderId: number, materialData: Omit<Material, 'id'>): Observable<Material> {
  const body = {
    folder_id: folderId,
    title: materialData.title,
    material_link: materialData.url, // если в Swagger именно material_linkk — переименуй ключ тут
  };
  return this.http.post<any | any[]>(`${this.apiUrl}/material`, body).pipe(
    map(r => Array.isArray(r) ? r[0] : r),
    map(apiToMaterial)
  );
}

}