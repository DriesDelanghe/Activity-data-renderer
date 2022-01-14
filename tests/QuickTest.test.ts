import {DurationOptions} from "../src/models/Inquirer/OptionEnums/DurationOptions";


describe("quick on the fly test", () => {

    test("enum value", () => {
        expect(DurationOptions[DurationOptions.DAY]).toEqual("DAY")
    })
})