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
});