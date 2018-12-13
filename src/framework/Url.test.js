import {assert} from 'chai';
import Url from "./Url";

describe('Url.test.js', () => {
    it('parse list url', () => {
        let url = new Url("/checkpoint");
        assert.equal(url.resource, "checkpoint");
    });

    it('parse a resource url', () => {
        let url = new Url("/checkpoint/11");
        assert.equal(url.resource, "checkpoint");
        assert.equal(url.id, "11");
    });

    it('parse url with query param', function () {
        let url = new Url("/checkpoint?filter={\"name\":\"checklist\",\"display\":\"Emergency\",\"id\":1}");
        assert.equal(url.resource, "checkpoint");
        assert.exists(url.filter);

        url = new Url({pathname: "/checkpoint", search: "?filter={\"name\":\"checklist\",\"display\":\"Emergency\",\"id\":1}"});
        assert.equal(url.resource, "checkpoint");
        assert.exists(url.filter);
    });

    it('should tell whether url is listing', function () {
        assert.equal(new Url("/checkpoint/11").isResourceListing(), false);
        assert.equal(new Url("/checkpoint").isResourceListing(), true);
    });

    it('should tell whether url is resource view/edit', function () {
        assert.equal(new Url("/checkpoint/11").isResourcePage(), true);
        assert.equal(new Url("/checkpoint").isResourcePage(), false);
    });

    it('should tell whether it has filter', function () {
        assert.equal(new Url("/checkpoint/11").hasFilter(), false);
        assert.equal(new Url("/checkpoint").hasFilter(), false);
        assert.equal(new Url("/checkpoint?filter={\"name\":\"checklist\",\"display\":\"Emergency\",\"id\":1}").hasFilter(), true);
    });
});