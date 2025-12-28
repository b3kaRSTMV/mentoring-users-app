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

  loadMaterials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      switchMap(({ folderId }) =>
        this.api.getMaterialsByFolder(folderId).pipe(
          map((materials) => MaterialsActions.loadMaterialsSuccess({ materials })),
          catchError((err) => of(MaterialsActions.loadMaterialsFailure({ error: err?.message ?? 'Error' })))
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
