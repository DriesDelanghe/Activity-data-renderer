import {Service} from "typedi";


@Service()
export class InvalidArgumentException extends Error {

    constructor(message : string) {
        super(message);
    }
}