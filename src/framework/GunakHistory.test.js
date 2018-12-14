import {assert} from 'chai';
import _ from "lodash";
import GunakHistory from "./GunakHistory";

describe('GunakHistoryTest', () => {
    it('pushChildrenForParentPathOnEdit when it is same resource', () => {
        let store = [];
        let gunakHistory = new GunakHistory(new TestHistory(store));
        let childrenForParentPath = "/checkpoint?filter={\"name\":\"checklist\",\"display\":\"Emergency\",\"id\":1}";
        gunakHistory.push(childrenForParentPath);
        assert.equal(store[0] instanceof Object, false);
        gunakHistory.push("/checkpoint/110");
        gunakHistory.push("/checkpoint");
        assert.equal(_.last(store), childrenForParentPath);
    });

    it('pushChildrenForParentPathOnEdit when different resource', () => {
        let store = [];
        let gunakHistory = new GunakHistory(new TestHistory(store));
        let childrenForParentPath = "/checkpoint?filter={\"name\":\"checklist\",\"display\":\"Emergency\",\"id\":1}";
        gunakHistory.push(childrenForParentPath);
        assert.equal(store[0] instanceof Object, false);
        gunakHistory.push("/checkpoint/110");
        gunakHistory.push("/checklist");
        assert.equal(_.last(store), "/checklist");
    });

    it('should push path as object', function () {
        let store = [];
        let gunakHistory = new GunakHistory(new TestHistory(store));
        gunakHistory.push({pathname: "/checkpoint", search: "?filter=foo"});
        assert.equal(store[0] instanceof Object, true);
        gunakHistory.push({pathname: "/checkpoint"});
        assert.equal(store[1] instanceof Object, true);
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