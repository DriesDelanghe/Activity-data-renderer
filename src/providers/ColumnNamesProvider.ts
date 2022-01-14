import {Service} from "typedi";
import {EnumProvider} from "./EnumProvider";
import {ColumnNames} from "../models/Values/ColumnNames";


@Service()
export class ColumnNamesProvider {

    constructor(private enumProvider: EnumProvider) {
    }

    Random() {
        return this.enumProvider.GetRandom(ColumnNames)
    }
}