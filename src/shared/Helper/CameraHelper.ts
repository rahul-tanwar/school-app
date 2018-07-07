import { Camera, CameraOptions } from '@ionic-native/camera';
import { ACTIVITY, TOAST } from '../../shared/Enums';
import { UIHelper } from '../../shared/Helper/UIHelper';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class CameraHelper {

    toast = TOAST;
    constructor(
        private UiHelper: UIHelper, private camera: Camera) {

    }

    async getCamera(): Promise<string> {

        let base64Image = "";
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.CAMERA,
            allowEdit: true,
            targetHeight: 700,
            targetWidth: 500,
            saveToPhotoAlbum: false
        }

        await this.camera.getPicture(options).then((imageData) => {
            this.UiHelper.ShowSpinner();
            base64Image = 'data:image/jpeg;base64,' + imageData;
            this.UiHelper.HideSpinner();

        }, (err) => {
            this.UiHelper.HideSpinner();
            this.UiHelper.showToast(err, this.toast.ERROR);
        });

        return Promise.resolve(base64Image);
    }

    async getImage(): Promise<string> {
        let base64Image = "";
        let options = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true
        }

        await this.camera.getPicture(options).then((imageData) => {
            this.UiHelper.ShowSpinner();
            base64Image = imageData;

        }, (err) => {
            this.UiHelper.showToast(err, 3);
            this.UiHelper.HideSpinner();
        });

        let base64ImageData = "";
        await this.convertToBase64(base64Image, 'image/jpeg').then(data => {
            base64ImageData = data.toString();
        });

        this.UiHelper.HideSpinner();
        return Promise.resolve(base64ImageData);
    }


    convertToBase64(url, outputFormat) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function () {
                let canvas = <HTMLCanvasElement>document.createElement('CANVAS'),
                    ctx = canvas.getContext('2d'),
                    dataURL;
                canvas.height = img.height;
                canvas.width = img.width;
                ctx.drawImage(img, 0, 0);
                dataURL = canvas.toDataURL(outputFormat);
                canvas = null;
                resolve(dataURL);
            };
            img.src = url;
        });
    }
}