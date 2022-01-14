import {Service} from "typedi";
import {ReasonProvider} from "../providers/ReasonProvider";
import {ColumnNamesProvider} from "../providers/ColumnNamesProvider";
import {InvalidArgumentException} from "../exceptions/InvalidArgumentException";
import {Contexts} from "../models/Values/Contexts";


@Service()
export class ReasonBuilder{

    private result : string
    private context : string

    constructor(private reasonProvider: ReasonProvider,
                private columnNamesProvider: ColumnNamesProvider) {
    }

    WithResult(result: string) {
        if (!result){
            throw new InvalidArgumentException("result should have a value")
        }
        if (result !== "Failed" && result !== "TechError") {
            throw new InvalidArgumentException("result should have value Failed or TechError")
        }
        this.result = result
        return this
    }

    InContext(context: string) {
        if (!Object.keys(Contexts).find(value => context === value))
            throw new InvalidArgumentException("Context should be value of Contexts enum")
        this.context = context
        return this
    }

    Build() {
        if (!this.result)
            throw new InvalidArgumentException("Set result before getting value")

        if (this.result === "Failed"){
            if (!this.context)
                throw new InvalidArgumentException("Set context before getting value if result is failed")
            return this.reasonProvider.WithResult(this.result).Random()
                .replace("%name%", this.context)
                .replace("%field%", this.columnNamesProvider.Random())
        }
        return this.reasonProvider.WithResult(this.result).Random()
    }
}