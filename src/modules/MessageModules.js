import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
    messages: [],
    messageDetail: null
};

/* 액션 타입 */
const GET_REV_MSG = 'message/GET_REV_MSG';
const GET_SEND_MSG = 'message/GET_SEND_MSG';
const GET_BIN_MSG = 'message/GET_BIN_MSG';
const GET_IMP_MSG = 'message/GET_IMP_MSG';
const GET_WORK_MSG = 'message/GET_WORK_MSG';
const GET_TEMP_MSG = 'message/GET_TEMP_MSG';
const DEL_MSG = 'message/DEL_MSG';
const DEL_SEND_MSG = 'message/DEL_SEND_MSG';

const GET_REV_DETAIL = 'message/GET_REV_DETAIL';
const GET_SEND_DETAIL = 'message/GET_SEND_DETAIL';

export const { message : { getRevMsg, getSendMsg, getBinMsg, getImpMsg, getWorkMsg, delMsg, getRevDetail, getSendDetail 
    , getTempMsg, delSendMsg
}} = createActions({
    [GET_REV_MSG] : result => {
        console.log('action : ', result);

        return {message: result};
    },

    [GET_SEND_MSG] : result => {
        console.log('action : ', result);

        return {message: result};
    },

    [GET_BIN_MSG] : result => {
        console.log('action : ', result);

        return {message: result};
    },

    [GET_IMP_MSG] : result => {
        console.log('action : ', result);

        return {message: result};
    },

    [GET_WORK_MSG] : result => {
        console.log('action : ', result);

        return {message: result};
    },

    [GET_TEMP_MSG] : result => {
        console.log('action : ', result);

        return {message: result};
    },

    [DEL_MSG] : msgCode => {
        console.log('del action : ', msgCode);

        return { msgCode };
    },

    [GET_REV_DETAIL] : result => {
        console.log('action : ', result);

        return {messageDetail: result};
    },

    [GET_SEND_DETAIL] : result => {
        console.log('action : ', result);

        return {messageDetail: result};
    },

    [DEL_SEND_MSG] : msgCode => {
        console.log('del action : ', msgCode);

        return { msgCode };
    }

}, initialState);


/* 리듀서 */
const messageReducer = handleActions({
    [GET_REV_MSG] : (state, {payload}) => {
        console.log("reducer : ", payload);

        return {
            ...state,
            messages: payload
        };
    },

    [GET_SEND_MSG] : (state, {payload}) => {
        console.log("reducer : ", payload);

        return {
            ...state,
            messages: payload
        };
    },

    [GET_BIN_MSG] : (state, {payload}) => {
        console.log("reducer : ", payload);

        return {
            ...state,
            messages: payload
        }
    },

    [GET_IMP_MSG] : (state, {payload}) => {
        console.log("reducer : ", payload);

        return {
            ...state,
            messages: payload
        }
    },

    [GET_WORK_MSG] : (state, {payload}) => {
        console.log("reducer : ", payload);

        return {
            ...state,
            messages: payload
        }
    },

    [GET_TEMP_MSG] : (state, {payload}) => {
        console.log("reducer : ", payload);

        return {
            ...state,
            messages: payload
        }
    },

    [DEL_MSG] : (state, {payload}) => {
        console.log("del reducer : ", payload);

        return {
            ...state,
            messages: state.messages.map(msg =>
                msg.msgCode === payload.msgCode ? { ...msg, storCode: 5 } : msg
            )
        }
    },

    [GET_REV_DETAIL] : (state, {payload}) => ({
        ...state,
        messageDetail: payload
    }),

    [GET_SEND_DETAIL] : (state, {payload}) => ({
        ...state,
        messageDetail: payload
    }),

    [DEL_SEND_MSG] : (state, {payload}) => {
        console.log("del reducer : ", payload);

        return {
            ...state,
            messages: state.messages.map(msg =>
                msg.msgCode === payload.msgCode ? { ...msg, storCode: 5 } : msg
            )
        }
    }

}, initialState);

export default messageReducer;