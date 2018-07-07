import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentDashboardPage } from './parent-dashboard';
import {ActivitiesPageModule} from "../activities/activities.module";
import {NotificationsPageModule  } from "../notifications/notifications.module";
import { CalenderPageModule } from "../calender/calender.module";
import { ActionPageModule } from "../action/action.module";

@NgModule({
  declarations: [
    ParentDashboardPage
  ],
  imports: [
    IonicPageModule.forChild(ParentDashboardPage),
    NotificationsPageModule,
    ActivitiesPageModule,
    CalenderPageModule,
    ActionPageModule
  ],

})
export class ParentDashboardPageModule {}
