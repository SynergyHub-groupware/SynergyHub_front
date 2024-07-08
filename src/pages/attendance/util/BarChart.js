import React, { useEffect, useState } from 'react';
import '../../../css/timeAndAttendance.css';
import { useDispatch, useSelector } from "react-redux";
import { callMyAttendanceForWeekAPI } from "../../../apis/AttendancelAPICalls";

const BarChart = () => {
    const [animate, setAnimate] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callMyAttendanceForWeekAPI());
        // 1초 후에 너비를 100%로 설정
        const timeout = setTimeout(() => {
            setAnimate(true);
        }, 1000); // 1초로 변경

        return () => clearTimeout(timeout);
    }, []);

    // 예제에서 사용한 calculateWorkHours 함수 정의
    const calculateWorkHours = (date, startTime, endTime, owStartTime, owEndTime) => {
        if (!date || !startTime || !endTime || !owStartTime || !owEndTime ||
            startTime === "00:00:00" || endTime === "00:00:00" || owStartTime === "00:00:00" || owEndTime === "00:00:00") {
            return "00:00:00";
        }

        const start = new Date(`${date}T${startTime}`);
        const end = new Date(`${date}T${endTime}`);
        const owStart = new Date(`${date}T${owStartTime}`);
        const owEnd = new Date(`${date}T${owEndTime}`);

        let totalSeconds;
        if (end > owEnd) {
            totalSeconds = Math.floor((owEnd.getTime() - owStart.getTime()) / 1000);
        } else {
            totalSeconds = Math.floor((end.getTime() - owStart.getTime()) / 1000);
        }

        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        // 평일 계산
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        return formattedTime;
    };

    // 총 근무 시간을 계산하는 함수
    const calculateTotalWorkHours = (attendances) => {
        let totalWorkHoursInSeconds = 0;

        attendances.forEach((attendance) => {
            const { atdDate, atdStartTime, atdEndTime, owStartTime, owEndTime } = attendance;
            const workHours = calculateWorkHours(atdDate, atdStartTime, atdEndTime, owStartTime, owEndTime);

            // '-' 이면 주말이거나 날짜나 시간이 비어있는 경우이므로 더하지 않음
            if (workHours !== null) {
                const [hoursStr, minutesStr, secondsStr] = workHours.split(':');
                const hours = parseInt(hoursStr, 10);
                const minutes = parseInt(minutesStr, 10);
                const seconds = parseInt(secondsStr, 10);

                totalWorkHoursInSeconds += hours * 3600 + minutes * 60 + seconds;
            }
        });

        return totalWorkHoursInSeconds;
    };

    // 정규 근무 시간 계산 함수
    const calculateRegularWorkHours = (attendances) => {
        let regularWorkHoursInSeconds = 0;

        attendances.forEach((attendance) => {
            const { atdDate, atdStartTime, atdEndTime } = attendance;
            const workHours = calculateWorkHours(atdDate, atdStartTime, atdEndTime, atdStartTime, atdEndTime);

            // '-' 이면 주말이거나 날짜나 시간이 비어있는 경우이므로 더하지 않음
            if (workHours !== null) {
                const [hoursStr, minutesStr, secondsStr] = workHours.split(':');
                const hours = parseInt(hoursStr, 10);
                const minutes = parseInt(minutesStr, 10);
                const seconds = parseInt(secondsStr, 10);

                regularWorkHoursInSeconds += hours * 3600 + minutes * 60 + seconds;
            }
        });

        return regularWorkHoursInSeconds;
    };

    // 초과 근무 시간 계산 함수
    const calculateOverTimeHours = (attendances) => {
        let overTimeHoursInSeconds = 0;

        attendances.forEach((attendance) => {
            const { atdDate, atdStartTime, atdEndTime, owStartTime, owEndTime } = attendance;
            const workHours = calculateWorkHours(atdDate, atdStartTime, atdEndTime, owStartTime, owEndTime);

            // '-' 이면 주말이거나 날짜나 시간이 비어있는 경우이므로 더하지 않음
            if (workHours !== null) {
                const [hoursStr, minutesStr, secondsStr] = workHours.split(':');
                const hours = parseInt(hoursStr, 10);
                const minutes = parseInt(minutesStr, 10);
                const seconds = parseInt(secondsStr, 10);

                if (hours > 8) { // 정규 근무 시간을 초과하는 경우만 초과 근무로 계산
                    overTimeHoursInSeconds += hours * 3600 + minutes * 60 + seconds;
                }
            }
        });

        return overTimeHoursInSeconds;
    };

    // Redux의 useSelector를 사용하여 attendances 배열을 가져온다.
    const attendances = useSelector((state) => state.attendanceReducer.attendances);

    // 총 근무 시간을 초 단위로 계산
    const totalWorkHoursInSeconds = calculateTotalWorkHours(attendances);

    // 정규 근무 시간을 초 단위로 계산
    const regularWorkHoursInSeconds = calculateRegularWorkHours(attendances);

    // 초과 근무 시간을 초 단위로 계산
    const overTimeHoursInSeconds = calculateOverTimeHours(attendances);

    // 정규 근무 시간을 시간:분:초 형식으로 변환하는 함수
    const formatTime = (totalSeconds) => {
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // 예상되는 총 정규 근무 시간 (예를 들어 40시간)
    const totalHours = 52 * 3600; // 초 단위로 변환

    // 정규 시간 비율 (%) 계산
    const regularPercent = (regularWorkHoursInSeconds / totalHours) * 100;

    // 초과 근무 시간 비율 (%) 계산
    const overTimePercent = (overTimeHoursInSeconds / totalHours) * 100;

    // 정규 근무 시간을 시간:분:초 형식으로 변환
    const formattedRegularWorkHours = formatTime(regularWorkHoursInSeconds);

    // 초과 근무 시간을 시간:분:초 형식으로 변환
    const formattedOverTimeHours = formatTime(overTimeHoursInSeconds);

    return (
        <>
            <div className="hp_fw700 hp_fs32">18h 00m</div>
            <div className="hp_mt15" style={{paddingBottom: '5px'}}>
                <div className="stacked-bar-chart">
                    <div className={`cumulative ${animate ? 'animate' : ''}`}
                         style={{width: `${overTimePercent}%`}}></div>
                    <div className={`regular ${animate ? 'animate' : ''}`} style={{width: `${regularPercent}%`}}></div>
                </div>
            </div>
            <ul className="hp_mt15">
                <li className="" style={{paddingBottom: '5px'}}>
                    <b className="hp_fw700 hp_mr15">누적 정규 근무</b> {formattedRegularWorkHours}
                </li>
                <li className="">
                    <b className="hp_fw700 hp_mr15">누적 초과 근무</b> {formattedOverTimeHours}
                </li>
            </ul>
        </>
    );
};

export default BarChart;
