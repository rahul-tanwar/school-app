import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFirstChildPage } from './add-first-child';
//import { UIHelper } from '../../shared/Helper/UIHelper';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';

@NgModule({
    declarations: [
        AddFirstChildPage,
    ],
    imports: [
        IonicPageModule.forChild(AddFirstChildPage),
    ]

})
export class AddFirstChildPageModule { }
