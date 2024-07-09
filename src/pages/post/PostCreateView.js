import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGETBoardList, callGETLowBoardList,callGETSoftList } from './postApi/PostAPI';
import { callMyInfoAPI } from '../../apis/EmployeeAPICalls';

function PostCreateView() {
    const [formData, setFormData] = useState({
        postName: '',
        postCon: '',
        attachFile: '',
        postCommSet: 3,  // 기본값: 둘다 비활성화
        lowBoardCode: '',
        psCode:'',
        empCode:''
    });
    const dispatch = useDispatch();
    const BoardState = useSelector(state => state.post.BoardState);
    const LowBoardState = useSelector(state => state.post.LowBoardState);
    const SoftListState=useSelector(state => state.post.SortListState);


    const [empCode,setEmpCode]=useState('')
    console.log("empcode",empCode)
    useEffect(() => {
      dispatch(callMyInfoAPI());
  }, []);
  const employees = useSelector(state => state.employeeReducer.employee);
  
//   useEffect(() => {
//       setEmpCode(employees.map(employee => (
//         {
//           emp_code: employee.emp_code,
//         }
//       )));
//     }, [employees]);
  

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 +1 해줘야 함
        const day = currentDate.getDate();

        return `${year}.${month}.${day}`;
    };



    useEffect(() => {
        dispatch(callGETBoardList());
    }, [dispatch]);
    useEffect(() => {
        dispatch(callGETSoftList());
    }, [dispatch]);

    const handleInputChange = (event) => {
        const {name,value, files } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? Array.from(files) : value
        }));
    };
    const handleInputChangename = (event) => {
        const {value} = event.target;
        setFormData(prevState => ({
            ...prevState,
            postName:value
        }));
    };
    console.log("SoftListState",SoftListState);


    const onChangeHandler = (event) => {
        const boardCode = event.target.value;
        if (boardCode !== '선택하세요') {
            console.log(boardCode);
            dispatch(callGETLowBoardList(boardCode));
        }
    };

    const calculatePostCommSetValue = (allowNormal, allowAnonymous) => {
        if (allowNormal && allowAnonymous) return 3;
        if (allowNormal) return 1;
        if (allowAnonymous) return 2;
        return 4;
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setFormData(prevState => {
            const newPostCommSet = calculatePostCommSetValue(
                value === "ALLOW_NORMAL" ? checked : prevState.postCommSet === 0 || prevState.postCommSet === 2,
                value === "ALLOW_ANONYMOUS" ? checked : prevState.postCommSet === 1 || prevState.postCommSet === 2
            );
            console.log("comment:",newPostCommSet);
            return { ...prevState, postCommSet: newPostCommSet };
        });
    };
    const onChangeHandlerLow = (event) => {
        const { value } = event.target;
        console.log(value);
        setFormData(prevState => ({
            ...prevState,
            lowBoardCode: value  // lowBoardCode 업데이트
        }));
    };
    const onChangeHandlersoft = (event) => {
        const { value } = event.target;
        console.log(value);
        setFormData(prevState => ({
            ...prevState,
            psCode: value 
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const { postName, postCon, attachFile, postCommSet,lowBoardCode,psCode } = formData;
    
        const formDataToSend = new FormData();
        formDataToSend.append('postName', postName);
        formDataToSend.append('postCon', postCon);
        formDataToSend.append('attachFile', attachFile);
        formDataToSend.append('postCommSet', postCommSet);
        formDataToSend.append('lowBoardCode', lowBoardCode);
        formDataToSend.append("psCode",psCode);
        formDataToSend.append('empCode',employees.emp_code);
        
        if (attachFile) {
            for (let i = 0; i < attachFile.length; i++) {
                formDataToSend.append('attachFile', attachFile[i]);
            }
        }


        try {
            const response = await fetch('http://localhost:8080/post/add', {
                method: 'POST',
                body: formDataToSend,
                mode: "cors"
            });
            console.log("post",formData)
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="main">
            <form onSubmit={handleSubmit}>
                <table>
                    <thead className='tableHead'>
                        <tr>
                            <th colSpan="4">게시판</th>
                        </tr>
                        <tr>
                            <td>대분류</td>
                            <td>
                                <select onChange={onChangeHandler}>
                                    <option>선택하세요</option>
                                    {Array.isArray(BoardState) && BoardState.length > 0 ? (
                                        BoardState.map(item => (
                                            <option key={item.boardCode} value={item.boardCode}>
                                                {item.boardName}
                                            </option>
                                        ))
                                    ) : (
                                        <option>데이터 로딩 중...</option>
                                    )}
                                </select>
                            </td>
                            <td>소분류</td>
                            <td>
                                <select onChange={onChangeHandlerLow}>
                                    <option>선택하세요</option>
                                    {Array.isArray(LowBoardState) && LowBoardState.length > 0 ? (
                                        LowBoardState.map(item => (
                                            <option key={item.lowBoardCode} value={item.lowBoardCode}>
                                                {item.lowBoardName}
                                            </option>
                                        ))
                                    ) : (
                                        <option>대분류를 선택해주세요</option>
                                    )}
                                </select>
                            </td>
                            <td>분류</td>
                            <td>
                                <select onChange={onChangeHandlersoft}>
                                    <option>선택하세요</option>
                                    {Array.isArray(SoftListState) && SoftListState.length > 0 ? (
                                        SoftListState.map(item => (
                                            <option key={item.psCode} value={item.psCode}>
                                                {item.psName}
                                            </option>
                                        ))
                                    ) : (
                                        <option>데이터 로딩 중...</option>
                                    )}                                
                                    </select>
                            </td>
                        </tr>
                        <tr>
                            <td>작성자</td>
                            <td>{employees.emp_name}</td>
                            <td>작성일</td>
                            <td>{getCurrentDate()}</td>
                        </tr>
                        <tr>
                            {/* <td>알림</td>
                            <td colSpan="3">
                                <label><input type="checkbox" value="sendCall" />알림 발송</label>
                                <label><input type="checkbox" value="sendMsg" />쪽지 발송</label>
                            </td> */}
                        </tr>
                        <tr>
                            <td>첨부파일</td>
                            <td colSpan="3"><input name="attachFile" type="file" multiple  onChange={handleInputChange} /></td>
                        </tr>
                        <tr>
                            <td>제목</td>
                            <td colSpan="3"><input name="postName" type="text" placeholder="100자 이내 입력" onChange={handleInputChangename} /></td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            <td colSpan="3">
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={formData.postCon}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setFormData(prevState => ({
                                            ...prevState,
                                            postCon: data
                                        }));
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>설정</td>
                            <td colSpan="3">
                                <label><input type="checkbox" value="ALLOW_NORMAL" name="postCommSet" onChange={handleCheckboxChange} />댓글 허용</label>
                                <label><input type="checkbox" value="ALLOW_ANONYMOUS" name="postCommSet" onChange={handleCheckboxChange} />익명 댓글 허용</label>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="4">
                                <button type="button">취소</button>
                                <button type="button">임시저장</button>
                                <button type="submit">저장</button>
                            </td>
                        </tr>
                    </thead>
                </table>
            </form>
        </div>
    );
}

export default PostCreateView;
