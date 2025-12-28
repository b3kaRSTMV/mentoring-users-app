import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-add-folder-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule],
  templateUrl: './add-folder-dialog.html'
})
export class AddFolderDialogComponent {
  folderNameControl = new FormControl('', [Validators.required]);

  constructor(private dialogRef: MatDialogRef<AddFolderDialogComponent>) {}

  cancel() {
    this.dialogRef.close();
  }

  create() {
    if (this.folderNameControl.valid) {
      this.dialogRef.close(this.folderNameControl.value);
    }
  }
}
