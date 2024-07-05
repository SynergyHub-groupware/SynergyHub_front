import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { callGETDetail, callGETFile, callGETComment } from './postApi/PostAPI';
import { callDepartmentEmployeesAPI } from '../../apis/EmployeeAPICalls';
import axios from 'axios';

function PostDetailView() {
    const dispatch = useDispatch();
    const { postCode } = useParams(); // URL의 파라미터로부터 postCode 가져오기
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [isAnonymous, setIsAnonymous] = useState(false);

    const employees = useSelector(state => state.employeeReducer.employees?.employees || []);

    console.log('employees in component: ', employees);

    useEffect(() => {
        dispatch(callDepartmentEmployeesAPI());
    }, [dispatch]);

    useEffect(() => {
        dispatch(callGETDetail(postCode));
        dispatch(callGETFile(postCode));
        dispatch(callGETComment(postCode));
    }, [dispatch, postCode]);

    const DetailData = useSelector(state => state.post.DetailState);
    console.log(DetailData);
    const FileData = useSelector(state => state.post.FileState);
    console.log(FileData);
    const CommentState = useSelector(state => state.post.CommentState);

    const downloadAttachment = (attachmentUrl, filename) => {
        const link = document.createElement('a');
        link.href = attachmentUrl;
        link.setAttribute('download', filename); // 파일 이름 설정
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        const commentData = {
            commCon: newComment,
            commStatus: isAnonymous ? 'Y' : 'N',
            postCode: DetailData.postCode,
            commDate: new Date().toISOString() // ISO 8601 형식으로 변환
        };

        try {
            const token = localStorage.getItem('token');
            console.log(commentData);
            const response = await axios.post('http://localhost:8080/post/commentAdd', commentData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setComments([...comments, response.data]); // 새 댓글을 comments 상태에 추가
            setNewComment('');
        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    };

    const renderDetail = () => {
        if (!DetailData) return null; // DetailData가 없으면 아무것도 렌더링하지 않음

        return (
            <div className="main">
                <table>
                    <thead>
                        <tr>
                            <th colSpan="4">게시판</th>
                            <button>수정</button>
                        </tr>
                        <tr>
                            <td>게시글 번호</td>
                            <td>{DetailData.postCode}</td>
                        </tr>
                        <tr>
                            <td>작성자</td>
                            <td>{DetailData.empCode}</td>
                            <td>작성일</td>
                            <td>{DetailData.postDate}</td>
                        </tr>
                        <tr>
                            <td>첨부파일</td>
                            <td colSpan="3">
                                {FileData && FileData.length > 0 ? (
                                    FileData.map((file, index) => (
                                        <a
                                            key={index}
                                            href={`http://localhost:8080/post/downloadFile/${file.attachSave}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {file.attachOriginal}
                                        </a>
                                    ))
                                ) : (
                                    <span>첨부 파일이 없습니다.</span>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>제목</td>
                            <td colSpan="3">{DetailData.postName}</td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            {FileData && FileData.length > 0 ? (
                                FileData.map((file, index) => (
                                    (file.attachOriginal.toLowerCase().endsWith('.jpg') || file.attachOriginal.toLowerCase().endsWith('.png')) ? (
                                        <img
                                            key={index}
                                            src={`http://localhost:8080/post/downloadFile/${file.attachSave}`}
                                            alt={file.attachOriginal}
                                            style={{ maxWidth: '100%', maxHeight: '500px' }}
                                        />
                                    ) : (
                                        <span key={index}>{file.attachOriginal}</span>
                                    )
                                ))
                            ) : (
                                <span>첨부 파일이 없습니다.</span>
                            )}
                            <br />
                            <td colSpan="3" style={{ whiteSpace: "pre-wrap" }}>{DetailData.postCon}</td>
                        </tr>
                        <tr>
                            <td colSpan="4">
                                <h1>댓글 구현위치</h1>
                                {DetailData.postCommSet === 'ALLOW_NORMAL' && (
                                    <>
                                        <form onSubmit={handleCommentSubmit}>
                                            <textarea value={newComment} onChange={handleCommentChange} />
                                            <button type="submit">댓글 작성</button>
                                        </form>
                                        <h2>댓글</h2>
                                        <ul>
                                        {CommentState.map(comment => (
                                                <li key={comment.commCode}>
                                                    {comment.commCon}
                                                    {employees.length > 0 ? (
                                                        employees.map(employee => (
                                                            employee.emp_code === comment.emp_code && (
                                                                <div key={employee.emp_code}>
                                                                    <button onClick={() => handleEditClick(comment.commCode)}>수정</button>
                                                                    <button onClick={() => handleDeleteClick(comment.commCode)}>삭제</button>
                                                                </div>
                                                            )
                                                        ))
                                                    ) : null}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {DetailData.postCommSet === 'ALLOW_ANONYMOUS' && (
                                    <>
                                        <form onSubmit={handleCommentSubmit}>
                                            <textarea value={newComment} onChange={handleCommentChange} />
                                            <button type="submit">익명 댓글 작성</button>
                                        </form>
                                        <h2>익명 댓글</h2>
                                        <ul>
                                        {CommentState.map(comment => (
                                                <li key={comment.commCode}>
                                                    {comment.commCon}
                                                    {employees.length > 0 ? (
                                                        employees.map(employee => (
                                                            employee.emp_code === comment.emp_code && (
                                                                <div key={employee.emp_code}>
                                                                    <button onClick={() => handleEditClick(comment.commCode)}>수정</button>
                                                                    <button onClick={() => handleDeleteClick(comment.commCode)}>삭제</button>
                                                                </div>
                                                            )
                                                        ))
                                                    ) : null}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {DetailData.postCommSet === 'ALLOW_BOTH' && (
                                    <>
                                        <form onSubmit={handleCommentSubmit}>
                                            <textarea value={newComment} onChange={handleCommentChange} />
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={isAnonymous}
                                                    onChange={() => setIsAnonymous(!isAnonymous)}
                                                />{' '}
                                                익명으로 작성
                                            </label>
                                            <br />
                                            <button type="submit">댓글 작성</button>
                                        </form>
                                        <h2> 댓글</h2>
                                        <ul>
                                        {CommentState.map(comment => (
                                                <li key={comment.commCode}>
                                                    {comment.commCon}
                                                    {employees.length > 0 ? (
                                                        employees.map(employee => (
                                                            employee.emp_code === comment.emp_code && (
                                                                <div key={employee.emp_code}>
                                                                    <button onClick={() => handleEditClick(comment.commCode)}>수정</button>
                                                                    <button onClick={() => handleDeleteClick(comment.commCode)}>삭제</button>
                                                                </div>
                                                            )
                                                        ))
                                                    ) : null}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {DetailData.postCommSet === 'ALLOW_NONE' && <p>댓글이 비허용되었습니다.</p>}
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>
        );
    };

    const handleEditClick = (commCode) => {
        // Edit comment logic here
    };

    const handleDeleteClick = (commCode) => {
        // Delete comment logic here
    };

    return (
        <>
            {renderDetail()}
        </>
    );
}

export default PostDetailView;
