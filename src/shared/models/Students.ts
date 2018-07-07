import * as moment from "moment";

export class Students {
    CheckInId:number;
    StudentId: number;
    SchoolInfoId: number;
    StudentUniqueId: string;
    DOB: string;
    IsActive: true;
    AadharNumber: string;
    ClassId: number;
    IsPresent: boolean;
    UpdateDate: string;
    UpdatedEmail: string;
    AppCode: string;
    ClassName: string;
    Name: string;
    SchoolName: string;
    Gender: string;
    IsCheckout: boolean;
    CheckOutDate:moment.Moment;
}

export class StudentCheckin {

    UserId: number;
    StudentId: number;
    ClassId: number;
    IsPresent: boolean;
    UpdatedEmail: string;

}

export class StudentCheckout {
    CheckInId:number;
    UserId: number;
    StudentId: number;
    ClassId: number;
    UpdatedEmail: string;
    IsCheckout: boolean;
}

