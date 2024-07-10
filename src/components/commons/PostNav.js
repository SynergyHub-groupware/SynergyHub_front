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
                const boardName = lowBoard.boardCode.boardName;
                if (!acc[boardName]) {
                    acc[boardName] = {
                        boardCode: lowBoard.boardCode,
                        lowBoards: []
                    };
                }
                acc[boardName].lowBoards.push(lowBoard);
                return acc;
            }, {});
            setBoards(groupedBoards);
        }
    }, [AllLowState]);

    return (
        <>
            <div className="bl_nav">
                <h1 className="bl_nav__ttl">게시판</h1>
                <td className='bl_nav__ttlSub'>
                    <Link to={`/post/PostReadyList/${employees.emp_code}`}>
                        임시 저장
                    </Link>
                </td>

                {Object.keys(boards).map(boardName => (
                    <React.Fragment key={boardName}>
                        <li className="parent-board">
                            <td className='bl_nav__ttlSub'>
                                {boardName}
                            </td>
                            <li>
                                <ul className="bl_nav__menuSub">
                                    {boards[boardName].lowBoards.map((lowBoard, index) => {

                                        return (lowBoard.lowBoardName !== 'Deleted' && (
                                            <tr key={lowBoard.lowBoardCode} className="button-wrapper">
                                                <li>
                                                    <Link to={`/post/PostListViewInBoard/${lowBoard.lowBoardCode}`}>
                                                        {lowBoard.lowBoardName}
                                                    </Link>
                                                </li>
                                            </tr>
                                        ));
                                    })}


                                </ul>



                            </li>

                        </li>
                    </React.Fragment>
                ))}

            </div>
        </>
    )
}
export default PostNav;