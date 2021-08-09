import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {GunakReferenceInput} from "./Inputs";
import {FormDataConsumer} from 'react-admin';

const styles = theme => ({});

function facilityFilter(formData) {
    let filter = {};
    if (formData && formData.districtId)
        filter.districtId = formData.districtId;
    if (formData && formData.facilityTypeId)
        filter.facilityTypeId = formData.facilityTypeId;
    return filter;
}

class FacilitySelect extends React.Component {
    render() {
        const {classes} = this.props;
        return (<fieldset>
            <legend>Find and select the facility</legend>
            <GunakReferenceInput label="State" optionText="name" source="state"/>
            <FormDataConsumer>
                {({formData}) =>
                    <GunakReferenceInput label="District" optionText="name" source="district"
                                         filter={(formData && formData.stateId) ? {stateId: formData.stateId, inactive: false} : {}}/>}
            </FormDataConsumer>
            <FormDataConsumer>
                {({formData}) =>
                    <GunakReferenceInput label="Facility type" optionText="name" source="facilityType" mandatory={false}
                                         filter={(formData && formData.districtId) ? {districtId: formData.districtId} : {}}/>}
            </FormDataConsumer>
            <FormDataConsumer>
                {({formData}) =>
                    <GunakReferenceInput label="Facility" optionText="name" source="facility"
                                         filter={facilityFilter(formData)} perPage={500}/>}
            </FormDataConsumer>
            <br/>
            <br/>
            <br/>
        </fieldset>);
    }
}

FacilitySelect.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    accept: PropTypes.string.isRequired,
    onUpload: PropTypes.func.isRequired,
    ref: PropTypes.func.isRequired
};

export default withStyles(styles)(FacilitySelect);
