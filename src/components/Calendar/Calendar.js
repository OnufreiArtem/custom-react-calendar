import React, {useState} from "react";

import PropTypes from 'prop-types';
import styled from "styled-components";

function Calendar({date}) {

    const NUMBER_OF_ROWS = 6;

    const [current, setCurrent] = useState(new Date(date.getTime()));
    const [pointer, setPointer] = useState(new Date(date.getTime()));

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    const weekDayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const CalendarContainer = styled.div`
        box-shadow: 0 0 10px #0005;
        padding: 2rem 1rem;
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
    `

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
                if(!props.out) return `
                    &:hover {
                        background-color: #ccc;
                    }
                `
            }
        }

    `

    const SelectionControl = styled.div`
    
    `

    const CalendarFooter = styled.div`
    
    `

    const getBeforeDates = (date) => {
        let mDate = new Date(date.getTime());
        mDate.setDate(0);
        let daysBefore = mDate.getDay();
        mDate.setDate(mDate.getDate() - daysBefore);
        return new Array(daysBefore).fill(0).map((_, index) => {
            mDate.setDate(mDate.getDate() + 1);
            return mDate.getDate();
        })
    }

    const getMonthDates = (date) => {
        console.log(new Date(date.getFullYear(), date.getMonth() + 2, 0))
        return new Array(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()).fill(0).map((_, index) => {
            return index + 1;
        })
    }


    const getAfterDates = (date) => {   
        console.log(date)
        console.log(getBeforeDates(date).length) 
        
        return new Array(7*NUMBER_OF_ROWS - getBeforeDates(date).length - getMonthDates(date).length).fill(0).map((_, index) => {
            return index + 1;
        })
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
                    getBeforeDates(pointer).map((day, index) => <DateCell key={"before_" + index} out>{day}</DateCell>)
                }
                {
                    getMonthDates(pointer).map((day, index) => <DateCell key={"in_" + index} onClick={() => console.log(`Clicked => ${day}`)}>{day}</DateCell>)
                }
                {
                    getAfterDates(pointer).map((day, index) => <DateCell key={"after_" + index} out>{day}</DateCell>)
                }
            </DaysContainer>

            <SelectionControl>

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


