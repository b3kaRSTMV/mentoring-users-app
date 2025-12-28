import { createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { Material } from './material.model';

export interface MaterialsState {
  materials: Material[];
  loading: boolean;
  error: string | null;
}

export const initialState: MaterialsState = {
  materials: [],
  loading: false,
  error: null,
};

export const materialsReducer = createReducer(
  initialState,
  // Загрузка материалов
  on(MaterialsActions.loadMaterials, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => ({
    ...state,
    materials,
    loading: false,
  })),
  on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Создание материала
  on(MaterialsActions.createMaterial, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MaterialsActions.createMaterialSuccess, (state, { material }) => ({
    ...state,
    loading: false,
    materials: [material, ...state.materials.filter((m) => m.id !== material.id)],
  })),
  on(MaterialsActions.createMaterialFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Удаление материала
  on(MaterialsActions.deleteMaterial, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) => ({
    ...state,
    materials: state.materials.filter((m) => m.id !== id),
    loading: false,
  })),
  on(MaterialsActions.deleteMaterialFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
