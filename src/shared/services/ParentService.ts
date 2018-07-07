import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Students } from '../models/Students';
import { Parent } from '../models/parent';
import { UserChangePassword } from '../models/User';

@Injectable()
export class ParentService extends BaseService {

    public addChild(childUniqueId: string, childCode: string, parentId: number): Observable<Students> {
        const model = {

            ParentUserId: parentId,
            ChildId: childUniqueId,
            ChildAppCode: childCode
        }
        return this.httpClient.post(this.baseUrl + 'student/addparentchild', model).pipe(catchError(this.handleError));
    }


    public getParentById(patentId: string): Observable<Parent> {

        this.httpParams = new HttpParams()
            .set('userId', patentId);
        return this.httpClient.get<Parent>(this.baseUrl + 'userprofile/getparentprofile', {
            params: this.httpParams
        }).pipe(catchError(this.handleError));
    }

    public updateParent(parent: Parent): Observable<boolean> {

        return this.httpClient.post(this.baseUrl + 'userprofile/updateparentprofile', parent)
            .pipe(catchError(this.handleError));
    }

    public UpdateParentPassword(userChangePassword: UserChangePassword): Observable<boolean> {
        return this.httpClient.post(this.baseUrl + 'userprofile/changeprofilePassword', userChangePassword)
            .pipe(catchError(this.handleError));
    }

    public getparentallchildIds(patentId: string): Observable<number[]> {
        debugger;
        this.httpParams = new HttpParams()
            .set('parentUserId', patentId);
        return this.httpClient.get<number[]>(this.baseUrl + 'student/getparentallchildIds', {
            params: this.httpParams
        }).pipe(catchError(this.handleError));
    }

    public updateParentSelectedStudent(childID: number, parentId: number): Observable<boolean> {

        const data = {
            "SelectedStudentId": childID,
            "ParentUserId": parentId
        };

        return this.httpClient.post(this.baseUrl + 'student/updateparentselectedstudent', data)
            .pipe(catchError(this.handleError));
    }

}