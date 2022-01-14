import {Service} from "typedi";
import {ScopeBuilder} from "./ScopeBuilder";
import {ActivityScope} from "../models/Activity/ActivityScope";
import {InvalidLengthException} from "../exceptions/InvalidLengthException";


@Service()
export class ScopeArrayBuilder {

    private length : number = 1
    private endDate : Date = new Date()

    constructor(private scopeBuilder: ScopeBuilder) {
    }

    Build() {
        let scopeArray : ActivityScope[] = []
        for (let i = 0; i < this.length; i++) {
            scopeArray = [...scopeArray, this.scopeBuilder.Build()]
        }
        return scopeArray
    }

    WithArrayLength(length : number) : ScopeArrayBuilder {
        if  (length < 1)
            throw new InvalidLengthException("Length for Scope Array should be larger than 1")
        this.length = length
        return this
    }

    WithEndDate(endDate : Date) : ScopeArrayBuilder {
        this.endDate = endDate
        return this
    }

}