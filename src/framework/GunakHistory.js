import _ from "lodash";
import Url from "./Url";

class GunakHistory {
    constructor(history) {
        this.history = history;
        this.list = [];
    }

    get length() {
        return this.history.length;
    }

    get location() {
        return this.history.location;
    }

    get action() {
        return this.history.action;
    }

    listen(fn) {
        return this.history.listen(fn);
    }

    push(path, state) {
        let url = new Url(path);
        console.log(`TRYING PUSH: ${url.fullString()}, ${JSON.stringify(state)}, ${this.length}`);
        if (url.isResourceListing() && this.list.length > 1) {
            let lastUrl = new Url(_.last(this.list));
            let lastButOneUrlString = this.list[this.list.length - 2];
            let lastButOneUrl = new Url(lastButOneUrlString);
            if (lastUrl.isResourcePage() && lastButOneUrl.hasFilter() && url.resource === lastButOneUrl.resource) {
                return this._push(new Url(lastButOneUrlString), state);
            }
        }
        return this._push(url, state);
    }

    _push(url, state) {
        console.log(`PUSHING: ${url.fullString()}`);
        this.list.push(url.fullString());
        return this.history.push(url.path, state);
    }

    replace(path, state) {
        console.log(`REPLACE: ${path}, ${JSON.stringify(state)}, ${this.length}`);
        return this.history.replace(path, state);
    }

    go(n) {
        console.log('GunakHistory.go');
        return this.history.go(n);
    }

    goBack() {
        console.log('GunakHistory.goBack');
        return this.history.goBack();
    }

    goForward() {
        console.log('GunakHistory.goForward');
        return this.history.goForward();
    }

    canGo(n) {
        console.log('GunakHistory.canGo');
        return this.history.canGo(n);
    }

    block(obj) {
        return this.history.block(obj);
    }

    createHref(location) {
        return this.history.createHref(location);
    }
}

export default GunakHistory;