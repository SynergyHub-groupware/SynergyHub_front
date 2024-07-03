import { request } from "./api";
import {
    getMyInfo,
    getAttendanceForWeek,
    getAttendanceToday,
    getAttendanceMyAll,
    getAttendanceAll
} from "../modules/AttendanceModules";
import axios from "axios"; // 경로와 파일명 확인

export const callMyInfoAPI = () => {
    return async (dispatch, getState) => {
        try {
            const result = await request('GET', '/employee/myInfo', {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Content-Type': 'application/json'
            });

            console.log('callMyInfoAPI result : ', result);

            if (result && result.status === 200) {
                dispatch(getMyInfo(result.data));
            } else {
                console.error('내정보 조회 실패 result : ', result);
            }
        } catch (error) {
            console.error('내정보 조회 실패 error : ', error);
        }
    }
};

export const callMyAttendanceForWeekAPI = () => {
    return async (dispatch, getState) => {
        try {
            const result = await request('GET', '/api/attendance/my-current-week', {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Content-Type': 'application/json'
            });

            console.log('callMyAttendanceForWeekAPI result : ', result);

            if (result && result.status === 200) {
                dispatch(getAttendanceForWeek(result.data.results.attendances));
            } else {
                console.error('금주의 근태정보 조회 실패 result : ', result);
            }
        } catch (error) {
            console.error('금주의 근태정보 조회 실패:', error);
        }
    };
};

export const callAttendanceTodayAPI = () => {
    return async (dispatch, getState) => {
        try {
            const result = await request('GET', '/api/attendance/today', {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Content-Type': 'application/json'
            });

            console.log('callAttendanceTodayAPI result : ', result);

            if (result && result.status === 200) {
                dispatch(getAttendanceToday(result.data.results.attendance));
            } else {
                console.error('오늘의 근태정보 조회 실패 result : ', result);
            }
        } catch (error) {
            console.error('오늘의 근태정보 조회 실패 error : ', error);
        }
    };
};

export const callAttendanceAllAPI = () => {
    return async (dispatch, getState) => {
        try {
            const result = await request('GET', '/api/attendance/all', {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Content-Type': 'application/json'
            });

            console.log('callAttendanceAllAPI result : ', result);

            if (result && result.status === 200) {
                dispatch(getAttendanceAll(result.data.results.attendances));
            } else {
                console.error('개인별 전체 근태정보 조회 실패 result : ', result);
            }
        } catch (error) {
            console.error('개인별 전체 근태정보 조회 실패 error : ', error);
        }
    };
};


