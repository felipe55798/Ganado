import { Parameter } from "../catalog";

export interface Combination{
    id?: number;
    Parameters: Parameter[];
    FrecuencyId: number;
    FrecuencyName?: string;//Opcional
    parmascombination?: any[];
    agrupado?: boolean; //señal para saber si ya vienen los parametros agrupados en array
    frequencyid?: any;
}