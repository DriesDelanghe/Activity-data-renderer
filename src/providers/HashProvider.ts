import * as crypto from 'crypto'
import {Service} from "typedi";

@Service()
export class HashProvider {

    Random () : string {
        let randomKey : string = Math.random().toString(36).replace(/[^a-z]+/g, '')
        return crypto.createHmac('sha256', randomKey).update('json').digest('base64')
    }

    ConvertString (value : string) : string {
        return crypto.createHmac('sha256', value).update('json').digest('base64')
    }
}