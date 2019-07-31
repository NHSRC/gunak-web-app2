import {assert} from 'chai';
import Pagination from "./Pagination";

describe('Pagination.test.js', () => {
    it('asSpringUrlPart', () => {
        assert.equal(Pagination.asSpringUrlPart({page: 4, perPage: 20}, {field: "name", order: "ASC"}), "page=3&size=20&sort=name%2CASC");
        assert.equal(Pagination.asSpringUrlPart({page: 4, perPage: 20}, [{field: "name", order: "ASC"}]), "page=3&size=20&sort=name%2CASC");
        assert.equal(Pagination.asSpringUrlPart({page: 4, perPage: 20}, [{field: "name", order: "ASC"}, {field: "id", order: "ASC"}]), "page=3&size=20&sort=name%2CASC&sort=id%2CASC");
        assert.equal(Pagination.asSpringUrlPart({page: 4, perPage: 20}, {field: "name,id", order: "ASC,ASC"}), "page=3&size=20&sort=name%2CASC&sort=id%2CASC");
        assert.equal(Pagination.asSpringUrlPart({page: 4, perPage: 20}, {field: "name"}), "page=3&size=20&sort=name");
        assert.equal(Pagination.asSpringUrlPart({page: 4, perPage: 20}, "name"), "page=3&size=20&sort=name");
    });
});