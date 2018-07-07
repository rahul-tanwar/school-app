import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../shared/models/User';
import { LoginStaticData } from '../../shared/models/LoginStaticData';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class BaseService {

    protected token: any;
    protected httpOptions: any;
    protected baseUrl = 'http://schoolapi.anaghaenterprises.in/api/';
    protected httpParams: HttpParams;
    constructor(protected httpClient: HttpClient) {

    }

    public initilize(userInfo: User): void {

        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + userInfo.access_token
            })
        };

        this.initilizeLoginData(userInfo);
    }


    public initilizeLoginData(userInfo: User): void {
        localStorage.setItem('user-access', JSON.stringify(userInfo));
        LoginStaticData.UserInfo = userInfo;
    }

    protected handleError(error: HttpErrorResponse) {

        // if (error.error instanceof ErrorEvent) {
        //     console.error('An error occurred:', error.error.message);
        // } else {
        //     console.error(`Backend returned code ${error.status}, ` +
        //         `body was: ${error.error}`);
        // }

        return new ErrorObservable(error.error);
    }
}