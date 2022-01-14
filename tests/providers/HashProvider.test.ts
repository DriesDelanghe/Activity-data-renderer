import {HashProvider} from "../../src/providers/HashProvider";
import crypto from "crypto";


describe("HashProvider", () => {
    let sut : HashProvider

    beforeEach(() => {
        sut = new HashProvider()
    })

    test("Random returns string", () => {
        expect(typeof sut.Random() === "string").toBeTruthy()
    })

    test("ConvertString returns string", () => {
        const value : string = "some value"
        const result = sut.ConvertString(value)
        expect(typeof result === "string").toBeTruthy()
        expect(result).toEqual(crypto.createHmac('sha256', value).update('json').digest('base64'))
    })
})