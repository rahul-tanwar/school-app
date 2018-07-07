import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityNapPage } from './activity-nap';

@NgModule({
    declarations: [
        ActivityNapPage,
    ],
    imports: [
        IonicPageModule.forChild(ActivityNapPage),
    ],
})
export class ActivityNapPageModule { }
