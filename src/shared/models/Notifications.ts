import * as moment from 'moment';

export class NotificationType {
    NotificationTypeId: number;
    NotificationName: string;
    IsActive: boolean;
}


export class NotificationDetails {

    constructor() {
        this.StudentIds = [];
    }

    StaffId: number;
    NotificationDate: string;
    IsStudentLevel: boolean;
    IsClassLevel: boolean;
    IsSchoolLevel: boolean;
    StudentIds: number[];
    ImageStr: string;
    ImageType: string;
    ImageURL: string;
    DocStr: string;
    DocType: string;
    DocURL: string;
    Notes: string;
    NotificationType: NotificationType;
    ClassId: number;
    SchoolInfoId: number;
    SelectedStudentClass: string;
}

export class Notification {
    StudentId: number;
    NotificationsMappingId: number;
    NotificationsDetailsId: number;
    NotificationTypeId: number;
    NotificationName: string;
    NotificationDate: moment.Moment;
    ImageURL: string;
    DocURL: string;
    Notes: string;
    ImageName: string;
    DocName: string;
    Response: boolean;
    CreatedDate: moment.Moment;
    Title: string;
}