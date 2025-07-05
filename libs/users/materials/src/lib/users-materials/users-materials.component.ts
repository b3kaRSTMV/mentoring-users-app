import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MaterialsApiService, Folder } from '../../../data-access/materials-api.service';


@Component({
  selector: 'users-users-materials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-materials.component.html',
  styleUrls: ['./users-materials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMaterialsComponent {
                         
}
