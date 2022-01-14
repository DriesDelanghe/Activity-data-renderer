import {Service} from "typedi";
import {ActivityScope} from "../models/Activity/ActivityScope";
import {ScopeEntityProvider} from "../providers/ScopeEntityProvider";
import {DateProvider} from "../providers/DateProvider";
import {HashProvider} from "../providers/HashProvider";


@Service()
export class ScopeBuilder {

    private enddate : Date = new Date()

    constructor(private scopeEntityProvider : ScopeEntityProvider,
                private dateProvider : DateProvider,
                private hashProvider: HashProvider) {
    }

    Build() {
        const scope = new ActivityScope()
        scope.Entity = this.scopeEntityProvider.Random()
        scope.HashKey = this.hashProvider.Random()
        scope.LoadDate = this.dateProvider.setEndDate(this.enddate).PastHour()
        return scope
    }

    WithEndDate(endDate : Date) : ScopeBuilder {
        this.enddate = endDate
        return this
    }

}