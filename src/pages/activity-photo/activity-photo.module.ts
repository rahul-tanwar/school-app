import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityPhotoPage } from './activity-photo';

@NgModule({
    declarations: [
        ActivityPhotoPage,
    ],
    imports: [
        IonicPageModule.forChild(ActivityPhotoPage),
    ],
})
export class ActivityPhotoPageModule { }
