import {Service} from "typedi";
import {InvalidArgumentException} from "../exceptions/InvalidArgumentException";


@Service()
export class DateProvider {

    private endDate : Date
    private startDate : Date

    constructor() {
        this.setEndDate(new Date())
    }

    setEndDate(endDate: Date) : DateProvider{
        this.endDate = new Date(endDate.getTime())
        return this
    }

    PastHour() : Date {
        const refDate = new Date()
        refDate.setHours(refDate.getHours() - 1)
        this.startDate = new Date(refDate.getTime())
        return this.generateRandomDate()
    }

    PastDay() : Date {
        const refDate = new Date()
        refDate.setHours(0,0,0,0)
        this.startDate = new Date(refDate.getTime())
        return this.generateRandomDate()
    }

    PastWeek () : Date {
        this.startDate = this.dateWithOffset(7)
        return this.generateRandomDate()
    }

    PastMonth() : Date {
        this.startDate = this.dateWithOffset(31)
        return this.generateRandomDate()
    }

    PastYear() : Date {
        this.startDate = this.dateWithOffset(365)
        return this.generateRandomDate()
    }

    private dateWithOffset (offset: number) {
        const refDate = new Date(this.endDate.getTime())
        refDate.setDate(refDate.getDate() - offset)
        return refDate;
    }

    private generateRandomDate () {
        if (!this.endDate || !this.startDate)
            throw new InvalidArgumentException(`endDate and startDate should both have a value.\n startDate: ${this.startDate}, endDate: ${this.endDate}`)
        return new Date(this.startDate.getTime() + Math.floor(Math.random() * (this.endDate.getTime() - this.startDate.getTime())))
    }
}