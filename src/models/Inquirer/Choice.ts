

export class Choice {

    //name in list
    name : string;
    //value to be saved
    value: string|number|boolean;
    //to display after selection
    short : string;

    constructor(name : string, value? : string|number|boolean, short? : string) {
        this.name = name;
        if (value)
            this.value = value;
        if (short)
            this.short = short;
    }
}