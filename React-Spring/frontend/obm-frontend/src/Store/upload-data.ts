import { action, makeAutoObservable, observable } from 'mobx';
import { ObvservationCreationDto } from '../api/dto/observation';
import { saveObservation } from '../api/observation-api';

class UploadData {
    @observable coordinates: [number, number][] = [];
    @observable speciesId = 1;
    @observable development = "";
    @observable locationId = -1;
    @observable countryId = -1;
    @observable uploaderId = -1;
    @observable status = "";
    @observable date = "";
    @observable number = 0;
    constructor() {
        makeAutoObservable(this);
    }

    @action setUploadData(coordinates: [number, number][] = [], speciesId: number,
        development: string, locationId: number,
        countryId: number, number: number,
        date: string, status: string,
        uploaderId: number

    ) {
        this.coordinates = coordinates;
        this.speciesId = speciesId;
        this.development = development;
        this.locationId = locationId;
        this.countryId = countryId;
        this.number = number;
        this.date = date;
        this.status = status;
        this.uploaderId = uploaderId
    }

    @action setCoordinates(coordinates: [number, number][] = []) {
        this.coordinates = coordinates;
    }

    @action setSpeciesId(speciesId: number) {
        this.speciesId = speciesId;
    }

    @action setDevelopment(development: number | number[]) {
        if(development == 0) {
            this.development = "EGG";
        }
        else if(development == 25) {
            this.development = "HATCHLING";
        }
        else if(development == 50) {
            this.development = "JUVENILE";
        }
        else if(development == 75) {
            this.development = "ADULT";
        } 
        else if(development == 100) {
            this.development = "PARENT";
        }       
    }

    @action setLocationId(locationId: number) {
        this.locationId = locationId;
    }

    @action setCountryId(countryId: number) {
        this.countryId = countryId;
    }

    @action setNumber(number: number) {
        this.number = number;
    }

    @action setDate(date: string) {
        this.date = date;
    }

    @action setUploader(uploaderId: number) {
        this.uploaderId = uploaderId;
    }

    @action setStatus(status: string) {
        this.status = status;
    }

    @action geometryConverter() {
        let geometryString = "";
        if (this.coordinates.length > 1) {
            geometryString = "POLYGON ((";
        } else {
            geometryString = "POINT ( ";
        }
        this.coordinates.forEach((el) => {
            geometryString += el[0].toFixed(4) + " " + el[1].toFixed(4) + ", "
        })
        if (this.coordinates.length > 1) {
            geometryString += this.coordinates[0][0].toFixed(4) + " " + this.coordinates[0][1].toFixed(4)
        } else {
            geometryString = geometryString.slice(0, -2)
        }
        geometryString+="))"
        return geometryString;
    }

    @action setToDefault() {
        this.coordinates = [];
        this.speciesId = -1;
        this.development = "";
        this.locationId = -1;
        this.countryId = -1;
        this.number = -1;
        this.date = "";
        this.status = "";
        this.uploaderId = -1;
    }

    @action async saveObservation() {
        const geometryString = this.geometryConverter()
        const newObservation : ObvservationCreationDto  = {
                uploaderId: this.uploaderId,
                locationId: this.locationId,
                speciesId: this.speciesId,
                status: this.status,
                date: this.date,
                geometry: geometryString,
                number: this.number,
                developement: this.development,
            }
            console.log(newObservation);
        await saveObservation(newObservation);
    }

    @action checkValidity() {
        return !(this.coordinates == [] ||
            this.speciesId == -1 ||
            this.development == "" ||
            this.locationId == -1 ||
            this.countryId == -1 ||
            this.number == -1 ||
            this.date == "" ||
            this.status == "" ||
            this.uploaderId == -1);
    }
}

const uploadDataStore = new UploadData();
export default uploadDataStore;