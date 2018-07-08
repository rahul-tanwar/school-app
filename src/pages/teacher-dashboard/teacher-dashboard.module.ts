import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherDashboardPage } from './teacher-dashboard';
import { StudentCheckInPageModule } from './../student-check-in/student-check-in.module';
import { StudentCheckOutPageModule } from "./../student-check-out/student-check-out.module";
import { ActionPageModule } from './../action/action.module'
@NgModule({
    declarations: [
        TeacherDashboardPage,
    ],
    imports: [
        IonicPageModule.forChild(TeacherDashboardPage),
        StudentCheckInPageModule,
        ActionPageModule,
        StudentCheckOutPageModule
    ],
})
export class TeacherDashboardPageModule { }
