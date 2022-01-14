import {Service} from "typedi";
import {ScopeEntities} from "../models/Values/ScopeEntities";
import {EnumProvider} from "./EnumProvider";


@Service()
export class ScopeEntityProvider {

    constructor(private enumProvider: EnumProvider) {
    }

    Random() : string {
        return this.enumProvider.GetRandom(ScopeEntities)
    }
}