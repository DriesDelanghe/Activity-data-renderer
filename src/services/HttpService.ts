import {Service} from "typedi";
import {Activity} from "../models/Activity/Activity";
import {InvalidArgumentException} from "../exceptions/InvalidArgumentException";
import axios from "axios";


@Service()
export class HttpService {

    async Write(endPoint: string | undefined, data : Activity) : Promise<Activity>{
        if (!endPoint)
            throw new InvalidArgumentException("url can not be empty")
        console.log("\twriting data...")
        const JsonData = this.DataToJSON(data)
        const response = await axios.post(endPoint, JsonData)
            console.log("\tdata written to endpoint")
        return this.JsonToActivity(response.data);
    }

    private JsonToActivity(data: any) : Activity{
        return Object.assign(new Activity(), data)
    }

    private DataToJSON (data : Activity) {
        const formattedData = Object.assign({}, data)
        return JSON.stringify(formattedData)
    }
}