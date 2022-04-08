import {Service} from "typedi";
import {EnumProvider} from "./EnumProvider";
import {Result} from "../models/Values/Result";


@Service()
export class ResultProvider{

    constructor(private enumProvider: EnumProvider) {
    }

    Random() : string {
        return this.enumProvider.GetWeightedRandom(Result, {0:0.85, 1:0.1, 2:0.05})
    }
}
