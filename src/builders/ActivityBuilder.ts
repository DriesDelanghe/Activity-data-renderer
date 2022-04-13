import {Service} from "typedi";
import {Activity} from "../models/Activity/Activity";
import {ScopeArrayBuilder} from "./ScopeArrayBuilder";
import {HashProvider} from "../providers/HashProvider";
import {ContextProvider} from "../providers/ContextProvider";
import {DateProvider} from "../providers/DateProvider";
import {UuidProvider} from "../providers/UuidProvider";
import {InvalidArgumentException} from "../exceptions/InvalidArgumentException";
import {ResultProvider} from "../providers/ResultProvider";
import {ReasonBuilder} from "./ReasonBuilder";
import {DurationOptions} from "../models/Inquirer/OptionEnums/DurationOptions";
import {SourceSystemProvider} from "../providers/SourceSystemProvider";
import {BusinessEntityTypes} from "../models/Values/BusinessEntityTypes";
import {BusinessEntityTypeProvider} from "../providers/BusinessEntityTypeProvider";


@Service()
export class ActivityBuilder{

    private maxScopeLength : number = 10
    private timespan : DurationOptions = DurationOptions.YEAR

    constructor(private scopeArrayBuilder: ScopeArrayBuilder,
                private hashProvider: HashProvider,
                private contextProvider: ContextProvider,
                private dateProvider : DateProvider,
                private uuidProvider: UuidProvider,
                private resultProvider: ResultProvider,
                private reasonBuilder: ReasonBuilder,
                private sourceSystemProvider: SourceSystemProvider,
                private businessEntityTypeProvider: BusinessEntityTypeProvider) {
    }

    Build() : Activity {
        const randomDate : Date = this.getRandomDate()
        const scope = this.scopeArrayBuilder.WithArrayLength(this.getScopeLength()).WithEndDate(randomDate).Build()
        let activity = new Activity(scope)
        activity.businessEntityType = this.businessEntityTypeProvider.Random()
        activity.context = this.contextProvider.Random()
        activity.timeStamp = randomDate
        activity.sourceSystem = this.sourceSystemProvider.Random()
        activity.eTag = this.hashProvider.Random()
        activity.itemType = "Activity"
        activity.operationId = this.uuidProvider.Get()
        activity.businessKey = this.hashProvider.Random()
        activity.result = this.resultProvider.Random()
        if (activity.result !== "Success"){
            activity.reason = this.reasonBuilder.InContext(activity.context).WithResult(activity.result).Build()
        }
        return activity
    }

    private getScopeLength () : number {
        return Math.floor(Math.random() * (this.maxScopeLength - 1)) + 1
    }

    private getRandomDate () : Date {
        switch (this.timespan){
            case DurationOptions.HOUR:
                return this.dateProvider.setEndDate(new Date()).PastHour()
            case DurationOptions.DAY:
                return this.dateProvider.setEndDate(new Date()).PastDay()
            case DurationOptions.WEEK:
                return this.dateProvider.setEndDate(new Date()).PastWeek()
            case DurationOptions.MONTH:
                return this.dateProvider.setEndDate(new Date()).PastMonth()
            case DurationOptions.YEAR:
                return this.dateProvider.setEndDate(new Date()).PastYear()
            default:
                return this.dateProvider.setEndDate(new Date()).PastYear()
        }
    }

    WithMaxScopeArrayLength(maxLength : number) : ActivityBuilder{
        if (maxLength < 1){
            throw new InvalidArgumentException("Length of Context Array should be larger than 1")
        }
        this.maxScopeLength = maxLength
        return this
    }

    WithTimeSpan (timespan : DurationOptions) : ActivityBuilder{
        this.timespan = timespan
        return this
    }
}
