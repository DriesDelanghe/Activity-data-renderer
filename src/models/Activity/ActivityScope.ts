import {Service} from "typedi";

@Service()
export class ActivityScope {

    HashKey: String;
    LoadDate: Date;
    Entity: String;
}