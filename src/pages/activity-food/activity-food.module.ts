import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityFoodPage } from './activity-food';

@NgModule({
    declarations: [
        ActivityFoodPage,
    ],
    imports: [
        IonicPageModule.forChild(ActivityFoodPage),
    ],
})
export class ActivityFoodPageModule { }
