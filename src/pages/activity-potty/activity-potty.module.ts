import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityPottyPage } from './activity-potty';

@NgModule({
    declarations: [
        ActivityPottyPage,
    ],
    imports: [
        IonicPageModule.forChild(ActivityPottyPage),
    ],
})
export class ActivityPottyPageModule { }
