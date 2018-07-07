import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChildProfilePage } from './childprofile';
import { AddChildPageModule } from "../add-child/add-child.module";

@NgModule({
  declarations: [
    ChildProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ChildProfilePage),
    AddChildPageModule
  ],
})
export class ChildProfilePageModule {}
