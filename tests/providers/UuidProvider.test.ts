import {UuidProvider} from "../../src/providers/UuidProvider";


describe("UuidProvider", () => {

    let sut : UuidProvider

    beforeEach(() => {
        sut = new UuidProvider()
    })

    test("Get returns string", () => {
        expect(typeof sut.Get() === "string").toBeTruthy()
    })
})