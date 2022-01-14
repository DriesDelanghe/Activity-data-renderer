import {ReasonProvider} from "../../src/providers/ReasonProvider";
import {EnumProvider} from "../../src/providers/EnumProvider";
import {ReasonsFailed} from "../../src/models/Values/ReasonsFailed";
import {ReasonsTechError} from "../../src/models/Values/ReasonsTechError";
import {InvalidArgumentException} from "../../src/exceptions/InvalidArgumentException";


describe("ReasonProvider", () => {

    let sut : ReasonProvider

    beforeEach(() => {
        sut = new ReasonProvider(new EnumProvider())
    })

    test("Random with setting reason to Failed", () => {
        const result = sut.WithResult("Failed").Random()
        expect(Object.keys(ReasonsFailed).find(value => result === value)).toBeTruthy()
    })

    test("Random with setting reason to TechError", () => {
        const result = sut.WithResult("TechError").Random()
        expect(Object.keys(ReasonsTechError).find(value => result === value)).toBeTruthy()
    })

    test("Random without setting reason", () => {
        expect(() => sut.Random()).toThrow(Error)
    })

    test("Random with setting reason to success", () => {
        expect(() => sut.WithResult("Success").Random()).toThrow(Error)
    })
})