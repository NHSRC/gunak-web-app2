import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({});

class FileUploadControl extends React.Component {
    render() {
        const {classes} = this.props;
        return (<div>
            <input accept={this.props.accept}  className={classes.input} id={this.props.id} type="file" ref={this.props.ref} onChange={this.props.onUpload}/>
            <label htmlFor={this.props.id}>
                <Button variant="contained" component="span" className={classes.button}>{this.props.label}</Button>
            </label></div>);
    }
}

FileUploadControl.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    accept: PropTypes.string.isRequired,
    onUpload: PropTypes.func.isRequired,
    ref: PropTypes.func.isRequired
};

export default withStyles(styles)(FileUploadControl);