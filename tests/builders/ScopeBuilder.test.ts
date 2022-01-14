import {ScopeBuilder} from "../../src/builders/ScopeBuilder";
import {ActivityScope} from "../../src/models/Activity/ActivityScope";
import {ScopeEntityProvider} from "../../src/providers/ScopeEntityProvider";
import {DateProvider} from "../../src/providers/DateProvider";
import {HashProvider} from "../../src/providers/HashProvider";
import {EnumProvider} from "../../src/providers/EnumProvider";


describe("ScopeBuilder", () => {

    let sut: ScopeBuilder

    beforeEach(() => {
        const scopeEntityProvider = new ScopeEntityProvider(new EnumProvider())
        sut = new ScopeBuilder(scopeEntityProvider, new DateProvider(), new HashProvider())
    })

    test("Build returns ActivityScope object", () => {
        expect(sut.Build()).toBeInstanceOf(ActivityScope)
    })

    test("Build returns ActivityScope object with values", () => {
        const result = sut.Build()
        expect(result.LoadDate).toBeInstanceOf(Date)
        expect(result.HashKey).toBeTruthy()
        expect(result.Entity).toBeTruthy()
    })
})