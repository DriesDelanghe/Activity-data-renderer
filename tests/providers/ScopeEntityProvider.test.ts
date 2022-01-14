import {ScopeEntityProvider} from "../../src/providers/ScopeEntityProvider";
import {ScopeEntities} from "../../src/models/Values/ScopeEntities";
import {EnumProvider} from "../../src/providers/EnumProvider";


describe("ScopeEntityProvider", () => {

    let sut: ScopeEntityProvider

    beforeEach(() => {
        const enumProvider = new EnumProvider()
        sut = new ScopeEntityProvider(enumProvider)
    })

    test("Random returns random value from ScopeEntities", () => {
            const result = sut.Random()
            expect(!!Object.keys(ScopeEntities).find(value => result === value)).toBeTruthy()
    })
})