import {Service} from "typedi";
import {Choice} from "../models/Inquirer/Choice";


@Service()
export class ChoiceObjectBuilder {

    private choice : Choice;

    Build(name: string, value? : string|number|boolean, short? : string) {
        this.choice = new Choice(name)
        if (value)
            this.choice.value = value
        if (short)
            this.choice.short = short

        return this
    }

    AsObject() {
        if (!this.choice?.name){
            throw new Error("First build object before trying to return value")
        }
        return Object.assign({}, this.choice)
    }

    AsChoice() {
        if (!this.choice?.name){
            throw new Error("First build object before trying to return value")
        }
        return this.choice
    }
}