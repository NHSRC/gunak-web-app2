import {assert} from 'chai';
import RAFilterUtil from "./RAFilterUtil";

it('valuesFromMultiSelectFilter', () => {
    assert.deepEqual(RAFilterUtil.valuesFromMultiSelectFilter({0: 10, 1: 12, preventDefault: 'blah'}), [10, 12]);
});
