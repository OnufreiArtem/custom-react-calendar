import React, { useState } from "react";

import PropTypes from "prop-types";
import styled, {keyframes} from "styled-components";

import {InCell, OutCell, SelectedInCell, SelectedOutCell, WeekDayCell, RangeInCell, RangeOutCell} from "./StyledCells";
import {CalendarContainer, CalendarHeader, CalendarTitle, MoveArrow, DaysContainer, Selection, Divider, SelectionControl, SelectionCloseBtn} from "./StyledCalendarLayouts"
import { sameMonths, ydmEquals, addMonth, dateFormat, dateRangeFormat, dateBetween } from "./CalendarUtils";
import {monthNames, weekDayNames, NUMBER_OF_ROWS} from "./Constants";

function Calendar({ date, type }) {

    const [pointer, setPointer] = useState(new Date(date.getTime()));

    const [selectedDate, setSelectedDate] = useState(undefined);
    
    const [selectedRanges, setSelectedRanges] = useState([{ 
        first: undefined,
        last: undefined
    }]) 
    const [selectedRangesIndex, setSelectedRangesIndex] = useState(0)

    const getAllDates = (date) => {
        let mDate = new Date(date.getTime());
        mDate.setDate(0);
        let daysBefore = mDate.getDay();
        mDate.setDate(mDate.getDate() - daysBefore);
        return new Array(7 * NUMBER_OF_ROWS).fill(0).map(() => {
            mDate.setDate(mDate.getDate() + 1);
            return new Date(mDate.getTime());
        });
    };

    const onDayClick = (date) => {
        setSelectedDate(ydmEquals(selectedDate, date) ? undefined : date);
    };

    const setStart = (date, index) => {
        let obj = {
            first: selectedRanges[index].first,
            last: selectedRanges[index].last,
        };

        obj.first = date;
        if(obj.last !== undefined && obj.first > obj.last) [obj.first, obj.last] = [obj.last, obj.first];
        setSelectedRanges(selectedRanges.map((range, idx) => idx === index ? obj : range))
    }

    const setEnd = (date, index) => {
        let obj = {
            first: selectedRanges[index].first,
            last: selectedRanges[index].last,
        };

        obj.last = date;
        if(obj.first !== undefined && obj.first > obj.last) [obj.first, obj.last] = [obj.last, obj.first];
        setSelectedRanges(selectedRanges.map((range, idx) => idx === index ? obj : range))
    }

    const onRangeDayClick = (date, index, e) => {
        if(e === undefined || ydmEquals(date, selectedRanges[index].first) || ydmEquals(date, selectedRanges[index].last)) return;

        if(e.shiftKey) {
            setEnd(date, index);
        } else {
            setStart(date, index)
        }
    };

    const onRemoveSelection = (selectionIndex) => {
        let rangesLeft = selectedRanges.filter((_, index) => index !== selectionIndex);
        if(rangesLeft.length <= 0) rangesLeft.push({first: undefined, last: undefined}) ;
        console.log(rangesLeft)
        setSelectedRanges( rangesLeft );
        setSelectedRangesIndex(0);
    }

    return (
        <CalendarContainer>
            <CalendarHeader>
                <MoveArrow onClick={() => setPointer(addMonth(pointer, -1))}>
                    <i className="fas fa-chevron-left"></i>
                </MoveArrow>
                <CalendarTitle>{`${
                    monthNames[pointer.getMonth()]
                } ${pointer.getFullYear()}`}</CalendarTitle>
                <MoveArrow onClick={() => setPointer(addMonth(pointer, 1))}>
                    <i className="fas fa-chevron-right"></i>
                </MoveArrow>
            </CalendarHeader>
            <DaysContainer>
                {weekDayNames.map((day) => (
                    <WeekDayCell>{day.toUpperCase()}</WeekDayCell>
                ))}

                {
                    getAllDates(pointer).map((day) => {

                        let isInMonth = sameMonths(day, pointer);
                       
                        if(type === "single") {
                            let isSelected = ydmEquals(day, selectedDate);

                            if(isInMonth && isSelected) return <SelectedInCell onClick={() => onDayClick(day)}>{day.getDate()}</SelectedInCell>;
                            if(isInMonth && !isSelected) return <InCell onClick={() => onDayClick(day)}>{day.getDate()}</InCell>;
                            if(!isInMonth && isSelected) return <SelectedOutCell>{day.getDate()}</SelectedOutCell>;
                            if(!isInMonth && !isSelected) return <OutCell>{day.getDate()}</OutCell>;
                        }

                        if(type === "range") {

                            let isSelected = ydmEquals(day, selectedRanges[0]?.first) || ydmEquals(day, selectedRanges[0]?.last);
                            let isInRange = dateBetween(day, selectedRanges[0]?.first, selectedRanges[0]?.last);

                            if(isInMonth && isSelected) return <SelectedInCell onClick={(e) => onRangeDayClick(day, 0, e)}>{day.getDate()}</SelectedInCell>;
                            if(isInMonth && !isSelected && isInRange) return <RangeInCell onClick={(e) => onRangeDayClick(day, 0, e)}>{day.getDate()}</RangeInCell>;
                            if(isInMonth && !isSelected && !isInRange) return <InCell onClick={(e) => onRangeDayClick(day, 0, e)}>{day.getDate()}</InCell>;
                            if(!isInMonth && isSelected) return <SelectedOutCell>{day.getDate()}</SelectedOutCell>;
                            if(!isInMonth && !isSelected && isInRange) return <RangeOutCell>{day.getDate()}</RangeOutCell>;
                            if(!isInMonth && !isSelected && !isInRange) return <OutCell>{day.getDate()}</OutCell>;

                        }

                        if(type === "multiRange") {
                            let isSelected = ydmEquals(day, selectedRanges[selectedRangesIndex]?.first) || ydmEquals(day, selectedRanges[selectedRangesIndex]?.last);
                            let isInRange = dateBetween(day, selectedRanges[selectedRangesIndex]?.first, selectedRanges[selectedRangesIndex]?.last);

                            if(isInMonth && isSelected) return <SelectedInCell onClick={(e) => onRangeDayClick(day, selectedRangesIndex, e)}>{day.getDate()}</SelectedInCell>;
                            if(isInMonth && !isSelected && isInRange) return <RangeInCell onClick={(e) => onRangeDayClick(day, selectedRangesIndex, e)}>{day.getDate()}</RangeInCell>;
                            if(isInMonth && !isSelected && !isInRange) return <InCell onClick={(e) => onRangeDayClick(day, selectedRangesIndex, e)}>{day.getDate()}</InCell>;
                            if(!isInMonth && isSelected) return <SelectedOutCell>{day.getDate()}</SelectedOutCell>;
                            if(!isInMonth && !isSelected && isInRange) return <RangeOutCell>{day.getDate()}</RangeOutCell>;
                            if(!isInMonth && !isSelected && !isInRange) return <OutCell>{day.getDate()}</OutCell>;

                        }
                    })

                }
                
            </DaysContainer>

            <Divider />
            
            <SelectionControl>

                {
                    (()=> {
                        if(type==="multiRange") {
                            return <Selection onClick={() => {
                                setSelectedRanges([...selectedRanges, { 
                                    first: undefined,
                                    last: undefined
                                }]);
                                setSelectedRangesIndex(selectedRanges.length);
                            }}>Add range</Selection>
                        }
                    })()
                }


                {
                    (() => {
                        if(type==="single" && selectedDate !== undefined) return <Selection>{dateFormat(selectedDate)}</Selection>
                        else if(type==="range" && !(selectedRanges[0].first === undefined && selectedRanges[0].last === undefined))
                            return (
                                <Selection>
                                    <span>{dateRangeFormat(selectedRanges[selectedRangesIndex])}</span> 
                                    <SelectionCloseBtn onClick={() => onRemoveSelection(0)} className="fas fa-times" />
                                </Selection>
                            );
                        else if(type==="multiRange") 
                            return selectedRanges.map((obj, index) => 
                                <Selection selected={index === selectedRangesIndex} onClick={() => {setSelectedRangesIndex(index);}}>
                                    <span>{dateRangeFormat(obj)}</span> 
                                    <SelectionCloseBtn onClick={() => onRemoveSelection(index)} className="fas fa-times" />
                                </Selection>)
                    })()
                }


                
            </SelectionControl>
            
        </CalendarContainer>
    );
}

Calendar.prototype = {
    type: PropTypes.string,
    date: PropTypes.date,
};

export default Calendar;
