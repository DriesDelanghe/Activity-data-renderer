import {Service} from "typedi";
import {EnumProvider} from "./EnumProvider";
import {BusinessEntityTypes} from "../models/Values/BusinessEntityTypes";

@Service()
export class BusinessEntityTypeProvider {

    constructor(private enumProvider: EnumProvider) {
    }

    Random() {
        return this.enumProvider.GetRandom(BusinessEntityTypes);
    }
}
