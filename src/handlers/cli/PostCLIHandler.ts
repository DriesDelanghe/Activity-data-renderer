import {Service} from "typedi";
import {InquirerService} from "../../services/InquirerService";
import {ChoiceObjectBuilder} from "../../builders/ChoiceObjectBuilder";
import {CLIPost} from "../../models/dataModels/CLIPost";
import * as validUrl from 'valid-url'

@Service()
export class PostCLIHandler {

    private endpoint : string

    constructor(private inquirerService : InquirerService,
                private choiceBuilder : ChoiceObjectBuilder) {
    }

    async Run() : Promise<PostCLIHandler> {
        await this.postSetup()
        return this
    }

    async postSetup () : Promise<void>{
        const choiceArray = [
            this.choiceBuilder.Build("use default endpoint (http://localhost:7071/api/activities)", "DEFAULT").AsObject(),
            this.choiceBuilder.Build("use custom endpoint", "CUSTOM").AsObject()
        ]

        const validate = (value : string) => {
            if (value.length != 1){
                return "only select one option"
            }
            return true
        }

        const value = await this.inquirerService.Checkbox("Settings for writing to endpoint: ", choiceArray, validate)

        if (value.includes("DEFAULT")){
            this.endpoint = "http://localhost:7071/api/activities"
        }
        if (value.includes("CUSTOM")){
            await this.customEndpoint()
        }
        return
    }

    async customEndpoint () {

        const validate = (value : string) => {
            if (!validUrl.isUri(value)){
                return 'value is not a valid url'
            }
            return true
        }

        const value = await this.inquirerService.Input("filepath: ", validate)
        this.endpoint = value
    }

    getValues () {
        return new CLIPost(this.endpoint)
    }
}