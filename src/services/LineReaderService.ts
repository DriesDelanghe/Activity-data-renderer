import {Service} from "typedi";
import * as readline from 'readline'

@Service()
export class LineReaderService {
    private rl

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output:process.stdout
        })
    }

    Ask(question : string, callback: Function) {
        this.rl.question(question + " :  ", (value) => callback(value))
    }

    Close () {
        this.rl.close()
    }
}