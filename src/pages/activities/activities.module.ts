import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivitiesPage } from './activities';
import { AssignmentPageModule } from "./../assignment/assignment.module";
import { NoticePageModule } from "./../notice/notice.module";
import { EventPageModule } from "./../event/event.module";

@NgModule({
  declarations: [
    ActivitiesPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivitiesPage),
    AssignmentPageModule,
    NoticePageModule,
    EventPageModule
  ],
})
export class ActivitiesPageModule {}
