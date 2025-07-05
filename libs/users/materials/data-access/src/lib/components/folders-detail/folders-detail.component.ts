import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgIf, NgForOf } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAllMaterials, selectMaterialsByFolderId, selectMaterialsLoading } from '../../+state/materials/materials.selectors';
import { MaterialsActions } from '../../+state/materials/materials.actions';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folder-detail',
  standalone: true,
  imports: [CommonModule, AsyncPipe, NgIf, NgForOf],
  templateUrl: './folders-detail.component.html',
  styleUrls: ['./folders-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderDetailComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  materials$ = this.store.select(selectAllMaterials);
  loading$ = this.store.select(selectMaterialsLoading);

ngOnInit() {
  this.route.params.subscribe(params => {
    const id = +params['id'];
    this.store.dispatch(MaterialsActions.loadMaterials({ folderId: id }));
    this.materials$ = this.store.select(selectMaterialsByFolderId(id));
  });
}
}

