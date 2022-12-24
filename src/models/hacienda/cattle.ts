export interface Cattle{
    id: string,
    dateOfBirth: Date,
    chipCode: 12345,
    name: string,
    active: boolean,
    fkLotes?: string,
    fkCattleTypes?: string,
    fkCattlesFather?: string,
    fkCattlesMother?: string
}