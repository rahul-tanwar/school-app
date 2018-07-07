import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { LoginStaticData } from '../models/LoginStaticData';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SchoolInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request.url.includes('http://schoolapi.anaghaenterprises.in/token')) {
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