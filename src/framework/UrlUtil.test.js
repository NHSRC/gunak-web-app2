import {assert} from 'chai';
import UrlUtil from "./UrlUtil";

it('getFindByParentResourcePath', () => {
    let filter = {"standard": 2};
    assert.equal(UrlUtil.getFindByParentResourcePath(filter), "search/findByStandard/");
});

it('getParentParamString', () => {
    let filter = {"standard": 2};
    assert.equal(UrlUtil.getParentParamString(filter), "standardId=2");
});
