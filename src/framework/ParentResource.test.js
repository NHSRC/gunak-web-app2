import {assert} from 'chai';
import ParentResource from "./ParentResource";

it('getFindByParentResourcePath', () => {
    let filter = new ParentResource("standard", "name", 1);
    assert.equal(ParentResource.getResourcePath_ByParent(filter), "search/findByStandard");
});

it('getParentParamString', () => {
    let filter = new ParentResource("standard", "name", 2);
    assert.equal(ParentResource.getParentParamString(filter), "standardId=2");
});

it('should parse from query string', () => {
    let s = `?filter=${JSON.stringify(new ParentResource("standard", "name", 1))}`;
    let parentResource = ParentResource.parse(s);
    assert.equal(parentResource.name, "standard");
    assert.equal(parentResource.id, 1);
    assert.equal(parentResource.display, "name");
});