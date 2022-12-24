export interface Lote {
    id: number,
    number: number,
    quantityCattle: number,
    description: string,
    active: true,
    fkFarmYards?: string //Corral al q pertenece
}