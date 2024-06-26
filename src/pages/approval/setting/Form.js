import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {callFormListAPI} from "../../../apis/ApprovalAPICalls";

function Form(){
    const dispatch = useDispatch();
    const {forms} = useSelector(state => state.approvalReducer);

    useEffect(() => {
        dispatch(callFormListAPI());
    }, []);

    const formCategories = [
        {category: "근태/휴가", data: forms.slice(1, 5)},
        {category: "인사", data: forms.slice(5, 9)},
        {category: "회계", data: forms.slice(9, 11)},
        {category: "기타", data: forms.slice(11)}
    ];

    console.log("forms", forms);

    return(
        <div className="ly_cont">
            <div className="ly_spaceBetween ly_fitemEnd hp_mb20">
                <h4 className="el_lv1Head">결재양식 관리</h4>
                <a className="el_btnS el_btnblueBack" href="/approval/setting/formView">결재양식 추가</a>
            </div>
            <p className="hp_alignR hp_mb10 hp_7Color">* 기본제공 양식은 수정/삭제할 수 없습니다.</p>
            <section className="bl_sect">
                <table className="bl_tb2">
                    <colgroup>
                        <col style={{width: '200px'}}/>
                        <col style={{width: '*'}}/>
                        <col style={{width: '200px'}}/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="row">분류</th>
                        <th scope="row">양식명</th>
                        <th scope="row">관리</th>
                    </tr>
                    </thead>
                    <tbody>
                    {formCategories.map((category, catIndex) => (
                        category.data.map((form, formIndex) => (
                            <tr key={formIndex}>
                                {formIndex === 0 && (
                                    <th scope="row" rowSpan={category.data.length}>{category.category}</th>
                                )}
                                <td>{form.afName}
                                    {form.afExplain ? (<b className="hp_7Color hp_ml5">({form.afExplain})</b>) : ''}
                                </td>
                                <td className="hp_alignC">
                                    <button type="button" className="el_btnS el_btnblueBord hp_ml5">수정</button>
                                    <button type="button" className="el_btnS el_btn8Bord hp_ml5">삭제</button>
                                </td>
                            </tr>
                        ))
                    ))}
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default Form;