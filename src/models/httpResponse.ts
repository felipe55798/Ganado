export class Response<T> {

    constructor(fields: any) {
      // Quick and dirty extend/assign fields to this model
      for (const f in fields) {
        // @ts-ignore
        this[f] = fields[f];
      }
    }

    succeeded!: Boolean;
    data!: T;
    message!: String;
    errors!: String;
  }