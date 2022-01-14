import {ColumnNamesProvider} from "../../src/providers/ColumnNamesProvider";
import {EnumProvider} from "../../src/providers/EnumProvider";
import {ColumnNames} from "../../src/models/Values/ColumnNames";


describe("ColumnNamesProvider", () => {

    let sut : ColumnNamesProvider

    beforeEach(() => {
        sut = new ColumnNamesProvider(new EnumProvider())
    })

    test("Random returns value from ColumnNames", () => {
        const result = sut.Random()
        expect(Object.keys(ColumnNames).find(value => value === result)).toBeTruthy()
    })
})