import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationNoticePage } from './notification-notice';

@NgModule({
    declarations: [
        NotificationNoticePage,
    ],
    imports: [
        IonicPageModule.forChild(NotificationNoticePage),
    ],
})
export class NotificationNoticePageModule { }
