import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as FoldersActions from '../../+state/folders/folders.action';
import { selectFoldersLoading } from '../../+state/folders/folders.selector';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-create-folder',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.scss'],
})
export class CreateFolderComponent {
  private readonly store = inject(Store);
  private readonly dialogRef = inject(MatDialogRef<CreateFolderComponent>);

  folderName = '';
  loading$ = this.store.select(selectFoldersLoading);

  createFolder(): void {
    if (this.folderName.trim()) {
      this.store.dispatch(
        FoldersActions.createFolder({ title: this.folderName.trim() })
      );
      
      // Закрываем диалог после успешного создания
      this.loading$.subscribe(loading => {
        if (!loading) {
          this.dialogRef.close();
        }
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}