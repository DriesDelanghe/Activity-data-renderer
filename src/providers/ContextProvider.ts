import {Service} from "typedi";
import {EnumProvider} from "./EnumProvider";
import {Contexts} from "../models/Values/Contexts";

@Service()
export class ContextProvider {

    constructor(private enumProvider: EnumProvider) {
    }

    Random() {
        return this.enumProvider.GetRandom(Contexts)
    }
}