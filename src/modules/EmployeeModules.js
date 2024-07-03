import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {
    employees: [],
    employee: {},
    recordCard: {},
    departments: [],
    titles: [],
    positions: [],
    deptDetail: {},
    success: {},
    teamRecordCard: {},
    registEmployees: [],
};

/* 액션 타입 */
const GET_DEPT_EMPLOYEES = 'employee/GET_DEPT_EMPLOYEES';   // 부서인원
const GET_MY_INFO = 'employee/GET_MY_INFO';                 // 내정보 조회
const GET_RECORDCARD = 'employee/GET_RECORDCARD';           // 나의 인사기록카드
const GET_DEPARTMENTS = 'employee/GET_DEPARTMENTS';         // 부서 목록
const GET_TITLES = 'employee/GET_TITLES';
const GET_POSITIONS = 'employee/GET_POSITIONS';
const GET_DEPT_DETAIL = 'employee/GET_DEPT_DETAIL';         // 부서 상세정보
const SUCCESS = 'employee/SUCCESS';                         // 등록, 수정, 삭제
const GET_TEAM_RECORDCARD = 'employee/GET_TEAM_RECORDCARD'; // 팀원 인사기록카드
const REGIST_EMPLOYEES = 'employee/REGIST_EMPLOYEES';

/* 액션 함수 */
export const { employee : { getDeptEmployees, getMyInfo, getRecordcard, getDepartments, getTitles, getPositions, getDeptDetail, success, getTeamRecordcard, registEmployees } } = createActions ({

    [GET_DEPT_EMPLOYEES] : result => {

        console.log('GET_DEPT_EMPLOYEES Action payload:', result);

        return {employees: result};

    },
    [GET_MY_INFO] : result => {

        console.log('GET_MY_INFO Action payload', result);

        return {employee: result};
    },
    [GET_RECORDCARD] : result => {

        console.log('GET_RECORDCARD Action payload : ', result);

        return {recordCard: result};
    },
    [GET_DEPARTMENTS] : result => {

        // console.log('GET_DEPARTMENTS Action payload:', result);

        return {departments: result};

    },
    [GET_TITLES] : result => {
        return {titles: result};
    },
    [GET_POSITIONS] : result => {
        return {positions: result};
    },
    [GET_DEPT_DETAIL] : result => {

        console.log('GET_DEPT_DETAIL Action payload', result);

        return {deptDetail : result};
    },
    [SUCCESS] : result => {

        console.log('SUCCESS Action payload', result);

        return {success : true};
    },
    [GET_TEAM_RECORDCARD] : result => {

        console.log('GET_TEAM_RECORDCARD Action payload', result);

        return {teamRecordCard : result};
    },
    [REGIST_EMPLOYEES] : result => {

        console.log('REGIST_EMPLOYEES Action payload : ', result);

        return { registEmployees : result};
    },
});


/* 리듀서 함수 */
const employeeReducer = handleActions({

    [GET_DEPT_EMPLOYEES] : (state, { payload }) => {

        console.log('Reducer GET_DEPT_EMPLOYEES payload: ', payload);

        return {
            ...state,
            employees: payload.employees,

        };
    },
    [GET_MY_INFO] : (state, { payload }) => {

        // 이다정: 주석처리
        // console.log('Reducer GET_MY_INFO payload', payload);

        return {
            ...state,
            employee: payload.employee,
        };
    },
    [GET_RECORDCARD] : ( state, { payload }) => {

        console.log('Reducer GET_RECORDCARD payload : ', payload);

        return {
            ...state,
            recordCard: payload.recordCard,
        };
    },
    [GET_DEPARTMENTS] : ( state, { payload }) => {

        // console.log('Reducer GET_DEPARTMENS payload:', payload);

        return {
            ...state,
            departments: payload.departments,
        };
    },
    [GET_TITLES] : (state, {payload}) => {
        return {
            ...state,
            titles: payload.titles,
        };
    },
    [GET_POSITIONS] : (state, {payload}) => {
        return {
            ...state,
            positions: payload.positions,
        }
    },
    [GET_DEPT_DETAIL] : ( state, { payload }) => {

        console.log('Reducer GET_DEPT_DETAIL payload : ', payload);

        return {
            ...state,
            deptDetail: payload.deptDetail,
        };
    },
    [SUCCESS] : ( state, { payload }) => {

        console.log('Reducer SUCCESS payload : ', payload);

        return {
            ...state,
            success: payload.success,
        };
    },
    [GET_TEAM_RECORDCARD] : ( state, { payload }) => {

        console.log('Reducer GET_TEAM_RECORDCARD payload : ', payload);

        return {
            ...state,
            teamRecordCard: payload.teamRecordCard,
        };
    },
    [REGIST_EMPLOYEES] : ( state, { payload }) => {

        console.log('Reducer REGIST_EMPLOYEES payload : ', payload);

        return {
            ...state,
            registEmployees: payload.registEmployees,
        };
    },

}, initialState);

export default employeeReducer;