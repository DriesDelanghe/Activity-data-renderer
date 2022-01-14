import {Service} from "typedi";
import {InquirerService} from "../../services/InquirerService";
import {DurationOptions} from "../../models/Inquirer/OptionEnums/DurationOptions";
import {ChoiceObjectBuilder} from "../../builders/ChoiceObjectBuilder";
import inquirer from "inquirer";
import {CLIActivity} from "../../models/dataModels/CLIActivity";


@Service()
export class ActivityCLIHandler {

    private customDataLength: boolean;
    private customScopeLength: boolean;
    private customTimeSpan: boolean;

    private dataLength: number
    private activityTimeSpan: DurationOptions;
    private maxScopeLength: number;

    constructor(private inquirerService: InquirerService,
                private  choiceObjectBuilder: ChoiceObjectBuilder) {
    }

    async Run() : Promise<ActivityCLIHandler>{
        await this.activitySetup()
        return this
    }

    async activitySetup() {
        const choiceArray = [
            this.choiceObjectBuilder.Build("Default options (dataLength: 10, scopeLength: 10, timespan: YEAR)", "DEFAULT").AsObject(),
            new inquirer.Separator("-- custom settings --"),
            this.choiceObjectBuilder.Build("Custom data length", "DATA_LENGTH").AsObject(),
            this.choiceObjectBuilder.Build("Custom scope length", "SCOPE_LENGTH").AsObject(),
            this.choiceObjectBuilder.Build("Custom timespan", "TIME_SPAN").AsObject(),
        ]

        const validate = (value: string) => {
            if (value.length > 1 && value.includes("DEFAULT")) {
                return "cannot select custom options if default is selected"
            }
            if (value.length < 1) {
                return "select at least one option"
            }
            return true
        }
        const value = await this.inquirerService.Checkbox("Select setup for activity", choiceArray, validate)
        if (value.includes("DEFAULT")) {
            this.dataLength = 10
            this.maxScopeLength = 10
            this.activityTimeSpan = DurationOptions.YEAR
            return
        }
        if (!value.includes("DATA_LENGTH")) {
            this.dataLength = 10
        } else {
            this.customDataLength = true
        }
        if (!value.includes("SCOPE_LENGTH")) {
            this.maxScopeLength = 10
        } else {
            this.customScopeLength = true
        }
        if (!value.includes("TIME_SPAN")) {
            this.activityTimeSpan = DurationOptions.YEAR
        } else {
            this.customTimeSpan = true
        }
        await this.Selection()
    }

    async Selection() {
        if (this.customDataLength && !this.dataLength) {
            await this.dataLengthSetup()
            return
        }
        if (this.customScopeLength && !this.maxScopeLength) {
            await this.ScopeLengthSetup()
            return
        }
        if (this.customTimeSpan && !this.activityTimeSpan) {
            await this.ActivitySpanSetup()
            return
        }
    }

    async dataLengthSetup() {

        const validate = (value: string) => {
            if (!Number(value)) {
                return 'amount needs to be a number'
            }
            return true
        }

        const value = await this.inquirerService.Input("amount of activity objects: ", validate)
        this.dataLength = Number(value)
        await this.Selection()
    }

    async ScopeLengthSetup() {

        const validate = (value: string) => {
            if (!Number(value)) {
                return 'amount needs to be a number'
            }
            return true
        }

        const value = await this.inquirerService.Input("max amount of scope objects in activity: ", validate)

        this.maxScopeLength = Number(value)
        await this.Selection()
    }

    async ActivitySpanSetup() {

        const choiceArray = [
            this.choiceObjectBuilder.Build("Default (year)", DurationOptions.YEAR).AsObject(),
            new inquirer.Separator("-- custom options --"),
            this.choiceObjectBuilder.Build("Past hour", DurationOptions.HOUR).AsObject(),
            this.choiceObjectBuilder.Build("Past day", DurationOptions.DAY).AsObject(),
            this.choiceObjectBuilder.Build("Past week", DurationOptions.WEEK).AsObject(),
            this.choiceObjectBuilder.Build("Past month", DurationOptions.MONTH).AsObject(),
            this.choiceObjectBuilder.Build("Past year", DurationOptions.YEAR).AsObject(),
        ]

        const validate = (value: string) => {
            if (value.length != 1) {
                return "Only select one option"
            }
            return true
        }

        const value = await this.inquirerService.Checkbox("Over what time should the activities span?", choiceArray, validate)

        switch (DurationOptions[Number(value)]) {
            case "HOUR":
                this.activityTimeSpan = DurationOptions.HOUR
                break
            case "DAY":
                this.activityTimeSpan = DurationOptions.DAY
                break
            case "WEEK":
                this.activityTimeSpan = DurationOptions.WEEK
                break
            case "MONTH":
                this.activityTimeSpan = DurationOptions.MONTH
                break
            case "YEAR":
                this.activityTimeSpan = DurationOptions.YEAR
                break
            default:
                throw new Error("Value is not recognised")
        }
        await this.Selection()

    }

    getValues() : CLIActivity {
        return new CLIActivity(this.dataLength, this.maxScopeLength, this.activityTimeSpan)
    }

}