import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentCheckOutPage } from './student-check-out';

@NgModule({
  declarations: [
    StudentCheckOutPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentCheckOutPage),
  ],
})
export class StudentCheckOutPageModule {}
