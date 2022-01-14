import {Service} from "typedi";
import {InquirerService} from "../../services/InquirerService";
import {ChoiceObjectBuilder} from "../../builders/ChoiceObjectBuilder";
import inquirer from "inquirer";
import {FileLocationOptions} from "../../models/Inquirer/OptionEnums/FileLocationOptions";
import {appRoot} from "../../Startup";
import {CLIFile} from "../../models/dataModels/CLIFile";


@Service()
export class WriterCLIHandler {

    private filepath: string;
    private pathRoot: FileLocationOptions | undefined;

    constructor(private inquirerService: InquirerService,
                private choiceObjectBuilder: ChoiceObjectBuilder) {
    }

    async Run(): Promise<WriterCLIHandler> {
        await this.WriterSetup()
        return this
    }

    private async WriterSetup(): Promise<void> {
        const optionArray = ["DEFAULT", "PROJECT", "SYSTEM"]
        const choiceArray = [
            this.choiceObjectBuilder.Build("Default options (write to ./data/data.json)", optionArray[0]).AsObject(),
            new inquirer.Separator("-- custom options --"),
            this.choiceObjectBuilder.Build("custom path from project root", optionArray[1]).AsObject(),
            this.choiceObjectBuilder.Build("custom path from system root", optionArray[2]).AsObject()
        ]

        const validate = (value: string) => {
            if (value.length != 1) {
                return 'select only one option'
            }
            return true
        }

        const value = await this.inquirerService.Checkbox("File writer options: ", choiceArray, validate)

        if (value.includes(optionArray[0])) {
            this.filepath = appRoot + "/data/data.json"
            this.pathRoot = undefined
        }
        if (value.includes(optionArray[1])) {
            this.pathRoot = FileLocationOptions.PROGRAM
        }
        if (value.includes(optionArray[2])) {
            this.pathRoot = FileLocationOptions.ROOT
        }
        if (!value.some((r: string) => optionArray.includes(r))) {
            throw new Error("Returned value is not implemented")
        }

        if (this.pathRoot) {
            await this.getFilePath()
        }
        return
    }

    async getFilePath() {

        let value = await this.inquirerService.Input("filepath: ", () => true)

        if (this.pathRoot === FileLocationOptions.PROGRAM) {
            if (!value.startsWith("/")) {
                value = "/" + value
            }
            this.filepath = appRoot + value
        }
        if (this.pathRoot === FileLocationOptions.ROOT) {
            this.filepath = value
        }
    }

    getValues(): CLIFile {
        return new CLIFile(this.filepath)
    }
}