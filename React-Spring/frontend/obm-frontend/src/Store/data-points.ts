import { action, configure, makeAutoObservable, observable, runInAction, toJS } from 'mobx';
import _ from 'lodash';
import { observationToMapElement } from '../api/assembler/checkitout-assembler';
import { fetchAllObservations, fetchSpatialFilteredData,fetchFilteredDataBySpeciesNameOrDate } from '../api/observation-api'
import filterDataStore from './filtering-data';
import { MapElementDto, Observation, ObservationDto } from '../models/observation';
import { FilterObservationDto } from '../api/dto/observation';

configure({ enforceActions: 'always' });

class DataPoints {
    @observable dataPoints: MapElementDto[] = [];

    @observable observations: Observation[] = [];

    @observable observations2: ObservationDto[] = [];
    @observable observationsDto: ObservationDto[] = [];

    @observable observationId = 0;

    @observable xCoord = 0;

    @observable yCoord = 0;

    @observable firstLoad = false;

    @observable isLoading = false;

    @observable drawnPolygon: [number, number][] = [];

    constructor() {
        makeAutoObservable(this);
    }

    @action async loadAllObservations() {
      this.dataPoints = [];
      try {
        const data = await fetchAllObservations();
        runInAction(() => {
          this.observations2 = data;
          this.observationsDto = data;
          setTimeout(() => {
                
            this.isLoading = false;
        }, 5000);
        //   this.isLoading = false;
        });
      } catch (error) {
        runInAction(() => {
          this.isLoading = false;
        });
        console.log(error);
      }
    }

    @action async loadData() {
        if (!this.firstLoad) this.firstLoad = true;
        this.dataPoints = [];
        this.isLoading = true;
        try {
            const data = await fetchAllObservations();
            runInAction(() => {
                this.dataPoints = data.map((item: ObservationDto) => observationToMapElement(item));
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.isLoading = false;
            });
            console.log(error);
        }
        try {
            const listObject = toJS(filterDataStore.speciesList)
            const filter: FilterObservationDto = {
                speciesList: (listObject?.length === 0 ? null : listObject) as string[],
                dateFrom: filterDataStore.dateFrom,
                dateTo: filterDataStore.dateTo,
                monthFrom: filterDataStore.monthFrom,
                monthTo: filterDataStore.monthTo,
                spatialFilter: filterDataStore.spatialFilter || null
            };
            let data: ObservationDto[];
            if (
                // filter.speciesList?.length > 0 ||
                _.keys(filter).some((key: string | number) => filter[key] !== null)
            ) {
                data = await fetchFilteredDataBySpeciesNameOrDate(filter);
            } else {
                data = await fetchAllObservations();
            }

            runInAction(() => {
                this.dataPoints = data.map((item: ObservationDto) => observationToMapElement(item));
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.isLoading = false;
            });
            console.debug(error);
        }
    }

    @action async loadSpatialFilteredData() {
        try {
            this.dataPoints = [];
            this.isLoading = true;
            const data = await fetchSpatialFilteredData();
            runInAction(() => {
                this.dataPoints = data.map((item: ObservationDto) => observationToMapElement(item));
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.isLoading = false;
            });
            console.log(error);
        }
    }

    @action setDrawnPolygon(newDrawnPolygon: [number, number][]) {
        //newDrawnPolygon does not contain the first element as closing coordinate, so we we have to add to the end of the array 
        this.drawnPolygon = [...newDrawnPolygon, newDrawnPolygon[0]]
    }

    @action setIsLoading(newisLoading: boolean) {
        this.isLoading = newisLoading;
    }
}

const dataPointsStore = new DataPoints();
export default dataPointsStore;
