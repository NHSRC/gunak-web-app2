import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Button, Confirm, crudUpdateMany} from 'react-admin';

class ToggleActiveInactiveButton extends Component {
    state = {
        isOpen: false,
    };

    handleClick = () => {
        this.setState({ isOpen: true });
    };

    handleDialogClose = () => {
        this.setState({ isOpen: false });
    };

    handleConfirm = () => {
        const { basePath, crudUpdateMany, resource, selectedIds } = this.props;
        crudUpdateMany(resource, selectedIds, { inactive: this.props.inactive }, basePath);
        this.setState({ isOpen: true });
    };

    render() {
        return (
            <Fragment>
                <Button label={this.props.label} onClick={this.handleClick} />
                <Confirm
                    isOpen={this.state.isOpen}
                    title={`Modify checkpoints in bulk`}
                    content={`Are you sure you want to make these items ${this.props.label.toLowerCase()}?`}
                    onConfirm={this.handleConfirm}
                    onClose={this.handleDialogClose}
                />
            </Fragment>
        );
    }
}

export default connect(undefined, { crudUpdateMany })(ToggleActiveInactiveButton);