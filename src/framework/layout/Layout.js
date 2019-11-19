import React from 'react';
import { Notification, Layout } from 'react-admin';
import Menu from './Menu';

const MyNotification = props => <Notification {...props} autoHideDuration={10000} />;
const GunakRALayout = (props) => <Layout {...props} notification={MyNotification}
                                         menu={Menu}
/>;

export default GunakRALayout;
