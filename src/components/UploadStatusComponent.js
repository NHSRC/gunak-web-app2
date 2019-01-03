import React from 'react';
import BaseComponent from "./BaseCustomComponent";
import FacilitySelectionProcess from "../model/FacilitySelectionProcess";
import PropTypes from 'prop-types';
import GunakModal from './GunakModal';

export default class UploadStatusComponent extends BaseComponent {
    constructor(props) {
        super(props);
    }

    renderUploadView() {
        switch (this.props.state.uploadStatus) {
            case 'Uploading':
                return <GunakModal/>;
                // return <Modal.Dialog>
                //     <Modal.Header><Modal.Title>Uploading...</Modal.Title></Modal.Header></Modal.Dialog>;
            case 'Completed':
                return this.wrapInModal('Assessment uploaded successfully', <p>{FacilitySelectionProcess.assessmentUploadMessage(this.props.state)}</p>);
        }
        return null;
    }

    wrapInModal(title, body) {
        return <GunakModal/>;
        // return <Modal.Dialog bsSize="large">
        //     <Modal.Header>
        //         <Modal.Title>{title}</Modal.Title>
        //     </Modal.Header>
        //     {body}
        //     <Modal.Footer>
        //         <Button bsStyle="primary" onClick={() => this.props.confirmUpload()}>Close</Button>
        //     </Modal.Footer>
        // </Modal.Dialog>;
    }

    render() {
        return FacilitySelectionProcess.uploadFailed(this.props.state) ?
            this.wrapInModal('Error in uploading', <p color={'red'}>{FacilitySelectionProcess.uploadErrorMessage(this.props.state)}</p>)
            :
            this.renderUploadView();
    }
};

UploadStatusComponent.propTypes = {
    state: PropTypes.object.isRequired,
    confirmUpload: PropTypes.func.isRequired
};
