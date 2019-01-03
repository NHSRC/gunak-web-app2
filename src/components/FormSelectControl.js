import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const styles = theme => ({});

class FormSelectControl extends React.Component {
    render() {
        return <FormControl>
            <InputLabel htmlFor={this.props.labelName}>{this.props.label}</InputLabel>
            <Select
                native
                value={this.props.value}
                onChange={this.props.onChange}
                inputProps={{
                    name: `${this.props.labelName}`,
                    id: `${this.props.labelName}`
                }} classes={this.props.classes}>
                {this.props.options.map((option) => <option value={option[this.props.valueProperty]}>{this.props.displayProperty}</option>)}
            </Select>
        </FormControl>;
    }
}

FormSelectControl.propTypes = {
    classes: PropTypes.object.isRequired,
    labelName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    displayProperty: PropTypes.string.isRequired,
    valueProperty: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(FormSelectControl);