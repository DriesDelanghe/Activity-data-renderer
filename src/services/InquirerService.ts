import {Service} from "typedi";
import * as inquirer from "inquirer";
import {Choice} from "../models/Inquirer/Choice";
import Separator from "inquirer/lib/objects/separator";

@Service()
export class InquirerService {

    async Checkbox(title: string, choices: (Choice | Separator)[], validate: Function) {
        const {value} = await inquirer.prompt([
            {
                type: "checkbox",
                message: title,
                name: "value",
                choices: choices,
                validate(answers?: any): boolean | string | Promise<boolean | string> {
                    return validate(answers)
                }
            }
        ])

        return value
    }

    async Input(title: string, validate: Function) {
        const {value} = await inquirer.prompt([
            {
                type: "input",
                name: "value",
                message: title,
                validate(answers: any): boolean | string | Promise<boolean | string> {
                    return validate(answers)
                }
            }
        ])
        return value
    }
}