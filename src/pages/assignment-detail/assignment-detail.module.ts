import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssignmentDetailPage } from './assignment-detail';

@NgModule({
  declarations: [
    AssignmentDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AssignmentDetailPage),
  ],
})
export class AssignmentDetailPageModule {}
