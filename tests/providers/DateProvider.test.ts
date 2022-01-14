import {DateProvider} from "../../src/providers/DateProvider";


describe("DateProvider returns object", () => {

    let sut: DateProvider
    let refDate : Date

    beforeEach(() => {
        refDate = new Date()
        sut = new DateProvider()
        sut.setEndDate(new Date())
    })

    test("PastYear returns date", () => {
        expect(sut.PastYear()).toBeInstanceOf(Date)
    })

    test("PastMonth returns date", () => {
        expect(sut.PastMonth()).toBeInstanceOf(Date)
    })

    test("PastWeek returns date", () => {
        expect(sut.PastWeek()).toBeInstanceOf(Date)
    })

    test("PastDay returns date", () => {
        expect(sut.PastDay()).toBeInstanceOf(Date)
    })

    test("PastHour returns date", () => {
        expect(sut.PastHour()).toBeInstanceOf(Date)
    })
})

describe("DateProviders only spans given timeframe", () => {

    const iterations = 1000
    let sut: DateProvider
    let refDate : Date

    beforeEach(() => {
        refDate = new Date()
        sut = new DateProvider()
        sut.setEndDate(new Date())
    })

    test("pastYear only spans one year", () => {
        for (let i = 0; i < iterations; i++) {
            expect(sut.PastYear().getTime() >=
                new Date(`${refDate.getFullYear() - 1}-${refDate.getMonth() + 1}-${refDate.getDate()}`).getTime()).toBeTruthy()
        }
    })

    test("pastMonth only spans one month", () => {
        refDate.setDate(refDate.getDate() - 31)
        for (let i = 0; i < iterations; i++) {
            const result = sut.PastMonth()
            if (result.getTime() < refDate.getTime())
                console.log("result date for PastMonth outside of range:", result, "reference date: ", refDate)
            expect(result.getTime() >=
                refDate.getTime()).toBeTruthy()
        }
    })

    test("pastWeek only spans one week", () => {
        refDate.setDate(refDate.getDate() - 7)
        for (let i = 0; i < iterations; i++) {
            const result = sut.PastWeek()
            if (result.getTime() < refDate.getTime())
                console.log("result date for PastWeek outside of range:", result, "reference date: ", refDate)
            expect(result.getTime() >=
                refDate.getTime()).toBeTruthy()
        }
    })

    test("pastDay spans one day", () => {
        refDate.setHours(0,0,0,0)
        for (let i = 0; i < iterations; i++) {
            const result = sut.PastDay()
            if (result.getTime() < refDate.getTime())
                console.log("result date for PastWeek outside of range:", result, "reference date: ", refDate)
            expect(result.getTime() >=
                refDate.getTime()).toBeTruthy()
        }
    })

    test("pastHour spans one hour", () => {
        refDate.setHours(refDate.getHours() - 1)
        for (let i = 0; i < iterations; i++) {
            const result = sut.PastHour()
            if (result.getTime() < refDate.getTime())
                console.log("result date for PastWeek outside of range:", result, "reference date: ", refDate)
            expect(result.getTime() >=
                refDate.getTime()).toBeTruthy()
        }
    })
})