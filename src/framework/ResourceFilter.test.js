import {assert} from 'chai';
import ResourceFilter from "./ResourceFilter";

describe('ResourceFilter', () => {
    it('getFindByParentResourcePath for system generated filter', function () {
        assert.equal(ResourceFilter.getResourcePath_ByParent({stateId: 2}), "search/findByState");
        assert.equal(ResourceFilter.getResourcePath_ByParent({stateId: [2]}), "search/findByState");
        assert.equal(ResourceFilter.getResourcePath_ByParent({checklistId: 2}), "search/findByChecklist");
        assert.equal(ResourceFilter.getResourcePath_ByParent({stateId: 2, checklistId: 3}), "search/find");
    });

    it('getParentParamString for system generated filter', () => {
        assert.equal(ResourceFilter.getParentParamString({stateId: 2}), "stateId=2");
        assert.equal(ResourceFilter.getParentParamString({stateId: [2]}), "stateId=2");
        assert.equal(ResourceFilter.getParentParamString({stateId: [2,3]}), "stateId=2,3");
        assert.equal(ResourceFilter.getParentParamString({stateId: 2, checklistId: 3}), "stateId=2&checklistId=3");
    });

    it('filterAsQueryParam', function () {
        assert.equal(ResourceFilter.filterAsQueryParam("resource", 1), 'filter=%7B%22resource%22%3A1%7D');
    });

    it('is selected', function () {
        assert.equal(ResourceFilter.isSelected('1'), true);
        assert.equal(ResourceFilter.isSelected(' '), false);
        assert.equal(ResourceFilter.isSelected(''), false);
        assert.equal(ResourceFilter.isSelected(undefined), false);
        assert.equal(ResourceFilter.isSelected(null), false);
        assert.equal(ResourceFilter.isSelected(1), true);
        assert.equal(ResourceFilter.isSelected(0), false);
        assert.equal(ResourceFilter.isSelected('0'), false);
        assert.equal(ResourceFilter.isSelected(""), false);
    });
});