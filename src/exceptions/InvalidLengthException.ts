import {Service} from "typedi";

@Service()
export class InvalidLengthException extends Error {

    constructor(message: string) {
        super(message);
    }
}