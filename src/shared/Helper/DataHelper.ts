import { Injectable } from '@angular/core';
import { ActivityType, ActivitySubType, ActivitySubTypeChild } from '../models/Activity';
import { NotificationType } from '../models/Notifications';

@Injectable()
export class DataHelper {

    constructor() {

    }

    getNotificationTypeById(typeId: number, notificationTypes: Array<NotificationType>) {

        var data = notificationTypes.filter((item) => {
            return (item.NotificationTypeId == typeId);
        });

        return data[0] as NotificationType;
    }

    getActivityTypeById(activityTypeId: number, activityType: Array<ActivityType>) {
        var data = activityType.filter((item) => {
            return (item.ActivityTypeId == activityTypeId);
        });

        return data[0] as ActivityType;
    }

    getActivitySelectedData(data: ActivityType) {
        let tempDataActivity = new ActivityType();
        tempDataActivity.ActivityTypeId = data.ActivityTypeId;
        tempDataActivity.ActivityName = data.ActivityName;
        tempDataActivity.HasChild = data.HasChild;
        tempDataActivity.IsActive = data.IsActive;
        tempDataActivity.IsSelected = data.IsSelected;
        let SelectedSubTypesAndChild: ActivitySubType[] = [];
        data.ActivitySubType.forEach(element => {
            if (element.IsSelected) {
                if (element.HasChild) {
                    let dataChild: ActivitySubTypeChild[] = [];
                    element.SubTypeChilds.forEach(item => {
                        if (item.IsSelected) {
                            dataChild.push(item);
                        }
                    });

                    if (dataChild != null && dataChild.length > 0) {

                        let tempData = new ActivitySubType();
                        tempData.ActivitySubTypeId = element.ActivitySubTypeId;
                        tempData.ActivityTypeId = element.ActivityTypeId;
                        tempData.HasChild = element.HasChild;
                        tempData.IsSelected = element.IsSelected;
                        tempData.Name = element.Name;
                        tempData.SubTypeChilds = dataChild;
                        SelectedSubTypesAndChild.push(tempData);
                    }
                }
                else {
                    SelectedSubTypesAndChild.push(element);
                }
            }
        });

        tempDataActivity.ActivitySubType = SelectedSubTypesAndChild;
        return tempDataActivity;
    }



}