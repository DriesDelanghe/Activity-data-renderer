import {ActivityBuilder} from "../../src/builders/ActivityBuilder";
import {ActivityScope} from "../../src/models/Activity/ActivityScope";
import {ScopeArrayBuilder} from "../../src/builders/ScopeArrayBuilder";
import {ScopeBuilder} from "../../src/builders/ScopeBuilder";
import {Activity} from "../../src/models/Activity/Activity";
import {HashProvider} from "../../src/providers/HashProvider";
import {ScopeEntities} from "../../src/models/Values/ScopeEntities";
import {ScopeEntityProvider} from "../../src/providers/ScopeEntityProvider";
import {DateProvider} from "../../src/providers/DateProvider";
import {EnumProvider} from "../../src/providers/EnumProvider";
import {ContextProvider} from "../../src/providers/ContextProvider";
import {UuidProvider} from "../../src/providers/UuidProvider";
import {InvalidArgumentException} from "../../src/exceptions/InvalidArgumentException";
import {ResultProvider} from "../../src/providers/ResultProvider";
import {ReasonBuilder} from "../../src/builders/ReasonBuilder";
import {ReasonProvider} from "../../src/providers/ReasonProvider";
import {ColumnNamesProvider} from "../../src/providers/ColumnNamesProvider";
import {Result} from "../../src/models/Values/Result";


describe("ActivityBuilder", ()=> {

    let sut : ActivityBuilder
    const iterations = 1000

    beforeEach(() => {
        const enumProvider = new EnumProvider()
        const scopeEntityProvider = new ScopeEntityProvider(enumProvider)
        const dateProvider = new DateProvider()
        const scopeBuilder = new ScopeBuilder(scopeEntityProvider, dateProvider, new HashProvider())

        const scopeArrayBuilder = new ScopeArrayBuilder(scopeBuilder)

        const hashProvider = new HashProvider()
        const contextProvider = new ContextProvider(enumProvider)
        const resultProvider = new ResultProvider(enumProvider)
        const uuidProvider = new UuidProvider()
        const reasonBuilder = new ReasonBuilder(new ReasonProvider(enumProvider), new ColumnNamesProvider(enumProvider))
        sut = new ActivityBuilder(scopeArrayBuilder, hashProvider, contextProvider, dateProvider, uuidProvider, resultProvider, reasonBuilder)
    })

    test("Build returns activity object with default max scope length of 10", () => {
        for (let i = 0; i < iterations; i++) {
            const result = sut.Build()
            expect(result).toBeInstanceOf(Activity)
            expect(result.Scope.length > 0 && result.Scope.length <= 10).toBeTruthy()
            if (result.Result !== "Success" && !result.Reason){
                console.log("invalid activity", result)
                throw new Error(`Activity does not match format: ${result.Result} && ${result.Reason}`)
            }
        }
    })

    test("WithMaxScopeArrayLength set to 5", () => {
        for (let i = 0; i < iterations; i++) {
            const result = sut.WithMaxScopeArrayLength(5).Build()
            expect(result.Scope.length > 0 && result.Scope.length <= 5).toBeTruthy()
        }
    })

    test("WithMaxScopeArrayLength set to 0 throws", () => {
        expect(() => sut.WithMaxScopeArrayLength(0)).toThrow(Error)
    })

    test("WithMaxScopeArrayLength smaller than 0 throws", () => {
        expect(() => sut.WithMaxScopeArrayLength(-5)).toThrow(Error)
    })
})