import {Service} from "typedi";
import {InvalidArgumentException} from "../exceptions/InvalidArgumentException";


@Service()
export class EnumProvider {

    GetRandom(Enum : any) {
        if (!(typeof Enum === "object") ||  Object.keys(Enum)?.length < 1)
            throw new InvalidArgumentException("Enum does not contain keys, prop might not be an enum")
        const index = Math.floor(Math.random() * Object.keys(Enum).length / 2 )
        return this.Get(Enum, index)
    }

    GetWeightedRandom(Enum: any, spec: any) {
        if (!(typeof Enum === "object") ||  Object.keys(Enum)?.length < 1)
            throw new InvalidArgumentException("Enum does not contain keys, prop might not be an enum")
        let sum = 0;
        const r = Math.random();
        let i: number;
        // @ts-ignore
        for (i in spec) {
            sum += spec[i]
            if (r <= sum) return this.Get(Enum, i)
        }
    }

    Get(Enum : any, index : number) {
        if (!(typeof Enum === "object") || Object.keys(Enum).length < 1)
            throw new InvalidArgumentException("Enum does not contain keys, prop might not be an enum")
        return Enum[index].toString()
    }
}
