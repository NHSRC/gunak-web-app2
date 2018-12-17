import {assert} from 'chai';
import ResourceFilter from "./ResourceFilter";

describe('ResourceFilter', () => {
    it('getFindByParentResourcePath for system generated filter', function () {
        assert.equal(ResourceFilter.getResourcePath_ByParent({stateId: 2}), "search/findByState");
        assert.equal(ResourceFilter.getResourcePath_ByParent({checklistId: 2}), "search/findByChecklist");
        assert.equal(ResourceFilter.getResourcePath_ByParent({stateId: 2, checklistId: 3}), "search/find");
    });

    it('getParentParamString for system generated filter', () => {
        assert.equal(ResourceFilter.getParentParamString({stateId: 2}), "stateId=2");
        assert.equal(ResourceFilter.getParentParamString({stateId: 2, checklistId: 3}), "stateId=2&checklistId=3");
    });

    it('should parse from query string', () => {
        let s = `?filter=${JSON.stringify({standardId: 1})}`;
        let resourceFilter = ResourceFilter.parse(s);
        assert.equal(resourceFilter.name, "standard");
        assert.equal(resourceFilter.id, 1);
        assert.equal(resourceFilter.display, "name");
    });

    it('should return to filter', function () {
        let resourceFilter = new ResourceFilter("standard", "name", 1);
        assert.equal(resourceFilter.toFilter(), '{"standard":1}');
    });
});