import {EnumProvider} from "../../src/providers/EnumProvider";
import {Contexts} from "../../src/models/Values/Contexts";
import {InvalidArgumentException} from "../../src/exceptions/InvalidArgumentException";


describe("EnumProvider", () => {

    let sut: EnumProvider
    const iterations = 1000
    beforeEach(() => {
        sut = new EnumProvider()
    })

    test("Get returns value from enum", () => {
        expect(sut.Get(Contexts, 1)).toEqual(Contexts[1])
    })

    test("Get Random value from enum", () => {
        for (let i = 0; i < iterations; i++) {
            const result = sut.GetRandom(Contexts)
            expect(!!Object.keys(Contexts).find(value => value === result)).toBeTruthy()
        }
    })

    test("Get random value from non-enum throws", () => {
        expect(() => sut.GetRandom("not an enum")).toThrow(Error)
    })

    test("Get value from non-enum throws", () => {
        expect(() => sut.Get("not an enum", 1)).toThrow(Error)
    })
})