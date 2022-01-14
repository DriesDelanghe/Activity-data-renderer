import {ContextProvider} from "../../src/providers/ContextProvider";
import {EnumProvider} from "../../src/providers/EnumProvider";
import {Contexts} from "../../src/models/Values/Contexts";


describe("ContextProvider", () => {

    let sut : ContextProvider

    beforeEach(() => {
        sut = new ContextProvider(new EnumProvider())
    })

    test("Random returns random value from Context Enum", () => {
            const result = sut.Random()
            expect(Object.keys(Contexts).find(value => value === result)).toBeTruthy()
    })
})