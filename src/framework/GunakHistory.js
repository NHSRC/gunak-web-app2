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
        console.log(`TRYING PUSH: ${path}, ${JSON.stringify(state)}, ${this.length}`);
        let url = new Url(path);
        if (url.isResourceListing() && this.list.length > 1 && new Url(_.last(this.list)).isResourcePage() && new Url(this.list[this.list.length - 2]).hasFilter()) {
            let childrenForParentPath = this.list[this.list.length - 2];
            return this._push(childrenForParentPath, state);
        }
        return this._push(path, state);
    }

    _push(path, state) {
        console.log(`PUSHING: ${path}`);
        this.list.push(path);
        return this.history.push(path, state);
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