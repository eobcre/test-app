import assert from "node:assert/strict";
import { add } from "../src/calculator.js";

describe("add", function() {
    it("should return 5", function () {
        assert.equal(add(2, 3), 5)
    })
})