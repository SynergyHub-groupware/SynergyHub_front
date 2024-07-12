import { getAllLowBoard } from '../../pages/post/postApi/PostAPI';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { callMyInfoAPI } from '../../apis/EmployeeAPICalls';

function PostNav() {
    const dispatch = useDispatch();
    const AllLowState = useSelector(state => state.post.AllLowState);
    const [boards, setBoards] = useState({});
    useEffect(() => {
        dispatch(getAllLowBoard());
    }, [dispatch]);
    useEffect(() => {
        dispatch(callMyInfoAPI());
    }, []);
    const employees = useSelector(state => state.employeeReducer.employee);

    useEffect(() => {
        if (AllLowState.length > 0) {
            const groupedBoards = AllLowState.reduce((acc, lowBoard) => {
                console.log(lowBoard.boardCode.boardName)
                const boardName = lowBoard.boardCode.boardName;
                if (!acc[boardName]) {
                    acc[boardName] = {
                        boardCode: lowBoard.boardCode,
                        lowBoards: []
                    };
                }
                if (lowBoard.boardCode !== 0) { // Filter out low boards with boardCode 0
                    acc[boardName].lowBoards.push(lowBoard);
                }
                return acc;
            }, {});
            setBoards(groupedBoards);
        }
    }, [AllLowState]);

    return (
        <>
            <div className="bl_nav">
                <h1 className="bl_nav__ttl">게시판</h1>
                <li>
                    <li className='bl_nav__ttlSub'>
                        <Link to={`/post/PostCreateView`}>
                            게시글 작성
                        </Link>
                    </li>

                    <li className='bl_nav__ttlSub'>
                        <Link to={`/post/PostListView`}>
                            전체 게시판
                        </Link>
                    </li>

                    <li className='bl_nav__ttlSub'>
                        <Link to={`/post/PostReadyList/${employees.emp_code}`}>
                            임시 저장
                        </Link>
                    </li>

                </li>



                {Object.keys(boards).map(boardName => {
                    // Filter out boards with all lowBoards having boardCode 0
                    if (boards[boardName].lowBoards.every(lowBoard => lowBoard.boardCode === 0)) {
                        return null;
                    }

                    return (
                        <React.Fragment key={boardName}>
                            <li className="parent-board">
                                <td className='bl_nav__ttlSub'>
                                    {boardName}
                                </td>
                                <li>
                                    <ul className="bl_nav__menuSub">
                                        {boards[boardName].lowBoards.map((lowBoard, index) => (
                                            lowBoard.boardCode !== 0 && ( // Exclude low boards with boardCode 0
                                                <tr key={lowBoard.lowBoardCode} className="button-wrapper">
                                                    <li>
                                                        {lowBoard.lowBoardName !== 'Deleted' && (
                                                            <Link to={`/post/PostListViewInBoard/${lowBoard.lowBoardCode}`}>
                                                                {lowBoard.lowBoardName}
                                                            </Link>
                                                        )}
                                                    </li>
                                                </tr>
                                            )
                                        ))}
                                    </ul>
                                </li>
                            </li>
                        </React.Fragment>
                    );
                })}

                <td className='bl_nav__ttlSub'>
                    <Link to={`/post/BoradCreateView`}>
                        게시판 관리
                    </Link>
                </td>
            </div>
        </>
    )
}

export default PostNav;
