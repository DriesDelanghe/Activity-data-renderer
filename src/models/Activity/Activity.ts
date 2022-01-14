import {ActivityScope} from "./ActivityScope";
import {Service} from "typedi";

@Service()
export class Activity {

    RecordKey: string;
    Context: string;
    Timestamp: Date;
    ETag: string;
    ItemType: string;
    OperationId: string;
    BusinessKey: string;
    Result: string;
    Reason?: string;
    Scope: ActivityScope[];


    constructor(Scope?: ActivityScope[]) {
        if (Scope)
            this.Scope = Scope.map(scope => Object.assign({}, scope));
    }

}