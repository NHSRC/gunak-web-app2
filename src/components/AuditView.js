import React from 'react';
import {DateField} from 'react-admin';

class AuditView {
    static createdDate() {
        return <DateField label="Created on" source="createdDate"/>;
    }

    static lastModifiedDate() {
        return <DateField label="Last modified" source="lastModifiedDate"/>;
    }
}

export default AuditView;