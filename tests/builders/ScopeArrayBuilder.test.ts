import {ScopeArrayBuilder} from "../../src/builders/ScopeArrayBuilder";
import {ScopeBuilder} from "../../src/builders/ScopeBuilder";
import {ActivityScope} from "../../src/models/Activity/ActivityScope";
import {ScopeEntityProvider} from "../../src/providers/ScopeEntityProvider";
import {DateProvider} from "../../src/providers/DateProvider";
import {HashProvider} from "../../src/providers/HashProvider";
import {EnumProvider} from "../../src/providers/EnumProvider";


describe("ScopeArrayBuilder", () => {
    let sut : ScopeArrayBuilder

    beforeEach(() => {
        const scopeEntityProvider = new ScopeEntityProvider(new EnumProvider())
        const scopeBuilder = new ScopeBuilder(scopeEntityProvider, new DateProvider(), new HashProvider())
        sut = new ScopeArrayBuilder(scopeBuilder)
    })

    test("Only Build function returns array of length 1", () => {
        const result = sut.Build()
        expect(result).toBeInstanceOf(Array)
        expect(result).toHaveLength(1)
        expect(result[0]).toBeInstanceOf(ActivityScope)
    })

    test("With Length method sets length for array", () => {
        const times = 10
        for (let i = 1; i < times; i++) {
            const result = sut.WithArrayLength(i).Build()
            expect(result).toBeInstanceOf(Array)
            expect(result).toHaveLength(i)
                expect(result[0]).toBeInstanceOf(ActivityScope)
        }
    })

    test("Length 0 for length method throws error", () => {
        expect(() => sut.WithArrayLength(0)).toThrow(Error)
    })

    test("Negative length for length method throws error", () => {
        expect(() => sut.WithArrayLength(-5)).toThrow(Error)
    })
})