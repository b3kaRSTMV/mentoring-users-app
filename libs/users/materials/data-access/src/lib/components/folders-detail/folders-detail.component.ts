// folders-detail.component.ts
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Material } from '../../+state/materials/material.model';
import { MaterialsActions } from '../../+state/materials/materials.actions';
import { selectAllMaterials, selectMaterialsLoading } from '../../+state/materials/materials.selectors';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe, CommonModule, NgForOf, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
// ...

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folder-detail',
  standalone: true,
  imports: [
    CommonModule, AsyncPipe, NgIf, NgForOf,
    FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule
],
  templateUrl: './folders-detail.component.html',
  styleUrls: ['./folders-detail.component.scss'],
})

export class FolderDetailComponent implements OnInit {
  // как и было
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  materials$ = this.store.select(selectAllMaterials);
  loading$   = this.store.select(selectMaterialsLoading);

  // ↓ локальная форма (без реактивных форм, просто ngModel)
  addOpen = false;
  form = {
    type: 'video' as 'video' | 'pdf' | 'audio',
    title: '',
    url: ''
  };

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.store.dispatch(MaterialsActions.loadMaterials({ folderId: id }));
    });
  }

  toggleAdd() {
    this.addOpen = !this.addOpen;
    if (!this.addOpen) this.resetForm();
  }

  resetForm() {
    this.form = { type: 'video', title: '', url: '' };
  }

  saveMaterial() {
    const idStr = this.route.snapshot.paramMap.get('id');
    const folderId = Number(idStr);
    if (Number.isNaN(folderId)) return;

    // ⚠️ Используем ТВОЙ текущий экшен: { folderId, materialData: Omit<Material, 'id'> }
    const materialData = {
      title: this.form.title.trim(),
      url: this.form.url.trim(),
      folderId,                         // твоя модель его требует
      createdAt: new Date().toISOString() // можно добавить, если нужно
    } as Omit<Material, 'id'>;

    this.store.dispatch(MaterialsActions.createMaterial({ folderId, materialData }));

    // свернём форму после отправки
    this.toggleAdd();
  }
}
