import { createActionGroup, props } from '@ngrx/store';
import { Material } from './material.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    // Загрузка материалов
    'Load Materials': props<{ folderId: number }>(),
    'Load Materials Success': props<{ materials: Material[] }>(),
    'Load Materials Failure': props<{ error: string }>(),

    // Создание материала
    'Create Material': props<{ 
      folderId: number;
      materialData: Omit<Material, 'id'> 
    }>(),
    'Create Material Success': props<{ material: Material }>(),
    'Create Material Failure': props<{ error: string }>(),

    // Удаление материала
    'Delete Material': props<{ id: number }>(),
    'Delete Material Success': props<{ id: number }>(),
    'Delete Material Failure': props<{ error: string }>()
  }
});