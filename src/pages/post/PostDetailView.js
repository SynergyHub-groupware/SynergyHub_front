import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { callGETDetail, callGETFile, callGETComment } from './postApi/PostAPI';
import { callDepartmentEmployeesAPI } from '../../apis/EmployeeAPICalls';
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Link } from 'react-router-dom';

function PostDetailView() {
    const dispatch = useDispatch();
    const { postCode } = useParams(); // URL의 파라미터로부터 postCode 가져오기
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [editingComment, setEditingComment] = useState(null); // 수정할 댓글 정보를 저장할 상태

    const employees = useSelector(state => state.employeeReducer.employees?.employees || []);

    useEffect(() => {
        dispatch(callDepartmentEmployeesAPI());
    }, [dispatch]);

    useEffect(() => {
        dispatch(callGETDetail(postCode));
        dispatch(callGETFile(postCode));
        dispatch(callGETComment(postCode));
    }, [dispatch, postCode]);

    const DetailData = useSelector(state => state.post.DetailState);
    const FileData = useSelector(state => state.post.FileState);
    const CommentState = useSelector(state => state.post.CommentState);

    const generateHtmlContent = () => {
        let htmlContent = '';

        if (FileData && FileData.length > 0) {
            htmlContent = FileData.map((file, index) => {
                if (file.attachOriginal.toLowerCase().endsWith('.jpg') || file.attachOriginal.toLowerCase().endsWith('.png')) {
                    return `<img src="http://localhost:8080/post/downloadFile/${file.attachSave}" alt="${file.attachOriginal}" style="max-width: 100%; max-height: 500px;" />`;
                } else {
                    return null;
                }
            }).join('<br/>');
        }

        if (DetailData.postCon) {
            htmlContent += `<br/>${DetailData.postCon}`;
        }

        return htmlContent;
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
            const token = localStorage.getItem('access-token');
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

    const handleEditClick = (commentId) => {
        // 클릭한 댓글의 정보를 editingComment 상태에 저장
        const commentToEdit = CommentState.find(comment => comment.comm_code === commentId);
        if (commentToEdit) {
            setEditingComment(commentToEdit);
            setNewComment(commentToEdit.comm_con); // 댓글 입력칸에 수정할 댓글 내용을 반영
        }
    };

    const handleEditSave = async () => {
        if (!editingComment) return;

        const editedCommentData = {
            commCon: newComment,
            commStatus: isAnonymous ? 'Y' : 'N',
            postCode: DetailData.postCode,
            commDate: new Date().toISOString() // ISO 8601 형식으로 변환
        };

        try {
            const token = localStorage.getItem('access-token');
            const response = await axios.put(`http://localhost:8080/post/commentEdit/${editingComment.comm_code}`, editedCommentData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // 수정된 댓글을 CommentState에서 업데이트
            const updatedComments = CommentState.map(comment =>
                comment.comm_code === editingComment.comm_code ? response.data : comment
            );

            // 업데이트된 댓글 목록을 상태에 반영
            setComments(updatedComments);
            setEditingComment(null); // 수정 상태 초기화
            setNewComment(''); // 입력 칸 초기화
        } catch (error) {
            console.error('Failed to edit comment:', error);
        }
    };

    const handleDeleteClick = async (commCode) => {
        try {
            const token = localStorage.getItem('access-token');
            await axios.put(`http://localhost:8080/post/commentDelete/${commCode}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // 삭제된 댓글을 comments 상태에서 제거
            const updatedComments = CommentState.filter(comment => comment.comm_code !== commCode);
            setComments(updatedComments);
        } catch (error) {
            console.error('Failed to delete comment:', error);
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
                            <Link to={`/post/PostEditView/${DetailData.postCode}`}>수정</Link>
                        </tr>
                        <tr>
                            <td>게시글 번호</td>
                            <td>{DetailData.postCode}</td>
                        </tr>
                        <tr>
                            <td>작성자</td>
                            <td>{DetailData.empName}</td>
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
                            <td colSpan="3">
                                <div dangerouslySetInnerHTML={{ __html: generateHtmlContent() }} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="4">
                                <h1>댓글 구현위치</h1>
                                {DetailData.postCommSet === 'ALLOW_NORMAL' && (
                                    <>
                                        <form onSubmit={editingComment ? handleEditSave : handleCommentSubmit}>
                                            <textarea value={newComment} onChange={handleCommentChange} />
                                            <button type="submit">{editingComment ? '수정 저장' : '댓글 작성'}</button>
                                        </form>
                                        <h2>댓글</h2>
                                        <ul>
                                            {CommentState.map(comment => (
                                                <li key={comment.comm_code}>
                                                    {comment.comm_con}
                                                    {employees.length > 0 ? (
                                                        employees.map(employee => (
                                                            employee.emp_code === comment.emp_code && (
                                                                <div key={employee.emp_code}>
                                                                    <button onClick={() => handleEditClick(comment.comm_code)}>수정</button>
                                                                    <button onClick={() => handleDeleteClick(comment.comm_code)}>삭제</button>
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
                                        <form onSubmit={editingComment ? handleEditSave : handleCommentSubmit}>
                                            <textarea value={newComment} onChange={handleCommentChange} />
                                            <button type="submit">{editingComment ? '수정 저장' : '익명 댓글 작성'}</button>
                                        </form>
                                        <h2>익명 댓글</h2>
                                        <ul>
                                            {CommentState.map(comment => (
                                                <li key={comment.comm_code}>
                                                    {comment.comm_con}
                                                    {employees.length > 0 ? (
                                                        employees.map(employee => (
                                                            employee.emp_code === comment.emp_code && (
                                                                <div key={employee.emp_code}>
                                                                    <button onClick={() => handleEditClick(comment.comm_code)}>수정</button>
                                                                    <button onClick={() => handleDeleteClick(comment.comm_code)}>삭제</button>
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
                                        <form onSubmit={editingComment ? handleEditSave : handleCommentSubmit}>
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
                                            <button type="submit">{editingComment ? '수정 저장' : '댓글 작성'}</button>
                                        </form>
                                        <h2> 댓글</h2>
                                        <ul>
                                            {CommentState.map(comment => (
                                                <li key={comment.comm_code}>
                                                    {comment.comm_status === 'N' && (
                                                        <h2>{comment.emp_name}</h2>
                                                    )}
                                                    {comment.comm_con}
                                                    {employees.length > 0 ? (
                                                        employees.map(employee => (
                                                            employee.emp_code === comment.emp_code && (
                                                                <div key={employee.emp_code}>
                                                                    <button onClick={() => handleEditClick(comment.comm_code)}>수정</button>
                                                                    <button onClick={() => handleDeleteClick(comment.comm_code)}>삭제</button>
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

    return (
        <>
            {renderDetail()}
        </>
    );
}

export default PostDetailView;
