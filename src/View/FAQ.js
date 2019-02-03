import React from 'react';

export const FAQ = props => (
    <ol>
        <li>
            <h4>What is the relationship between Program, Assessment tool and checklist?</h4>
            <span>A program consists of multiple assessment tools. Each assessment tool consists of multiple checklists.</span>
        </li>
        <li>
            <h4>During edit/create of Area of Concern certain fields - Assessment tool, Checklist, Area of concern, Standard and Measurable elements are not mandatory. Why is that?</h4>
            <span>The names of Measurable elements, Standards, Area of concerns are similar/same between various assessment tools, area of concerns and standards. Hence in
                order to select the right item these items have been provided for filtering purposes.</span>
        </li>
        <li>
            <h4>What does the error message "Conflict" mean?</h4>
            <span>The error message conflict is shown when there is a uniqueness check failure. This is shown when Checklist, Area of concern, Standard, Measurable elements name/reference already exists.</span>
        </li>
        <li>
            <h4>What is checklist duplication check?</h4>
            <ul>
                <li>If a checklist name exists as common, for all states, within an Assessment Tool then the same name cannot be used when creating a checklist for a state.</li>
                <li>If a checklist name exists in an Assessment Tool for a specific state, then the same name cannot be used as the name for a common checklist. In such a case it is recommended to change the name of the checklist for the state.</li>
                <li>But, if a checklist name exists for a state, within an Assessment Tool, then the same name can be used in for another state.</li>
            </ul>
        </li>
        <li>
            <h4>When should I choose/filter by state when creating and view checklists</h4>
            <span>If there is no state specific then the <b>same checklist</b> applies to all the states. If you choose a state then you will be shown all checklists belonging to that state as well as common checklists that apply to that state.</span>
        </li>
    </ol>
);