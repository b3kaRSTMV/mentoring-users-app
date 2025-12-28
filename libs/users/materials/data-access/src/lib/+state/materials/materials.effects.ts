import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MaterialsApiService } from '../../../../materials-api.service';
import { MaterialsActions } from './materials.actions';
import { catchError, exhaustMap, map, mergeMap, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { Material } from './material.model';

@Injectable()
export class MaterialsEffects {
  constructor(private actions$: Actions, private api: MaterialsApiService, private store: Store) {}

  // Загрузка материалов
loadMaterials$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MaterialsActions.loadMaterials),
    switchMap(({ folderId }) =>
      this.api.getMaterialsByFolder(folderId).pipe(
        // tap(data => console.log('Filtered materials from API:', data)), // можно убрать
        map((materials: Material[]) =>
          MaterialsActions.loadMaterialsSuccess({ materials })
        ),
        catchError((error) =>
          of(MaterialsActions.loadMaterialsFailure({ error: error?.message ?? 'Error' }))
        )
      )
    )
  )
);


  createMaterial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaterialsActions.createMaterial),
      exhaustMap(({ folderId, materialData }) =>
        this.api.createMaterial(folderId, materialData).pipe(
          map((material) => MaterialsActions.createMaterialSuccess({ material })),
          catchError((error) => of(MaterialsActions.createMaterialFailure({ error: error.message })))
        )
      )
    )
  );
}
