import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MaterialsState } from './materials.reducer';

export const selectMaterialsState = 
  createFeatureSelector<MaterialsState>('materials');

// Основные селекторы
export const selectAllMaterials = createSelector(
  selectMaterialsState,
  (state) => state.materials
);

export const selectMaterialsLoading = createSelector(
  selectMaterialsState,
  (state) => state.loading
);

export const selectMaterialsError = createSelector(
  selectMaterialsState,
  (state) => state.error
);

// Селекторы для конкретной папки
export const selectMaterialsByFolderId = (folderId: number) => 
  createSelector(
    selectAllMaterials,
    (materials) => materials.filter(m => m.folderId === folderId)
  );


// export const selectMaterialsByType = (type: string) =>
//   createSelector(
//     selectAllMaterials,
//     (materials) => materials.filter(m => m.type === type)
//   );