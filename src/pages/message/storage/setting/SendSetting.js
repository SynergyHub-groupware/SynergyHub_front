import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callSendMsgListAPI } from "../../../../apis/MessageAPICalls";

function SendSetting() {
    const dispatch = useDispatch();
    const sendMessages = useSelector(state => state.messageReducer.sendMessage.message);

    useEffect(() => {
        dispatch(callSendMsgListAPI());
    }, [dispatch]);

    return (
        <tr>
            <td>보낸 쪽지</td>
            <td>/{sendMessages && sendMessages.length}</td>
            <td>
                <button type="button" className="el_btnS el_btn8Back hp_ml5">비우기</button>
            </td>
        </tr>
    );
}

export default SendSetting;