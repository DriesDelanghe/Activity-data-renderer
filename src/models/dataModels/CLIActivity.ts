import {DurationOptions} from "../Inquirer/OptionEnums/DurationOptions";


export class CLIActivity {

    constructor(private _dataLength: number,
                private _scopeLength: number,
                private _timeSpan: DurationOptions) {
    }

    get dataLength () {
        return this._dataLength
    }

    get scopeLength () {
        return this._scopeLength
    }

    get timeSpan () {
        return this._timeSpan
    }
}