import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callRevMsgListAPI } from "../../../../apis/MessageAPICalls";

function RevSetting() {
    const dispatch = useDispatch();
    const revMessages = useSelector(state => state.messageReducer.revMessage.message);

    useEffect(() => {
        dispatch(callRevMsgListAPI());
    }, [dispatch])

    return (
        <tr>
            <th scope="row" rowspan="2">기본 보관함</th>
            <td>받은 쪽지</td>
            <td>/{revMessages && revMessages.length}</td>
            <td>
                <button type="button" className="el_btnS el_btnblueBack">모두 읽음</button>
                <button type="button" className="el_btnS el_btn8Back hp_ml5">비우기</button>
            </td>
        </tr>
    );
}

export default RevSetting;