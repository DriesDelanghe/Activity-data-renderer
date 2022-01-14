import 'reflect-metadata';
import {WriterService} from "./services/WriterService";
import {HttpService} from "./services/HttpService";
import {Container} from "typedi";
import {ActivityBuilder} from "./builders/ActivityBuilder";
import path from "path";
import {ActivityCLIHandler} from "./handlers/cli/ActivityCLIHandler";
import {WriterCLIHandler} from "./handlers/cli/WriterCLIHandler";
import {CLIActivity} from "./models/dataModels/CLIActivity";
import {CLIFile} from "./models/dataModels/CLIFile";
import {PostCLIHandler} from "./handlers/cli/PostCLIHandler";
import {CLIPost} from "./models/dataModels/CLIPost";
import {OptionsCLIHandler} from "./handlers/cli/OptionsCLIHandler";
import {CLIOptions} from "./models/dataModels/CLIOptions";
import {ActivityHandler} from "./handlers/ActivityHandler";


export const appRoot: string = path.resolve(__dirname, '..', '..')

export class Startup {

    private cliOptions: CLIOptions

    //settings for write to file
    private cliFile: CLIFile

    //settings for post to url
    private cliPost: CLIPost

    //settings for activity
    private cliActivity: CLIActivity


    constructor(private activityHandler : ActivityHandler,
                private activityCLIHandler: ActivityCLIHandler,
                private writerCLIHandler: WriterCLIHandler,
                private postCLIHandler: PostCLIHandler,
                private optionsCLIHandler: OptionsCLIHandler) {
    }

    async Run() {
        console.clear()
        console.log("\nWelcome To the data renderer!\n")
        //this.Setup()
        const activityManager = await this.activityCLIHandler.Run()
        this.cliActivity = activityManager.getValues()
        const optionsManager = await this.optionsCLIHandler.Run()
        this.cliOptions = optionsManager.getValues()

        if (this.cliOptions.doWrite) {
            const writerManager = await this.writerCLIHandler.Run()
            this.cliFile = writerManager.getValues()
        }
        if (this.cliOptions.doPost) {
            const postManager = await this.postCLIHandler.Run()
            this.cliPost = postManager.getValues()
        }
        console.log("activity settings: ", Object.assign({}, this.cliActivity))
        console.log("write settings: ", Object.assign({}, this.cliFile))
        console.log("post settings: ", Object.assign({}, this.cliPost))
        await this.activityHandler.withActivitySettings(this.cliActivity).withPostSettings(this.cliPost)
            .withWriteSettings(this.cliFile).Run()
    }
}

const activityHandler = Container.get(ActivityHandler)
const activityCLIHandler = Container.get(ActivityCLIHandler)
const writerCLIHandler = Container.get(WriterCLIHandler)
const postCLIHandler = Container.get(PostCLIHandler)
const optionsCLIHandler = Container.get(OptionsCLIHandler)

new Startup(activityHandler, activityCLIHandler, writerCLIHandler, postCLIHandler, optionsCLIHandler).Run()

