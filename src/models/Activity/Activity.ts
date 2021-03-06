import {ActivityScope} from "./ActivityScope";
import {Service} from "typedi";

@Service()
export class Activity {

    businessEntityType: string;
    context: string;
    timeStamp: Date;
    eTag: string;
    itemType: string;
    operationId: string;
    businessKey: string;
    result: string;
    reason?: string;
    scope: ActivityScope[];
    sourceSystem: String;

    constructor(Scope?: ActivityScope[]) {
        if (Scope)
            this.scope = Scope.map(scope => Object.assign({}, scope));
    }

}
