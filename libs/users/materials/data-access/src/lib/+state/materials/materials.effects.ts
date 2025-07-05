import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MaterialApi, MaterialsApiService } from '../../../../materials-api.service';
import { MaterialsActions } from './materials.actions';
import { catchError, map, mergeMap, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { Material } from './material.model';

@Injectable()
export class MaterialsEffects {
  constructor(
    private actions$: Actions,
    private api: MaterialsApiService,
    private store: Store
  ) {}

  // Загрузка материалов
loadMaterials$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MaterialsActions.loadMaterials),
    switchMap(({ folderId }) =>
      this.api.getMaterialsByFolder(folderId).pipe( // ✅ теперь загружаем только нужные
        tap(data => console.log('Filtered materials from API:', data)),
        map((materialsFromApi: MaterialApi[]) => {
          const normalizedMaterials: Material[] = materialsFromApi.map(m => ({
            id: m.id,
            title: m.title,
            url: m.material_linkk,
            folderId: m.folder_id,
            createdAt: m.createdAt,
          
          }));
          return MaterialsActions.loadMaterialsSuccess({
            materials: normalizedMaterials
          });
        }),
        catchError(error =>
          of(MaterialsActions.loadMaterialsFailure({ error: error.message }))
        )
      )
    )
  )
);



  // Создание материала
  createMaterial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaterialsActions.createMaterial),
      mergeMap(({ folderId, materialData }) =>
        this.api.createMaterial(folderId, materialData).pipe(
          map(material => 
            MaterialsActions.createMaterialSuccess({ material })
          ),
          catchError(error => 
            of(MaterialsActions.createMaterialFailure({ 
              error: error.message 
            }))
        )
      )
    ))
  );

  // Удаление материала
  deleteMaterial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      mergeMap(({ id }) =>
        this.api.deleteMaterial(id).pipe(
          map(() => 
            MaterialsActions.deleteMaterialSuccess({ id })
          ),
          catchError(error => 
            of(MaterialsActions.deleteMaterialFailure({ 
              error: error.message 
            }))
        )
      )
    ))
  );
}