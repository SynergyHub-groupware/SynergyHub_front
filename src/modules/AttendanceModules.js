import { createActions, handleActions } from 'redux-actions';

// 초기 상태 정의
const initialState = {
    employee: {},
    attendances: [],
};

// 액션 타입 정의
const GET_MY_INFO = 'employee/GET_MY_INFO';
const GET_ATTENDANCE_FOR_WEEK = 'attendance/GET_ATTENDANCE_FOR_WEEK';
const GET_ATTENDANCE_TODAY = 'attendance/GET_ATTENDANCE_TODAY';
const GET_ATTENDANCE_ALL = 'attendance/GET_ATTENDANCE_ALL';

// 액션 함수 생성
const actions = createActions({
    [GET_MY_INFO]: (employee) => ({ employee }),
    [GET_ATTENDANCE_FOR_WEEK]: (attendances) => ({ attendances }),
    [GET_ATTENDANCE_TODAY]: (attendanceToday) => ({ attendanceToday }),
    [GET_ATTENDANCE_ALL]: (attendanceAll) => ({ attendanceAll })
});

// 내보내기
export const { employee: { getMyInfo }, attendance: { getAttendanceForWeek, getAttendanceToday, getAttendanceAll } } = actions;

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
}, initialState);

export default attendanceReducer;