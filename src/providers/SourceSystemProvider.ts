import {Service} from "typedi";
import {EnumProvider} from "./EnumProvider";
import {SourceSystems} from "../models/Values/SourceSystems";


@Service()
export class SourceSystemProvider {

    constructor(private enumProvider: EnumProvider) {
    }

    Random () {
        return this.enumProvider.GetRandom(SourceSystems)
    }
}
