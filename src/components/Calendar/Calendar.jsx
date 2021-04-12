import React, {useState} from "react";

import PropTypes from 'prop-types';
import styled from "styled-components";

import DayCell from "./DayCell"

function Calendar({date}) {

    const NUMBER_OF_ROWS = 6;

    const [current, setCurrent] = useState(new Date(date.getTime()));
    const [pointer, setPointer] = useState(new Date(date.getTime()));

    const [selectedDate, setSelectedDate] = useState(undefined);

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    const weekDayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const CalendarContainer = styled.div`
        box-shadow: 0 0 10px #0005;
        padding: 2rem 1rem;
        border-radius: 5px;
    `

    const CalendarHeader = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    `

    const CalendarTitle = styled.span`
        font-size: 2rem;
        font-weight: bold;
        font-family: 'Dancing Script', cursive;
    `
    const MoveArrow = styled.div`
        aspect-ratio: 1/1;
        font-size: 2rem;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: .3s all;

        &:hover {
            background-color: #ccc;
        }
    `

    const DaysContainer = styled.div`
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-column-gap: 10px;
        text-align: center;
    `

    const WeekDayCell = styled.span`
        margin-bottom: 20px;
    `
/*
    const DateCell = styled.span`
        display: flex;
        justify-content: center;
        align-items: center;
        aspect-ratio: 1/1;
        padding: 5px;
        font-size: 1rem;
        transition: .3s all;
        color: ${props => props.out ? "#ccc" : "#40394a"};
        cursor: pointer;

        ${
            props => {
                if(props.selected) return `background-color: red`;
            }
        }
        
        ${
            props => {
                if(!props.out) return `
                    &:hover {
                        background-color: #ccc;
                    }
                `
            }
        }

    `
*/
    const SelectionControl = styled.div`
    
    `

    const CalendarFooter = styled.div`
    
    `

    const getAllDates = (date) => {
        let mDate = new Date(date.getTime());
        mDate.setDate(0);
        let daysBefore = mDate.getDay();
        mDate.setDate(mDate.getDate() - daysBefore);
        return new Array(7*NUMBER_OF_ROWS).fill(0).map( () => {
            mDate.setDate(mDate.getDate() + 1);
            return new Date(mDate.getTime());
        });
    }

    const ydmEquals = (date1, date2) => {
        return date1.getDate() === date2.getDate() &&
         date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() == date2.getMonth();
    }

    const movePointerLeft = _ => {
        let tempDate = new Date(pointer.getTime());
        tempDate.setMonth(tempDate.getMonth() - 1);
        setPointer(tempDate)
    };

    const movePointerRight = _ => {
        let tempDate = new Date(pointer.getTime());
        tempDate.setMonth(tempDate.getMonth() + 1);
        setPointer(tempDate)
        
    } 

    const onDayClick = date => {
        setSelectedDate(date);
    }

    /*
    {
                    getAllDates(pointer).map((day) => {
                        let result = undefined;
                        if(day.getMonth() !== pointer.getMonth()) result = <DateCell out key={`out_${day.getDate()}`}>{day.getDate()}</DateCell>
                        else result = <DateCell key={`in_${day.getDate()}`} onClick={() => onDayClick(day) }>{day.getDate()}</DateCell>
                        return result;
                    })
                }
    */

    return (
       <CalendarContainer>
            <CalendarHeader>
                <MoveArrow onClick={() => movePointerLeft()}><i className="fas fa-chevron-left"  ></i></MoveArrow>
                <CalendarTitle>{`${monthNames[pointer.getMonth()]} ${pointer.getFullYear()}`}</CalendarTitle>
                <MoveArrow onClick={() => movePointerRight()}><i className="fas fa-chevron-right"></i></MoveArrow>
            </CalendarHeader>
            <DaysContainer>
                {
                    weekDayNames.map(day => <WeekDayCell>{day.toUpperCase()}</WeekDayCell>)
                }

                {
                    getAllDates(pointer).map((day) =>
                         <DayCell dayText={day.getDate()} isIn={day.getMonth() === pointer.getMonth()} isSelected={ydmEquals(day, pointer)}/>
                    )
                    
                }

            </DaysContainer>

            <SelectionControl>
                {
                    <span>selectedDate</span>
                }
            </SelectionControl>

            <CalendarFooter>

            </CalendarFooter>

       </CalendarContainer>
    )
}

Calendar.prototype = {
    date: PropTypes.date,
}


export default Calendar;


