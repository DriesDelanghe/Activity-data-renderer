import {ReasonBuilder} from "../../src/builders/ReasonBuilder";
import {ReasonProvider} from "../../src/providers/ReasonProvider";
import {ColumnNamesProvider} from "../../src/providers/ColumnNamesProvider";
import {EnumProvider} from "../../src/providers/EnumProvider";
import {Contexts} from "../../src/models/Values/Contexts";
import {ReasonsTechError} from "../../src/models/Values/ReasonsTechError";
import {ReasonsFailed} from "../../src/models/Values/ReasonsFailed";
import {ColumnNames} from "../../src/models/Values/ColumnNames";


describe("ReasonBuilder", () => {

    let sut: ReasonBuilder

    beforeEach(() => {
        const enumProvider = new EnumProvider()
        sut = new ReasonBuilder(new ReasonProvider(enumProvider), new ColumnNamesProvider(enumProvider))
    })

    test("build with reason equals techError", () => {
        const result = sut.WithResult("TechError").Build()
        expect(Object.keys(ReasonsTechError).find(value => value === result)).toBeTruthy()
    })

    test("Build with context and reason equals to techError", () => {
        const result = sut.WithResult("TechError").InContext(Contexts.klantenbestand.toString()).Build()
        expect(Object.keys(ReasonsTechError).find(value => value === result)).toBeTruthy()
    })

    test("build with context and reason equals to failed", () => {
        const context = "klantenbestand"
        const result = sut.WithResult("Failed").InContext(context).Build()
        expect(!!Object.keys(ReasonsFailed).find(reason =>
            !!Object.keys(ColumnNames)
                .find(name =>
                    result === reason.replace("%field%", name)
                        .replace("%name%", context)))
        ).toBeTruthy()
    })

    test("build without parameters throws", () => {
        expect(() => sut.Build()).toThrow(Error)
    })

    test("empty reason throws", () => {
        expect(() => sut.WithResult('')).toThrow(Error)
    })

    test("build with setting reason Failed, no context throws", () => {
        expect(() => sut.WithResult("Failed").Build()).toThrow(Error)
    })

    test("setting reason to Success throws", () => {
        expect(() => sut.WithResult("Success")).toThrow(Error)
    })

    test("setting context to invalid value throws", () => {
        expect(() => sut.InContext("invalid context")).toThrow(Error)
    })

})