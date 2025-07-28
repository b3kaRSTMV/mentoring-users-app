import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FoldersApiService } from './folders.api.service';
import * as FoldersActions from './folders.action';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class FoldersEffect {
  loadFolders$ = createEffect(() => {
    const actions$ = inject(Actions); //получили доступ ко всем action
    const api = inject(FoldersApiService); // получили доступ к api

    return actions$.pipe(
      ofType(FoldersActions.loadFolders),
      mergeMap(() =>
        //ассинхронный запрос
        api.getFolders().pipe(
          map((folders) => FoldersActions.loadFoldersSuccess({ folders })), // получаем массив данных folders и с помощью мапа преобразуем в экшн
          catchError((error) => of(FoldersActions.loadFoldersFailure({ error: error.message })))
        )
      )
    );
  });
  createFolders$ = createEffect(() => {
    const actions$ = inject(Actions);
    const api = inject(FoldersApiService);

    return actions$.pipe(
      ofType(FoldersActions.createFolder),
      mergeMap((actions$) =>
        api.createFolder(actions$.title).pipe(
          map((folder) => FoldersActions.createFolderSuccess({ folder })),
          catchError((error) => of(FoldersActions.createFolderFailure({ error: error.message })))
        )
      )
    );
  });
}
