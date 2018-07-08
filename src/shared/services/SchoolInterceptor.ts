import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { LoginStaticData } from '../models/LoginStaticData';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SchoolInterceptor implements HttpInterceptor {

    constructor() {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request.url.includes('http://schoolapi.anaghaenterprises.in/token') && !request.url.includes('http://schoolapi.anaghaenterprises.in/api/account/forgotpassword')) {
            var token = LoginStaticData.UserInfo.access_token;
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}