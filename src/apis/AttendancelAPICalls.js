import { request } from "./api";
import {
    getMyInfo,
    getAttendanceForWeek,
    getAttendanceToday,
    getAttendanceAll,
    getDayOffAll,
    getDayOffBalance,
    getDefaultSchedule
} from "../modules/AttendanceModules";

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
    };
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

export const callDayOffAllAPI = () => {
    return async (dispatch, getState) => {
        try {
            const result = await request('GET', '/api/attendance/dayOff', {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Content-Type': 'application/json'
            });

            console.log('callDayOffAllAPI result : ', result);

            if (result && result.status === 200) {
                dispatch(getDayOffAll(result.data.results.dayOffs));
            } else {
                console.error('전체 휴가기록 조회 실패 result : ', result);
            }
        } catch (error) {
            console.error('전체 휴가기록 조회 실패 error : ', error);
        }
    };
};

export const callDayOffBalanceAPI = () => {
    return async (dispatch, getState) => {
        try {
            const result = await request('GET', '/api/attendance/my-dayOffBalance', {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Content-Type': 'application/json'
            });

            console.log('callDayOffBalanceAPI result : ', result);

            if (result && result.status === 200) {
                dispatch(getDayOffBalance(result.data.results.dayOffBalance));
            } else {
                console.error('보유 휴가현황 조회 실패 result : ', result);
            }
        } catch (error) {
            console.error('보유 휴가현황 조회 실패 error : ', error);
        }
    };
};

export const callDefaultScheduleAPI = () => {
    return async (dispatch, getState) => {
        try {
            const result = await request('GET', '/api/attendance/allSchedules', {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Content-Type': 'application/json'
            });

            console.log('callDefaultScheduleAPI result : ', result);

            if (result && result.status === 200) {
                dispatch(getDefaultSchedule(result.data.results.schedules));
            } else {
                console.error('지정 출퇴근시간 조회 실패 result : ', result);
            }
        } catch (error) {
            console.error('지정 출퇴근시간 조회 실패 error : ', error);
        }
    };
};