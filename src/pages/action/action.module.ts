import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActionPage } from './action';

@NgModule({
  declarations: [
    ActionPage,
  ],
  imports: [
    IonicPageModule.forChild(ActionPage),
  ],
})
export class ActionPageModule {}
