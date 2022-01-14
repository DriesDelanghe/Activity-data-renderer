import {Service} from "typedi";
import * as fs from 'fs'
import {Activity} from "../models/Activity/Activity";
import {appRoot} from "../Startup";
import path from "path";

@Service()
export class WriterService {

    private readonly appRoot : string

    constructor() {
        this.appRoot = appRoot;
    }

    Write(data : Activity[], filepath : string) {
        console.log("writing data to: ", filepath)
        const basePath : string = path.resolve(filepath, '..')
        fs.mkdirSync(basePath, {recursive: true})
        fs.writeFileSync(filepath, this.DataToJSON(data))
    }

    private DataToJSON (data : Activity[]) {
        const formattedData = [...data.map(activity => Object.assign({}, activity))]
        return JSON.stringify(formattedData, null, 2)
    }
}