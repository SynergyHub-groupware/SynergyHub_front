import { delMsg, delSendMsg, getBinMsg, getImpMsg, getRevDetail, getRevMsg, getSendMsg, getWorkMsg } from "../modules/MessageModules";
import { request } from "./api";

/* 받은 쪽지 전체 조회 API */
export const callRevMsgListAPI = () => {
    
    return async (dispatch, getState) => {

        try {
            const result = await request('GET', '/emp/message/receive', {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Content-Type': 'application/json'
            });

            console.log('callAPI result : ', result);

            if (result && result.status === 200) {

                dispatch(getRevMsg(result.data));
            } else {
                console.log('error : ', result);
            }
        } catch (error) {
            console.log("error : ", error);
        }
        
    };
};

/* 보낸 쪽지 전체 조회 API */
export const callSendMsgListAPI = () => {

    return async (dispatch, getState) => {

        try {
            const result = await request('GET', '/emp/message/send', {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Content-Type': 'application/json'
            });

            console.log('callAPI result : ' , result);

            if (result && result.status === 200) {
                dispatch(getSendMsg(result.data));
            } else {
                console.log('error : ', result);
            }
        } catch (error) {
            console.log('error : ', error);
        }
    };
};

/* 휴지통 쪽지 전체 조회 API */
export const callBinMsgListAPI = () => {

    return async (dispatch, getState) => {

        try {
            const result = await request('GET', '/emp/message/bin', {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Content-Type': 'application/json'
            });

            console.log('callAPI result : ', result);

            if (result && result.status === 200) {
                dispatch(getBinMsg(result.data));
            } else {
                console.log("error : ", result);
            } 
        } catch (error) {
            console.log('error : ', error);
        }
    };
};

/* 중요 보관함 전체 조회 API */
export const callImpMsgListAPI = () => {

    return async (dispatch, getState) => {

        try {
            const result = await request('GET', '/emp/message/important', {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Content-Type': 'application/json'
            });

            console.log('call API result : ', result);

            if (result && result.status === 200) {
                dispatch(getImpMsg(result.data));
            } else {
                console.log("error : ", result);
            }  
        } catch (error) {
            console.log("error :", error);
        }
    };
};

/* 업무 보관함 전체 조회 API */
export const callWorkMsgListAPI = () => {

    return async (dispatch, getState) => {

        try {
            const result = await request('GET', '/emp/message/work', {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Content-Type': 'application/json'
            });

            console.log('call API result : ', result);

            if (result && result.status === 200) {
                dispatch(getWorkMsg(result.data));
            } else {
                console.log("error : " ,result);
            }
        } catch (error) {
            console.log("error : ", error);
        }
    };
};

/* 임시 보관함 전체 조회 API */
export const callTempMsgListAPI = () => {

    return async (dispatch, getState) => {
        
        try {
            const result = await request('GET', '/emp/message/temp', {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Content-Type': 'application/json'
            });

            console.log('call API result : ', result);

            if (result && result.status === 200) {
                dispatch(getWorkMsg(result.data));
            } else {
                console.log("error : " ,result);
            }
        } catch (error) {
            console.log("error : ", error);
        }
    };
}


/* 받은 쪽지 휴지통 이동 API */
export const callDelMsgAPI = (msgCode) => {
    
    return async (dispatch, getState) => {

        try {
            const result = await request('PUT', `/emp/message/receive/${msgCode}/bin`, {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Content-Type': 'application/json'
            }, {
                storCode: 5
            });

            if (result && result.status === 200) {
                dispatch(delMsg(msgCode));
            } else {
                console.log("error : ", result);
            }
        } catch (error) {
            console.log("del error : ", error);
        }
    };
};

/* 보낸 쪽지 휴지통 이동 API */
export const callDelSendMsgAPI = (msgCode) => {

    return async (dispatch, getState) => {

        try {
            const result = await request('PUT', `/emp/message/send/${msgCode}/bin`, {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Content-Type': 'application/json'
            }, {
                storCode: 5
            });

            if (result && result.status === 200) {
                dispatch(delSendMsg(msgCode));
            } else {
                console.log("error : ", result);
            }
        } catch (error) {
            console.log("del error : ", error);
        }
    };
};

/* 받은 쪽지 디테일 API */
export const callRevDetailAPI = (msgCode) => {

    return async (dispatch, getState) => {

        try {
            const result = await request('GET', `/emp/message/receive/${msgCode}`, {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Content-Type': 'application/json'
            });

            console.log('call API result : ', result);

            if (result && result.status === 200) {
                dispatch(getRevDetail(result.data));
            } else {
                console.log("error : " ,result);
            }
        } catch(error) {
            console.log("error :: ", error);
        }
    };
};

/* 보낸 쪽지 디테일 API */
export const callSendDetailAPI = (msgCode) => {

    return async (dispatch, getState) => {

        try {
            const result = await request('GET', `/emp/message/send/${msgCode}`, {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Content-Type': 'application/json'
            });

            console.log('call API result : ', result);

            if (result && result.status === 200) {
                dispatch(getRevDetail(result.data));
            } else {
                console.log("error : " ,result);
            }
        } catch (error) {
            console.log("error :: ", error);
        }
    };
};