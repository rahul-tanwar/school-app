import { Component } from '@angular/core';
import {
    Alert,
    AlertController, IonicPage, NavController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/LoginService';
import { EmailValidator } from '../../validators/email';
import { UIHelper } from '../../shared/Helper/UIHelper';

@IonicPage()
@Component({
    selector: 'page-reset-password',
    templateUrl: 'reset-password.html',
    providers: [UIHelper]
})
export class ResetPasswordPage {
    public resetPasswordForm: FormGroup;
    constructor(
        public navCtrl: NavController,
        private loginService: LoginService,
        private UiHelper: UIHelper,
        formBuilder: FormBuilder
    ) {
        this.resetPasswordForm = formBuilder.group({
            email: [
                '',
                Validators.compose([Validators.required, EmailValidator.isValid])
            ]
        });
    }

    resetPassword(): void {
        this.UiHelper.ShowSpinner();
        this.loginService.forgotPassword(this.resetPasswordForm.value.email)
            .subscribe((result: any) => {
                this.UiHelper.HideSpinner();
                if (!!result) {
                    this.UiHelper.ShowAlert("Forgot Password", "Password sent to your email address successfully.");
                } else {
                    this.UiHelper.ShowAlert("Forgot Password", "Error");
                }
            }, (error1: any) => {
                this.UiHelper.HideSpinner();
                this.UiHelper.ShowAlert("Forgot Password", "Inavlid Email address");
            });
    }

     
}
