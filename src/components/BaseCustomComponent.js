import {Component} from 'react';

class BaseCustomComponent extends Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
    }
}

export default BaseCustomComponent;