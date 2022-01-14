import {Service} from "typedi";
import {EnumProvider} from "./EnumProvider";
import {InvalidArgumentException} from "../exceptions/InvalidArgumentException";
import {ReasonsFailed} from "../models/Values/ReasonsFailed";
import {ReasonsTechError} from "../models/Values/ReasonsTechError";


@Service()
export class ReasonProvider {

    private result: string

    constructor(private enumProvider: EnumProvider) {
    }

    Random() {
        if (!this.result)
            throw new InvalidArgumentException("Set result before getting value")
        if (this.result === "Failed")
            return this.enumProvider.GetRandom(ReasonsFailed)

        return this.enumProvider.GetRandom(ReasonsTechError)
    }

    WithResult(result: string) {
        if (!result || (result !== "Failed" && result !== "TechError")) {
            throw new InvalidArgumentException("result should have value Failed or TechError")
        }
        this.result = result
        return this
    }
}