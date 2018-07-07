import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuTeacherPage } from './menu-teacher';

@NgModule({
    declarations: [
        MenuTeacherPage,
    ],
    imports: [
        IonicPageModule.forChild(MenuTeacherPage),
    ],
})
export class MenuTeacherPageModule { } 
