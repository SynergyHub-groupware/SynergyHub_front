import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callImpMsgListAPI } from "../../../../apis/MessageAPICalls";

function ImpSetting() {
    const dispatch = useDispatch();
    const impMessages = useSelector(state => state.messageReducer.impMessage.message);

    useEffect(() => {
        dispatch(callImpMsgListAPI());
    }, [dispatch]);

    return (
        <tr>
            <th scope="row" rowSpan={3}>개인 보관함<br />
            </th>
            <td>중요 보관함</td>
            <td>0/{impMessages && impMessages.length}</td>
            <td>
                <button type="button" className="el_btnS el_btn8Back hp_ml5">비우기</button>
            </td>
        </tr>
    );
}

export default ImpSetting;