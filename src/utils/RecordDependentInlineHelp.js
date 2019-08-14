import React from 'react';
import InlineHelp from "../components/InlineHelp";
import {FormDataConsumer} from 'react-admin';
import _ from 'lodash';

class RecordDependentInlineHelp {
    static create(message, dependentOn) {
        return <FormDataConsumer>
            {({formData}) => {
                return _.isNil(formData[dependentOn]) ? null : <InlineHelp message={message}/>;
            }
            }
        </FormDataConsumer>;
    }
}

export default RecordDependentInlineHelp;