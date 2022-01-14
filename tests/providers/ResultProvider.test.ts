import {ResultProvider} from "../../src/providers/ResultProvider";
import {EnumProvider} from "../../src/providers/EnumProvider";
import {Result} from "../../src/models/Values/Result";


describe("ResultProvider", () => {

    let sut : ResultProvider
    beforeEach(() => {
        sut = new ResultProvider(new EnumProvider())
    })

    test("Random returns Random value from Result", () => {
        const result = sut.Random()
        expect(Object.keys(Result).find(value => value === result)).toBeTruthy()
    })
})