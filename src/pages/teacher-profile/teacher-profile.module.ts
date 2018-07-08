import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherProfilePage } from './teacher-profile';
import { MyProfilePageModule } from "../myprofile/myprofile.module";
import { ChangePasswordPageModule } from "../change-password/change-password.module";

@NgModule({
  declarations: [
    TeacherProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(TeacherProfilePage),
    MyProfilePageModule,
    ChangePasswordPageModule
  ],
})
export class TeacherProfilePageModule {}
