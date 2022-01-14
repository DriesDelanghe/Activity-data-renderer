export class CLIFile {
    constructor(private _filepath: string) {
    }

    get filepath () {
        return this._filepath
    }
}