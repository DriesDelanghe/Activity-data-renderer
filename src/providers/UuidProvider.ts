import {Service} from "typedi";
const {v4: uuid} = require('uuid');

@Service()
export class UuidProvider {

    Get(){
        return uuid()
    }
}