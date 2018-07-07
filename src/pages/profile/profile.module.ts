import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { ChildProfilePageModule } from '../childprofile/childprofile.module';
import { ChangePasswordPageModule } from "../change-password/change-password.module";
import { ParentProfilePageModule } from "../parent-profile/parent-profile.module";


@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    ChildProfilePageModule,
    ChangePasswordPageModule,
    ParentProfilePageModule
  ],
})
export class ProfilePageModule {}
