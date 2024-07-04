import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
    messages: [],
    revMessage: [],
    sendMessage: [],
    impMessage: [],
    workMessage: [],
    binMessage: [],
    messageDetail: null,
    attachments : []
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
const UP_MSG_STATUS = 'message/UP_MSG_STATUS';
const UP_MSG_STATUS_NR = 'message/UP_MSG_STATUS_NR';
const MOV_MSG_IMP = 'message/MOV_MSG_IMP';
const MOV_MSG_WORK = 'message/MOV_MSG_WORK';
const MOV_MSG_REV = 'message/MOV_MSG_REV';

const GET_REV_DETAIL = 'message/GET_REV_DETAIL';
const GET_SEND_DETAIL = 'message/GET_SEND_DETAIL';
const GET_ATTACH_LIST = 'message/GET_ATTACH_LIST';

const UP_REV_MSG_STATUS = 'message/UP_REV_MSG_STATUS';
const UP_ALL_REV_STATUS = 'message/UP_ALL_REV_STATUS';

export const { message : { getRevMsg, getSendMsg, getBinMsg, getImpMsg, getWorkMsg, delMsg, getRevDetail, getSendDetail 
    , getTempMsg, delSendMsg, upMsgStatus, getAttachList, movMsgImp, movMsgWork, movMsgRev, upRevMsgStatus, upMsgStatusNr,
    upAllRevStatus
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
    },

    [UP_MSG_STATUS] : msgCode => {
        console.log('up action : ', msgCode);

        return { msgCode };
    },

    [GET_ATTACH_LIST] : msgCode => {
        console.log('attach action : ', msgCode);

        return { msgCode };
    },

    [MOV_MSG_IMP] : msgCode => {
        console.log('move to important : ', msgCode);

        return { msgCode };
    },

    [MOV_MSG_WORK] : msgCode => {
        console.log('move to work : ', msgCode);

        return { msgCode };
    },

    [MOV_MSG_REV] : msgCode => {
        console.log('move to rev : ', msgCode);

        return { msgCode };
    },

    [UP_REV_MSG_STATUS] : msgCodes => {
        console.log("up rev msg status action : ", msgCodes);

        return { msgCodes };
    },

    [UP_MSG_STATUS_NR] : msgCode => {
        console.log('up nr action : ', msgCode);

        return { msgCode };
    },

    [UP_ALL_REV_STATUS] : msgCodes => {
        console.log("up rev all msg status action : ", msgCodes);

        return { msgCodes };
    }

}, initialState);


/* 리듀서 */
const messageReducer = handleActions({
    [GET_REV_MSG] : (state, {payload}) => {
        console.log("reducer : ", payload);

        return {
            ...state,
            revMessage: payload
        };
    },

    [GET_SEND_MSG] : (state, {payload}) => {
        console.log("reducer : ", payload);

        return {
            ...state,
            sendMessage: payload
        };
    },

    [GET_BIN_MSG] : (state, {payload}) => {
        console.log("reducer : ", payload);

        return {
            ...state,
            binMessage: payload
        }
    },

    [GET_IMP_MSG] : (state, {payload}) => {
        console.log("reducer : ", payload);

        return {
            ...state,
            impMessage: payload
        }
    },

    [GET_WORK_MSG] : (state, {payload}) => {
        console.log("reducer : ", payload);

        return {
            ...state,
            workMessage: payload
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
    },

    [UP_MSG_STATUS] : (state, {payload}) => {
        console.log("up reducer : ", payload);

        const updatedMsg = state.messages.map(msg =>
            msg.msgCode === payload.msgCode ? { ...msg, msgStatus: 'Y'} : msg
        );

        return {
            ...state,
            messages: updatedMsg
        };
    },

    [GET_ATTACH_LIST] : (state, {payload}) => {
        console.log("attach reducer : ", payload);

        return {
            ...state,
            attachments: payload
        }
    },

    [MOV_MSG_IMP] : (state, {payload}) => {
        console.log("move to imp reducer : ", payload);

        return {
            ...state,
            messages: state.messages.map(msg =>
                msg.msgCode === payload.msgCode ? { ...msg, storCode: 2 } : msg
            )
        }
    },

    [MOV_MSG_WORK] : (state, { payload }) => {
        console.log("move to work reducer : ", payload);

        return {
            ...state,
            messages: state.messages.map(msg =>
                msg.msgCode === payload.msgCode ? { ...msg, storCode: 3 } : msg
            )
        }
    },

    [MOV_MSG_REV] : (state, { payload }) => {
        console.log("move to rev reducer : ", payload);

        return {
            ...state,
            messages: state.messages.map(msg => 
                msg.msgCode === payload.msgCode ? { ...msg, storCode: 1 } : msg
            )
        }
    },

    [UP_REV_MSG_STATUS] : (state, { payload }) => {
        console.log("up rev msg status reducer : ", payload);

        const updateRevMsgs = state.revMessage.map(msg =>
            payload.msgcodes.includes(msg.msgCode) ? { ...msg, msgStatus: 'Y' } : msg
        );

        return {
            ...state,
            revMessage: updateRevMsgs
        }
    },

    [UP_MSG_STATUS_NR] : (state, {payload}) => {
        console.log("up nr reducer : ", payload);

        const updateMsgNr = state.messages.map(msg => 
            msg.msgCode === payload.msgCode ? { ...msg, msgStatus: 'N' } : msg
        );

        console.log("updateMsgNr : ", updateMsgNr);

        return {
            ...state,
            messages: updateMsgNr
        };
    },

    [UP_ALL_REV_STATUS] : (state, { payload }) => {
        console.log("up all rev msg to bin reducer : ", payload);

        const updateAllRevStor = state.revMessage.map(msg =>
            payload.msgCodes.includes(msg.msgCode) ? { ...msg, revStor: '5'} : msg
        );

        return {
            ...state,
            revMessage: updateAllRevStor
        }
    }

}, initialState);

export default messageReducer;