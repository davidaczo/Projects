import { action, makeAutoObservable, observable } from 'mobx';
import { DateService } from '../service/date-service';

class FilteringData {
    @observable speciesList: string[] = [];

    @observable dateFrom: Date | null = null;

    @observable dateTo: Date | null = null;

    @observable monthFrom: number | null = null;

    @observable monthTo: number | null = null;

    @observable gender: string | null = '';

    @observable type: string | null = '';

    @observable spatialFilter = false;

    constructor() {
        makeAutoObservable(this);
    }

    @action setSpeciesList(sl: string[]) {
        this.speciesList = sl;
    }

    @action setDateFrom(df: Date | null) {
        this.dateFrom = df;
    }

    @action setDateTo(dt: Date | null) {
        this.dateTo = dt;
    }

    @action setMonthFrom(mf: number | null) {
        if (mf != null) {
            const date: Date = new Date();
            date.setMonth(mf);
            this.monthFrom = DateService.getDayOfYear(date);
        } else {
            this.monthFrom = null;
        }
    }

    @action setMonthTo(mt: number | null) {
        if (mt != null) {
            const date: Date = new Date();
            date.setMonth(mt);
            this.monthTo = DateService.getDayOfYear(date);
        } else {
            this.monthTo = null;
        }
    }

    @action setFilteringDate(
        df: Date | null,
        dt: Date | null,
        mf: number | null,
        mt: number | null
    ) {
        this.setDateFrom(df);
        this.setDateTo(dt);
        this.setMonthFrom(mf);
        this.setMonthTo(mt);
    }

    @action setGenderTo(s: string) {
        this.gender = s === '' ? null : s;
    }

    @action setTypeTo(s: string) {
        this.type = s === '' ? null : s;
    }

    @action setSpatialFilter() {
        this.spatialFilter = !this.spatialFilter;
    }

    @action setSpatialFilterWithValue(newSpatialFilter: boolean) {
        console.log(this.spatialFilter)
        this.spatialFilter = newSpatialFilter;
        console.log(this.spatialFilter)
    }
}

const filterDataStore = new FilteringData();

export default filterDataStore;
