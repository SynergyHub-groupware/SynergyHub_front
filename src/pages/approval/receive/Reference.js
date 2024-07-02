import {useNavigate} from "react-router";

function Reference({data}){
    const navigate = useNavigate();
    console.log("data", data);

    return (
        <section className="bl_sect hp_mt10">
            <table className="bl_tb1">
                <colgroup>
                    <col style={{width: '50px'}}/>
                    <col style={{width: '120px'}}/>
                    <col style={{width: '*'}}/>
                    <col style={{width: '120px'}}/>
                    <col style={{width: '120px'}}/>
                </colgroup>
                <thead>
                <tr>
                    <th scope="col"><input type="checkbox" className="" id="" name="" value="checkAll"/></th>
                    <th scope="col">결재양식</th>
                    <th scope="col">제목</th>
                    <th scope="col">작성자</th>
                    <th scope="col">완료일</th>
                </tr>
                </thead>
                <tbody>
                {/*<tr>*/}
                {/*    <th scope="row"><input type="checkbox" className="" id="" name="" value="checkOne"/></th>*/}
                {/*    <td>휴가신청서</td>*/}
                {/*    <td className="hp_alignL">휴가신청서_홍길동</td>*/}
                {/*    <td>김철수</td>*/}
                {/*    <td>2024.12.34</td>*/}
                {/*</tr>*/}
                {data && data.length > 0 ? (
                    data.map((document, index) =>
                        <tr key={index} onClick={() => navigate(`/approval/view/${document.adCode}`, {state: {document}})} key={document.adCode} className="hp_tr__click">
                            <th scope="row"><input type="checkbox" /></th>
                            <td>{document.afName}</td>
                            <td className="hp_alignL">{document.adTitle}</td>
                            <td>{document.empName}</td>
                            <td>{document.talDate}</td>
                        </tr>
                    )
                ) : (
                    <tr>
                        <td colSpan="5" className="hp_pt50 hp_pb50 hp_7Color">목록이 없습니다.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </section>
    )
}

export default Reference;