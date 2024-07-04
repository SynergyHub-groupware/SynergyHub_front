import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callWorkMsgListAPI } from "../../../../apis/MessageAPICalls";

function WorkSetting() {
    const dispatch = useDispatch();
    const workMessages = useSelector(state => state.messageReducer.workMessage.message);

    useEffect(() => {
        dispatch(callWorkMsgListAPI());
    }, [dispatch]);

    return (
        <tr>
            <td>업무 보관함</td>
            <td>0/{workMessages && workMessages.length}</td>
            <td>
                <button type="button" className="el_btnS el_btn8Back hp_ml5">비우기</button>
            </td>
        </tr>
    );
}

export default WorkSetting;