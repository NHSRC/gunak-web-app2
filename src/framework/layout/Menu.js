import React ,  { Component }  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import inflection from 'inflection';
import compose from 'recompose/compose';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { getResources, translate } from 'ra-core';
import DefaultIcon from '@material-ui/icons/ViewList';

// import DashboardMenuItem from './DashboardMenuItem';
// import MenuItemLink from './MenuItemLink';
// import Responsive from '../layout/Responsive';

import SubMenu from './SubMenu';

import {
    DashboardMenuItem,
    MenuItemLink,
    Responsive,
} from 'react-admin';


class Menu extends Component {
    state = {
        basicSetup: false,
        checkListIndicators: false,
        facilities: false,
        assessments: false,
        users: false,
    };

    static propTypes = {
        onMenuClick: PropTypes.func,
        logout: PropTypes.object,
    };

    handleToggle = menu => {
        this.setState(state => ({ [menu]: !state[menu] }));
    };

    translatedResourceName = (resource, translate) =>
        translate(`resources.${resource.name}.name`, {
            smart_count: 2,
            _:
                resource.options && resource.options.label
                    ? translate(resource.options.label, {
                        smart_count: 2,
                        _: resource.options.label,
                    })
                    : inflection.humanize(inflection.pluralize(resource.name)),
        });

    render() {
        const { onMenuClick, open, logout, translate,resources , hasDashboard} = this.props;
        const basicSetup = () =>{return resources
            .filter(r => r.hasList)
            .filter(resource => resource.options.menuCategory==="basicSetup")
            .map(resource => {
                return (
                        <MenuItemLink
                            key={resource.name}
                            to={`/${resource.name}`}
                            primaryText={this.translatedResourceName(resource, translate)}
                            leftIcon={
                                resource.icon ? <resource.icon/> : <DefaultIcon/>
                            }
                            onClick={onMenuClick}
                            dense={true}
                        />
                )}
            )};


        const checkListIndicators = () =>{return resources
            .filter(r => r.hasList)
            .filter(resource => resource.options.menuCategory==="checkListIndicators")
            .map(resource => {

                return (
                    <MenuItemLink
                        key={resource.name}
                        to={`/${resource.name}`}
                        primaryText={this.translatedResourceName(resource, translate)}
                        leftIcon={
                            resource.icon ? <resource.icon/> : <DefaultIcon/>
                        }
                        onClick={onMenuClick}
                        dense={true}
                    />
                )}
            )};

        const facilities = () =>{return resources
            .filter(r => r.hasList)
            .filter(resource => resource.options.menuCategory==="facilities")
            .map(resource => {
                {console.log("resources", resource.options.menuCategory)}

                return (
                    <MenuItemLink
                        key={resource.name}
                        to={`/${resource.name}`}
                        primaryText={this.translatedResourceName(resource, translate)}
                        leftIcon={
                            resource.icon ? <resource.icon/> : <DefaultIcon/>
                        }
                        onClick={onMenuClick}
                        dense={true}
                    />
                )}
            )};

        const assessments = () =>{return resources
            .filter(r => r.hasList)
            .filter(resource => resource.options.menuCategory==="assessments")
            .map(resource => {
                {console.log("resources", resource.options.menuCategory)}

                return (
                    <MenuItemLink
                        key={resource.name}
                        to={`/${resource.name}`}
                        primaryText={this.translatedResourceName(resource, translate)}
                        leftIcon={
                            resource.icon ? <resource.icon/> : <DefaultIcon/>
                        }
                        onClick={onMenuClick}
                        dense={true}
                    />
                )}
            )};

        const users = () =>{return resources
                .filter(r => r.hasList)
                .filter(resource => resource.options.menuCategory==="users")
                .map(resource => {
                    {console.log("resources", resource.options.menuCategory)}

                    return (
                        <MenuItemLink
                            key={resource.name}
                            to={`/${resource.name}`}
                            primaryText={this.translatedResourceName(resource, translate)}
                            leftIcon={
                                resource.icon ? <resource.icon/> : <DefaultIcon/>
                            }
                            onClick={onMenuClick}
                            dense={true}
                        />
                    )}
                )};


        return (
            <div>
                {' '}
                {hasDashboard && <DashboardMenuItem onClick={onMenuClick} />}

                <SubMenu
                    handleToggle={() => this.handleToggle('basicSetup')}
                    isOpen={this.state.basicSetup}
                    sidebarIsOpen={open}
                    name="Basic Setup"
                    icon={<DefaultIcon/>}
                >
                    {basicSetup()}
                </SubMenu>

                <SubMenu
                    handleToggle={() => this.handleToggle('facilities')}
                    isOpen={this.state.facilities}
                    sidebarIsOpen={open}
                    name="Facilities"
                    icon={<DefaultIcon/>}
                >
                    {facilities()}
                </SubMenu>

                <SubMenu
                    handleToggle={() => this.handleToggle('checkListIndicators')}
                    isOpen={this.state.checkListIndicators}
                    sidebarIsOpen={open}
                    name="Checklist & Indicators"
                    icon={<DefaultIcon/>}
                >
                    {checkListIndicators()}
                </SubMenu>

                <SubMenu
                    handleToggle={() => this.handleToggle('assessments')}
                    isOpen={this.state.assessments}
                    sidebarIsOpen={open}
                    name="Assessments"
                    icon={<DefaultIcon/>}
                >
                    {assessments()}

                </SubMenu>

                <SubMenu
                    handleToggle={() => this.handleToggle('users')}
                    isOpen={this.state.users}
                    sidebarIsOpen={open}
                    name="Users"
                    icon={<DefaultIcon/>}
                >
                    {users()}
                </SubMenu>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    open: state.admin.ui.sidebarOpen,
    resources: getResources(state),
    pathname: state.router.location.pathname, // used to force redraw on navigation
});

const enhance = compose(
    translate,
    connect(
        mapStateToProps,
        {}, // Avoid connect passing dispatch in props,
        null,
        {
            areStatePropsEqual: (prev, next) =>
                prev.resources.every(
                    (value, index) => value === next.resources[index] // shallow compare resources
                ) &&
                prev.pathname === next.pathname &&
                prev.open === next.open,
        }
    ),
);

export default enhance(Menu);
