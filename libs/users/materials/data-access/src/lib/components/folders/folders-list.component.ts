import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { selectAllFolders, selectFoldersLoading } from '../../+state/folders/folders.selector';
import { loadFolders } from '../../+state/folders/folders.action';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folders-list',
  standalone: true,
  imports: [CommonModule, CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderListComponent {
constructor(private store: Store, private router: Router) {}

ngOnInit(): void {
  this.store.dispatch(loadFolders());
}
 openFolder(id: number) {
    this.router.navigate(['/materials', id]);
  }
   openCreateDialog() {
    // Логика открытия диалога
  }
folders$ = this.store.select(selectAllFolders);
loading$ = this.store.select(selectFoldersLoading);




}
