export interface Sponsor {
    id: string;
    name: string;
    lastName: string;
    address: string;
    documentNumber: string;
    email: string;
    fkDocumentTypePerson: string;
    active: boolean;
}
