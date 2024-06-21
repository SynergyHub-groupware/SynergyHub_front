import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko.js'; // 한국어 번역을 추가하려면 import
import { useDispatch, useSelector } from "react-redux";
import { callFormContentAPI } from "../../../apis/ApprovalAPICalls";

function Etc({handleDetail}) {

    // 양식내용 출력 
    const dispatch = useDispatch();
    const {afCode} = useParams();   
    const content = useSelector(state => state.approvalReducer.content);

    useEffect(() => {
        afCode && dispatch(callFormContentAPI(afCode));
    }, [afCode, dispatch]);

    const [editorData, setEditorData] = useState('');
    const [exception, setException] = useState({});
    
    useEffect(() => {
        if (content && content.afCon !== undefined) setEditorData(content.afCon || '');
    }, [content]);
    
    const handleChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);    // 입력받은 내용 에디터에 넣음
        setException(prev => ({
            ...prev,
            aeCon: data         // 입력받은 내용 exception에 넣음
        }));
    };

    useEffect(() => {
        handleDetail(exception);
    }, [exception]);

    return (
        <CKEditor editor={ClassicEditor} data={editorData} onChange={handleChange} />
    );
}

export default Etc;
