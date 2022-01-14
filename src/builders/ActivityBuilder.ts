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
                private reasonBuilder: ReasonBuilder) {
    }

    Build() : Activity {
        const scope = this.scopeArrayBuilder.WithArrayLength(this.getScopeLength()).Build()
        let activity = new Activity(scope)
        activity.RecordKey = this.hashProvider.Random()
        activity.Context = this.contextProvider.Random()
        activity.Timestamp = this.getRandomDate()
        activity.ETag = this.hashProvider.Random()
        activity.ItemType = "activity"
        activity.OperationId = this.uuidProvider.Get()
        activity.BusinessKey = this.hashProvider.Random()
        activity.Result = this.resultProvider.Random()
        if (activity.Result !== "Success"){
            activity.Reason = this.reasonBuilder.InContext(activity.Context).WithResult(activity.Result).Build()
        }
        return activity
    }

    private getScopeLength () : number {
        return Math.floor(Math.random() * (this.maxScopeLength - 1)) + 1
    }

    private getRandomDate () : Date {
        switch (this.timespan){
            case DurationOptions.HOUR:
                return this.dateProvider.PastHour()
            case DurationOptions.DAY:
                return this.dateProvider.PastDay()
            case DurationOptions.WEEK:
                return this.dateProvider.PastWeek()
            case DurationOptions.MONTH:
                return this.dateProvider.PastMonth()
            case DurationOptions.YEAR:
                return this.dateProvider.PastYear()
            default:
                return this.dateProvider.PastYear()
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