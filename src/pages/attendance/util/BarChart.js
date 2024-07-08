import React, { useEffect, useState } from 'react';
import '../../../css/timeAndAttendance.css';

const BarChart = ({ regularHours, overHours }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // 1초 후에 너비를 100%로 설정
        const timeout = setTimeout(() => {
            setAnimate(true);
        }, 1000); // 1초로 변경

        return () => clearTimeout(timeout);
    }, []);

    const totalHours = 52; // 전체 시간
    const regularPercent = (regularHours / totalHours) * 100; // 정규 시간 비율 (%)
    const cumulativePercent = ((regularHours + overHours) / totalHours) * 100; // 누적 초과 시간 비율 (%)


    return (
        <div className="stacked-bar-chart">
            <div className={`cumulative ${animate ? 'animate' : ''}`} style={{width: `${cumulativePercent}%`}}></div>
            <div className={`regular ${animate ? 'animate' : ''}`} style={{width: `${regularPercent}%`}}></div>
        </div>
    );
};

export default BarChart;
