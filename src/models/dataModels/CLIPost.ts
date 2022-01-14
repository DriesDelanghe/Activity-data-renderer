

export class CLIPost {
    constructor(private _endpoint : string) {
    }

    get endpoint () {
        return this._endpoint
    }
}