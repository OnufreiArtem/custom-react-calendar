import React from "react";

import PropTypes from "prop-types";


import { Cell, SelectedCell, RangeCell } from "./StyledCells";

function CalendarCell(props) {
    const {inMonth = false, selected = false, inRange = false} = props;

    const getRequestedCell = () => {
        if(selected) return (<SelectedCell onClick={(e) => props.onClick(e) } inMonth={inMonth}>{props.children}</SelectedCell>)
        else if(inRange) return (<RangeCell onClick={(e) => props.onClick(e) } inMonth={inMonth}>{props.children}</RangeCell>)
        else return (<Cell onClick={(e) => props.onClick(e) } inMonth={inMonth}>{props.children}</Cell>)
    }

    return getRequestedCell()
}

CalendarCell.propTypes = {
    inMonth: PropTypes.boolean,
    selected: PropTypes.boolean,
    inRange: PropTypes.boolean,
}

export default CalendarCell;