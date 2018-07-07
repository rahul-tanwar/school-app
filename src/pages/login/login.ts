import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { ParentDashboardPage } from '../parent-dashbord/parent-dashboard';
import { TeacherDashboardPage } from '../teacher-dashboard/teacher-dashboard';
import { LOGINTYPE, ROLE } from '../../shared/Enums';
import { LoginService } from '../../shared/services/LoginService';
import { User } from '../../shared/models/User';
import { UIHelper } from '../../shared/Helper/UIHelper';


@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [UIHelper]
})
export class LoginPage {

    public loginBy;
    loginForm: FormGroup;

    constructor(
        public navParams: NavParams,
        formBuilder: FormBuilder,
        private loginService: LoginService, private UiHelper: UIHelper) {

        this.loginBy = navParams.get("loginBy");
        this.loginForm = formBuilder.group({
            email: [
                '',
                Validators.compose([Validators.required, EmailValidator.isValid])
            ],
            password: [
                '',
                Validators.compose([Validators.required, Validators.minLength(6)])
            ]
        });

    }
    goToResetPassword(): void {
        this.UiHelper.OpenPage('ResetPasswordPage');
    }


    loginUser(): void {
        this.UiHelper.ShowSpinner();
        this.loginService.getToken(this.loginForm.value.email, this.loginForm.value.password)
            .subscribe((result: User) => {
                this.UiHelper.HideSpinner();
                if (!!result) {
                    this.loginService.initilizeBase(result);
                    this.UiHelper.OpenPage(this.loginService.getRolePageName(result.RoleName));
                } else {
                    this.UiHelper.ShowAlert("Login", "Data not found");
                }
            }, (error1: any) => {
                this.UiHelper.HideSpinner();
                this.UiHelper.ShowAlert("Login", "Invalid Username or Password");
            });
    }
}
