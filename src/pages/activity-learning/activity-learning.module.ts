import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityLearningPage } from './activity-learning';

@NgModule({
    declarations: [
        ActivityLearningPage,
    ],
    imports: [
        IonicPageModule.forChild(ActivityLearningPage),
    ],
})
export class ActivityLearningPageModule { }
