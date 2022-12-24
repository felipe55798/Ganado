import { Value } from "./Value";

export interface Parameter{
    id?: number;
    name: string;
    column: string;
    description: string;
    values?: Value[];
    selected?: boolean; //bandera para chekList
}
