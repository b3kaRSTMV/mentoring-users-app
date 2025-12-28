import { createReducer, on } from '@ngrx/store';
import * as FoldersActions from './folders.action';
import { Folder } from './folder.models';
import { Material } from '../materials/material.model';


export interface FoldersState {
  folders: Folder[];
  loading: boolean;
  error: string | null;
   currentFolder: {
    materials: Material[];
    loading: boolean;
    error: string | null;
  };
}

export const initialState: FoldersState = {
  folders: [],
  loading: false,
  error: null,
  currentFolder: {
    materials: [],
    loading: false,
    error: null
  }
};

export const foldersReducer = createReducer(
  initialState,
  on(FoldersActions.loadFolders, state => ({ ...state, loading: true })),
  on(FoldersActions.loadFoldersSuccess, (state, { folders}) => ({
    ...state,
    loading: false,
    folders,
  })),
  on(FoldersActions.loadFoldersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),


    on(FoldersActions.createFolder, (state) => ({
    ...state, loading: true, error: null
  })),
 on(FoldersActions.createFolderSuccess, (state, { folder }) => ({
  ...state,
  loading: false,
  folders: [folder, ...state.folders.filter(f => f.id !== folder.id)]
})),
  on(FoldersActions.createFolderFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),
);



