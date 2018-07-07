import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectStudentPage } from './select-student';

@NgModule({
  declarations: [
    SelectStudentPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectStudentPage),
  ],
})
export class SelectStudentPageModule {}
