import {assert} from 'chai';
import _ from "lodash";
import GunakHistory from "./GunakHistory";

describe('GunakHistoryTest', () => {
    it('pushChildrenForParentPathOnEdit', () => {
        let store = [];
        let gunakHistory = new GunakHistory(new TestHistory(store));
        let childrenForParentPath = "/checkpoint?filter={\"name\":\"checklist\",\"display\":\"Emergency\",\"id\":1}";
        gunakHistory.push(childrenForParentPath);
        gunakHistory.push("/checkpoint/110");
        gunakHistory.push("/checkpoint");
        assert.equal(_.last(store), childrenForParentPath);
    });
});

class TestHistory {
    constructor(array) {
        this.array = array;
    }

    push(path) {
        return this.array.push(path);
    }
}