import {getContent, getDocuments, getForms, getLineemps, getLines, getSuccess} from "../modules/ApprovalModules";
import { request } from "./api";

export const callFormListAPI = () => {              // 결재양식리스트 조회
    return async (dispatch, getState) => {
        const result = await request('GET', '/approval/formList');
        if(result && result.status === 200) dispatch(getForms(result));
    }
}

export const callFormContentAPI = (afCode) => {     // 결재양식기본내용 조회
    return async (dispatch, getState) => {
        const result = await request('GET', `/approval/formContent?afCode=${afCode}`);
        if(result && result.status === 200) dispatch(getContent(result));
    }
}

export const callFormLineAPI = ({lsCode}) => {      // 결재라인 특정 조회
    return async (dispatch, getState) => {
        const result = await request('GET', `/approval/formLine?lsCode=${lsCode}`);
        if(result && result.status === 200) dispatch(getLines(result));
    }
}

export const callLineEmpListAPI = ({deptCode, titleCode, lsCode}) => {      // 결재라인 회원 조회(본인 기준)
    return async (dispatch, getState) => {
        const result = await request('GET', `/approval/formLineEmp?deptCode=${deptCode}&titleCode=${titleCode}&lsCode=${lsCode}`);
        if(result && result.status === 200) dispatch(getLineemps(result));
    }
}

export const fetchImage = async (empCode) => {      // 결재서명 이미지 조회(본인 기준)
    try {
        const response = await fetch(`http://localhost:8080/approval/sign?empCode=${empCode}`);
        if (response.ok) {
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            return imageUrl;
        } else {
            console.error('Failed to fetch image');
            return null;
        }
    } catch (error) {
        console.error('Error fetching image:', error);
        return null;
    }
};

export const callApprovalDocRegistAPI = ({formData, temporary}) => {        // 결재 등록
    return async (dispatch, getState) => {
        try {
            const response = await request('POST', `/approval/regist?temporary=${temporary}`,
                {"Content-Type": "multipart/form-data"},
                formData
            );

            if (response && response.status === 201) {
                dispatch(temporary ? getSuccess("임시저장") : getSuccess("상신"));
            };

        } catch (error) {
            console.error("Document and file upload error:", error);
        }
    }
}

export const callsendDocListAPI = ({currentPage = 1, empCode, status}) => {
    return async (dispatch, getState) => {
        const result = await request('GET', `/approval/send/document?page=${currentPage}&empCode=${empCode}&status=${status}`);
        if(result && result.status === 200) dispatch(getDocuments(result));
    }
}

export const callviewLineListAPI = (adCode) => {
    return async (dispatch, getState) => {
        const result = await request('GET', `/approval/viewLine?adCode=${adCode}`);
        if(result && result.status === 200) dispatch(getLines(result));
    }
}

export const callviewDetailAPI = (adDetail) => {
    return async (dispatch, getState) => {
        const result = await request('GET', `/approval/viewDetail?adDetail=${adDetail}`);
        if(result && result.status === 200) dispatch(getContent(result));
    }
}

export const callviewAttachAPI = (adCode) => {
    return async (dispatch, getState) => {
        const result = await request('GET', `/approval/viewAttach?adCode=${adCode}`);
        if(result && result.status === 200) dispatch(getDocuments(result));
    }
}

export const calldownloadAttachAPI = (attachOriginal, attachSave) => {
    const encodedAttachOriginal = encodeURIComponent(attachOriginal);
    const encodedAttachSave = encodeURIComponent(attachSave);

    return async (dispatch, getState) => {
        const result = await request('GET', `/approval/downloadAttach?attachOriginal=${encodedAttachOriginal}&attachSave=${encodedAttachSave}`, null, null, 'blob');

        if (result) {
            const url = window.URL.createObjectURL(new Blob([result.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', attachOriginal); // set the file name
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
    }
}

export const calldeleteDocumentAPI = (adCode) => {
    return async (dispatch, getState) => {
        await request('DELETE', `/approval/document/delete?adCode=${adCode}`);
    }
}

export const callmodifyStatusAPI = (adCode) => {
    return async (dispatch, getState) => {
        await request ('PATCH', `/approval/modifyStatus?adCode=${adCode}`);
    }
}