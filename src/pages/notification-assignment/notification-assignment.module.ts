import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationAssignmentPage } from './notification-assignment';

@NgModule({
    declarations: [
        NotificationAssignmentPage,
    ],
    imports: [
        IonicPageModule.forChild(NotificationAssignmentPage),
    ],
})
export class NotificationAssignmentPageModule { }
