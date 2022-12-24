import { Combination } from "../combination/combination";
import { TypeZone } from "../zone-type";

export interface Charge{
    id: number;
    name: string;
    code: string;
    visitsperday: number;
    maxvisitsperday: number;
    poctime: number; 
    daysperweek: number;
    Combinations?: Combination[];
    zonetypeID?: number;//para creación 
    zonetypeId?: TypeZone | any;
    zonetypeid?: TypeZone | any;
    catalogs?: any[];//para guardar los check seleccionados al crear Charge
}