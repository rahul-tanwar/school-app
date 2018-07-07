import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentMenuPage } from './parent-menu';

@NgModule({
    declarations: [
        ParentMenuPage,
    ],
    imports: [
        IonicPageModule.forChild(ParentMenuPage),
    ],
})
export class ParentMenuPageModule { } 
