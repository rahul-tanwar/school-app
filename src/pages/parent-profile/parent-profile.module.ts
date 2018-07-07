import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentProfilePage } from './parent-profile';

@NgModule({
    declarations: [
        ParentProfilePage,
    ],
    imports: [
        IonicPageModule.forChild(ParentProfilePage),
    ],
})
export class ParentProfilePageModule { }
