import React from 'react';
import { Notification, Layout } from 'react-admin';

const MyNotification = props => <Notification {...props} autoHideDuration={10000} />;
const GunakRALayout = (props) => <Layout {...props} notification={MyNotification} />;

export default GunakRALayout;