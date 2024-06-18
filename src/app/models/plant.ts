import { Country } from "./country";

export interface Plant {
    id: number;
    name: string;
    numberOfReadings: number;
    numberOfRedAlerts: number;
    numberOfMediumAlerts: number;
    numberOfDisabledSensors: number;
    country: Country;
}