import * as moment from 'moment';

export class ActivityType {

    constructor() {
        this.ActivitySubType = new Array<ActivitySubType>();
    }
    ActivityTypeId: number;
    ActivityName: string;
    HasChild: boolean;
    IsSelected: boolean;
    IsActive: boolean;
    ActivitySubType: ActivitySubType[];
}

export class ActivitySubType {

    constructor() {
        this.SubTypeChilds = new Array<ActivitySubTypeChild>();
    }

    ActivityTypeId: number;
    ActivitySubTypeId: number;
    Name: string;
    HasChild: boolean;
    IsSelected: boolean;
    SubTypeChilds: ActivitySubTypeChild[];
}


export class ActivitySubTypeChild {
    ActivitySubTypeId: number;
    ActivitySubTypeChildId: number;
    IsSelected: boolean;
    Name: string;
}


export class Activity {
    ActivityDetailsId: number;
    StaffId: number;
    ActivityDate: moment.Moment;
    IsStudentLevel: boolean;
    IsClassLevel: boolean;
    IsSchoolLevel: boolean;
    StudentId: number;
    ImageURL: string;
    Notes: string;
    ActivityTypeId: number;
    ActivityName: string;
    ActivitySubTypeNames: string;
    ActivitySubChildTypeNames: string;
    ActivitySubTypeIds: string;
    ActivitySubChildTypeIds: string;
    AcivitySubName: string;
    ClassId: number;
}


