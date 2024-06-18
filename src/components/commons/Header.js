import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { callLogoutAPI } from "../../pages/login/LoginAPICalls";
import { useEffect } from "react";

function Header(){

    const dispatch = useDispatch();

    /* 로그인 이후 로그아웃 기능, 클릭 시 로그인 페이지로 이동 */
    function AfterLogin() {
        const { success } = useSelector(state => state.loginReducer);

        // 마지막 머지에 ('/')로 바꿀 것
        useEffect(() => {
            if(success === true) {
                window.location.replace('/login');
            }
        }, [success]);

        return(
            <>
                <li><NavLink className="bl_header__icon bl_header__logout" onClick={() => dispatch(callLogoutAPI())}>
                        <span className="WA">로그아웃</span>
                    </NavLink>
                </li>
            </>
        )
    }

    return(
        <header className="bl_header el_shadowD">
            <div className="bl_header__wrap">
                <h1 className="bl_header__logo">
                    <NavLink to="/" className="bl_header__logoImg"><span className="WA">SYNERGY HUB</span></NavLink>
                </h1>
                <ul className="bl_header__menuL">
                    <li><NavLink to="/employee">인사</NavLink></li>
                    <li><NavLink to="/approval/formList">결재</NavLink></li>
                    <li><NavLink to="/post">게시판</NavLink></li>
                    <li><NavLink to="/attendance">근태</NavLink></li>
                    <li><NavLink to="/calendar">일정</NavLink></li>
                    <li><NavLink to="/message">쪽지</NavLink></li>
                </ul>
            </div>
            <ul className="bl_header__menuR">
                <AfterLogin/>
                <li><NavLink to="" className="bl_header__icon bl_header__structure"><span className="WA">조직도</span></NavLink></li>
                <li><NavLink to="" className="bl_header__icon bl_header__alarm"><span className="WA">알림</span></NavLink></li>
                <li><NavLink to="" className="bl_header__icon bl_header__myinfo"><span className="WA">내정보</span></NavLink></li>
            </ul>
        </header>
    )
}

export default Header;