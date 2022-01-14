export class CLIOptions {
    constructor(private _doWrite: boolean,
                private _doPost: boolean) {
    }

    get doWrite() {
        return this._doWrite
    }

    get doPost() {
        return this._doPost
    }
}