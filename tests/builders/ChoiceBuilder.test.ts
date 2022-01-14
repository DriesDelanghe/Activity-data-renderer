import {ChoiceObjectBuilder} from "../../src/builders/ChoiceObjectBuilder";
import {Choice} from "../../src/models/Inquirer/Choice";


describe("ChoiceBuilder", () => {
    let sut : ChoiceObjectBuilder

    beforeEach(() => {
        sut = new ChoiceObjectBuilder()
    })

    test("Build as object returns object", () => {
        const result = sut.Build("some name").AsObject()
        expect(typeof result === "object").toBeTruthy()
        expect(!(result instanceof Choice)).toBeTruthy()
        expect(result.name).toEqual("some name")
    })

    test("Build as choice returns choice object", () => {
        const result = sut.Build("some name").AsChoice()
        expect(result).toBeInstanceOf(Choice)
        expect(result.name).toEqual("some name")
    })

    test("Build with all values returns correct object", () => {
        const result = sut.Build("some name", "some value", "something short").AsChoice()
        expect(result).toBeInstanceOf(Choice)
        expect(result.name).toEqual("some name")
        expect(result.value).toEqual("some value")
        expect(result.short).toEqual("something short")
    })

    test("Trying to return object without build throws", () => {
        expect(() => sut.AsObject()).toThrow(Error)
    })

    test("Trying to return Choice without build throws", () => {
        expect(() => sut.AsChoice()).toThrow(Error)
    })
})