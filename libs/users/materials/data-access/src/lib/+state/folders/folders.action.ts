import { createAction, props } from '@ngrx/store';
import { Folder } from './folder.models';
import { Material } from '../materials/material.model';

// Отдельные actions (старый стиль)
export const loadFolders = createAction(
  '[Folders] Load Folders'
);

export const loadFoldersSuccess = createAction(
  '[Folders] Load Folders Success',
  props<{ folders: Folder[] }>()
);

export const loadFoldersFailure = createAction(
  '[Folders] Load Folders Failure',
  props<{ error: string }>()
);

export const createFolder = createAction(
  '[Folders] Create Folder',
  props<{ title: string }>()
);

export const createFolderSuccess = createAction(
  '[Folders] Create Folder Success',
  props<{ folder: Folder }>()
);

export const createFolderFailure = createAction(
  '[Folders] Create Folder Failure',
  props<{ error: string }>()
);

export const loadFolderContent = createAction(
  '[Folders] Load Folder Content',
  props<{ folderId: string }>()
);

export const loadFolderContentSuccess = createAction(
  '[Folders] Load Folder Content Success',
  props<{ materials: Material[] }>()
);

export const loadFolderContentFailure = createAction(
  '[Folders] Load Folder Content Failure',
  props<{ error: string }>()
);