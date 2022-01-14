import {Service} from "typedi";
import {InquirerService} from "../../services/InquirerService";
import {ChoiceObjectBuilder} from "../../builders/ChoiceObjectBuilder";
import {CLIOptions} from "../../models/dataModels/CLIOptions";


@Service()
export class OptionsCLIHandler {

    private doWrite : boolean = false;
    private doPost : boolean = false;

    constructor(private inquirerService : InquirerService,
                private choiceBuilder : ChoiceObjectBuilder) {
    }

    async Run () : Promise<OptionsCLIHandler>{
        await this.Options()
        return this
    }

    async Options () : Promise<void> {
        const choiceArray = [
            this.choiceBuilder.Build("Write to file", "FILE").AsObject(),
            this.choiceBuilder.Build("Post to endpoint", "POST").AsObject()
        ]

        const validate = (value : string[]) => {
            if (value.length < 1){
                return 'select at least one option'
            }
            return true
        }

        const value = await this.inquirerService.Checkbox("Options for activities handling: ", choiceArray, validate)

        if (value.includes("FILE")){
            this.doWrite = true
        }

        if (value.includes("POST")){
            this.doPost = true
        }

        return
    }

    getValues () : CLIOptions {
        return new CLIOptions(this.doWrite, this.doPost)
    }
}