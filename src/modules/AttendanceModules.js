import { createActions, handleActions } from 'redux-actions';

// 초기 상태 정의
const initialState = {
    employee: {},
    attendances: [],
    attendanceToday: null, // 오늘의 근태 정보를 위한 상태 추가
    attendanceAll: [], // 전체 근태 정보를 위한 상태 추가
    dayOffs: [],
    dayOffBalance: {}
};

// 액션 타입 정의
const GET_MY_INFO = 'employee/GET_MY_INFO';
const GET_ATTENDANCE_FOR_WEEK = 'attendance/GET_ATTENDANCE_FOR_WEEK';
const GET_ATTENDANCE_TODAY = 'attendance/GET_ATTENDANCE_TODAY';
const GET_ATTENDANCE_ALL = 'attendance/GET_ATTENDANCE_ALL';
const GET_DAY_OFF_ALL = 'dayOffs/GET_DAY_OFF_ALL';
const GET_DAY_OFF_BALANCE = 'dayOffs/GET_DAY_OFF_BALANCE';

// 액션 함수 생성
const actions = createActions({
    [GET_MY_INFO]: (employee) => ({ employee }),
    [GET_ATTENDANCE_FOR_WEEK]: (attendances) => ({ attendances }),
    [GET_ATTENDANCE_TODAY]: (attendanceToday) => ({ attendanceToday }),
    [GET_ATTENDANCE_ALL]: (attendanceAll) => ({ attendanceAll }),
    [GET_DAY_OFF_ALL]: (dayOffs) => ({ dayOffs }),
    [GET_DAY_OFF_BALANCE]: (dayOffBalance) => ({ dayOffBalance })
});

// 내보내기
export const {
    employee: { getMyInfo },
    attendance: { getAttendanceForWeek, getAttendanceToday, getAttendanceAll },
    dayOffs: { getDayOffAll, getDayOffBalance }
} = actions;

// 리듀서 함수 정의
const attendanceReducer = handleActions({
    [GET_MY_INFO]: (state, { payload }) => ({
        ...state,
        employee: payload.employee,
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
}, initialState);

export default attendanceReducer;
