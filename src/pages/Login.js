import { useNavigate } from "react-router-dom";
import LoginForm from "./login/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { reset } from "../modules/LoginModules";
import { Bounce, ToastContainer } from "react-toastify";

function Login() {

    const navigate = useNavigate();
    const { success } = useSelector(state => state.loginReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if(success === true) {
            navigate('/');
            dispatch(reset());
        }
    }, [success]);

    return(
        <>
            <ToastContainer position="top-center" autoClos={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" transition={Bounce}/>
            <div className="ly_all ly_fitemC ly_flexC">
                <div className="bl_sect bl_login hp_w600px">
                    <div className="bl_login__wrap hp_padding50">
                        <div className="bl_login__logo hp_f9Back hp_mb30 bl_header__logoImg">
                        </div>
                            <div className="ly_flex">
                                <LoginForm/>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;