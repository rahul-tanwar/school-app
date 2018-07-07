import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityNotesPage } from './activity-notes';

@NgModule({
    declarations: [
        ActivityNotesPage,
    ],
    imports: [
        IonicPageModule.forChild(ActivityNotesPage),
    ],
})
export class ActivityNotesPageModule { }
