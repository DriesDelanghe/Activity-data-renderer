import {Service} from "typedi";
import {WriterService} from "../services/WriterService";
import {HttpService} from "../services/HttpService";
import {ActivityBuilder} from "../builders/ActivityBuilder";
import {CLIFile} from "../models/dataModels/CLIFile";
import {CLIPost} from "../models/dataModels/CLIPost";
import {CLIActivity} from "../models/dataModels/CLIActivity";
import {Activity} from "../models/Activity/Activity";


@Service()
export class ActivityHandler {

    private cliFile: CLIFile | undefined
    private cliPost: CLIPost | undefined
    private cliActivity: CLIActivity

    constructor(private writerService: WriterService,
                private httpService: HttpService,
                private activityBuilder: ActivityBuilder) {
    }

    withActivitySettings(cliActivity: CLIActivity): ActivityHandler {
        this.cliActivity = cliActivity
        return this
    }

    withPostSettings(cliPost: CLIPost | undefined): ActivityHandler {
        if (!cliPost) return this
        this.cliPost = cliPost
        return this
    }

    withWriteSettings(cliFile: CLIFile | undefined): ActivityHandler {
        if (!cliFile) return this
        this.cliFile = cliFile;
        return this
    }

    async Run() {
        if ((!this.cliPost || !this.cliFile) && !this.cliActivity) {
            throw new Error("To run this cliActivity needs to be set to a value and cliPost and/or cliFile need to be set to a value")
        }

        let activityArray: Activity[] = []
        for (let i = 0; i < this.cliActivity.dataLength; i++) {
            activityArray = [...activityArray,
                this.activityBuilder.WithMaxScopeArrayLength(this.cliActivity.scopeLength)
                    .WithTimeSpan(this.cliActivity.timeSpan).Build()]
        }

        if (this.cliFile?.filepath){
            this.writerService.Write(activityArray, this.cliFile.filepath)
        }

        if (this.cliPost?.endpoint) {
            console.log("writing data to ", this.cliPost.endpoint)
            for (let i = 0; i < this.cliActivity.dataLength; i++) {
                console.log(`writing activity ${i + 1}/${this.cliActivity.dataLength} to endpoint`)
                await this.httpService.Write(this.cliPost.endpoint, activityArray[i])
            }
        }

        console.log("Finished running data renderer!")
    }

}