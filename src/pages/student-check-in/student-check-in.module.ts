import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentCheckInPage } from './student-check-in';

@NgModule({
  declarations: [
    StudentCheckInPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentCheckInPage),
  ],
})
export class StudentCheckInPageModule {}
