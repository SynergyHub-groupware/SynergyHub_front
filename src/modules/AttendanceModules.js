import { createActions, handleActions } from 'redux-actions';

// 초기 상태 정의
const initialState = {
    employee: {},
    attendances: [],
    attendanceToday: null,
    attendanceAll: [],
    dayOffs: [],
    dayOffBalance: {},
    schedules: [],
    AllAttendanceToday: []
};

// 액션 타입 정의
const SUCCESS = 'attendance/SUCCESS';
const GET_MY_INFO = 'employee/GET_MY_INFO';
const GET_ATTENDANCE_FOR_WEEK = 'attendance/GET_ATTENDANCE_FOR_WEEK';
const GET_ATTENDANCE_TODAY = 'attendance/GET_ATTENDANCE_TODAY';
const GET_ATTENDANCE_ALL = 'attendance/GET_ATTENDANCE_ALL';
const GET_DAY_OFF_ALL = 'dayOffs/GET_DAY_OFF_ALL';
const GET_DAY_OFF_BALANCE = 'dayOffs/GET_DAY_OFF_BALANCE';
const GET_DEFAULT_SCHEDULE = 'attendance/GET_DEFAULT_SCHEDULE';
const GET_ALL_ATTENDANCE_TODAY = 'attendance/GET_ALL_ATTENDANCE_TODAY';

// 액션 함수
export const {
    employee: { getMyInfo },
    attendance: { getAttendanceForWeek, getAttendanceToday, getAttendanceAll, getDefaultSchedule, getAllAttendanceToday },
    dayOffs: { getDayOffAll, getDayOffBalance }
    } =
    createActions({
    [GET_MY_INFO]: (employee) => ({ employee }),
    [SUCCESS]: () => ({ success: true }),
    [GET_ATTENDANCE_FOR_WEEK]: (attendances) => ({ attendances }),
    [GET_ATTENDANCE_TODAY]: (attendanceToday) => ({ attendanceToday }),
    [GET_ATTENDANCE_ALL]: (attendanceAll) => ({ attendanceAll }),
    [GET_DAY_OFF_ALL]: (dayOffs) => ({ dayOffs }),
    [GET_DAY_OFF_BALANCE]: (dayOffBalance) => ({ dayOffBalance }),
    [GET_DEFAULT_SCHEDULE]: (schedules) => ({ schedules }),
    [GET_ALL_ATTENDANCE_TODAY]: (AllAttendanceToday) => ({ AllAttendanceToday }),
    });

// 리듀서
const attendanceReducer = handleActions({
    [SUCCESS]: (state, { payload }) => ({
        ...state,
        success: payload.success
    }),
    [GET_MY_INFO]: (state, { payload }) => ({
        ...state,
        employee: payload.employee
    }),
    [GET_ATTENDANCE_FOR_WEEK]: (state, { payload }) => ({
        ...state,
        attendances: payload.attendances
    }),
    [GET_ATTENDANCE_TODAY]: (state, { payload }) => ({
        ...state,
        attendanceToday: payload.attendanceToday
    }),
    [GET_ATTENDANCE_ALL]: (state, { payload }) => ({
        ...state,
        attendanceAll: payload.attendanceAll
    }),
    [GET_DAY_OFF_ALL]: (state, { payload }) => ({
        ...state,
        dayOffs: payload.dayOffs
    }),
    [GET_DAY_OFF_BALANCE]: (state, { payload }) => ({
        ...state,
        dayOffBalance: payload.dayOffBalance
    }),
    [GET_DEFAULT_SCHEDULE]: (state, { payload }) => ({
        ...state,
        schedules: payload.schedules
    }),
    [GET_ALL_ATTENDANCE_TODAY]: (state, { payload }) => ({
        ...state,
        AllAttendanceToday: payload.AllAttendanceToday
    }),
}, initialState);

export default attendanceReducer;
