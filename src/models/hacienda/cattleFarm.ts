export interface CattleFarm{
    id: string,
    latitude: number,
    longitude: number,
    name: string,
    hectare: number,
    email: string,
    active: boolean,
    fkWeathers: string,
    fkThirds: string
}