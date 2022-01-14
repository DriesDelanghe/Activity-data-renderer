import {Service} from "typedi";
import {ActivityScope} from "../models/Activity/ActivityScope";
import {ScopeEntityProvider} from "../providers/ScopeEntityProvider";
import {DateProvider} from "../providers/DateProvider";
import {HashProvider} from "../providers/HashProvider";


@Service()
export class ScopeBuilder {

    constructor(private scopeEntityProvider : ScopeEntityProvider,
                private dateProvider : DateProvider,
                private hashProvider: HashProvider) {
    }

    Build() {
        const scope = new ActivityScope()
        scope.Entity = this.scopeEntityProvider.Random()
        scope.HashKey = this.hashProvider.Random()
        scope.LoadDate = this.dateProvider.PastHour()
        return scope
    }

}