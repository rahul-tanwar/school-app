import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { User } from '../models/User';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { LoginStaticData } from '../models/LoginStaticData';

@Injectable()
export class LoginService {
    httpOptions: any;
    loginUrl = 'http://schoolapi.anaghaenterprises.in/token';
    httpParams: HttpParams;

    constructor(public baseService: BaseService, protected httpClient: HttpClient) {

    }
    public getToken(username: string, password: string): Observable<object> {

        this.httpOptions = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*'
        });

        this.httpParams = new HttpParams()
            .set('username', username)
            .set('password', password)
            .set('grant_type', 'password');

        return this.httpClient.post(this.loginUrl,
            this.httpParams, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    public initilizeBase(userInfo: User) {
        this.baseService.initilize(userInfo);
    }


    public getRolePageName(roleName: string) {
        if (roleName.toLowerCase() == "staff") {
            return "TeacherDashboardPage";
        }
        else if (roleName.toLowerCase() == "parent") {
            if (LoginStaticData.UserInfo.AppSelectedStudent > 0) {
                return "ParentDashboardPage";
            } else {
                return "AddChildPage";
            }
        }

        else {
            return "LoginPage";
        }
    }


    protected handleError(error: HttpErrorResponse) {
        return new ErrorObservable(error.error);
    }
}