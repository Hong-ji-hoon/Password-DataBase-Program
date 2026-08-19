import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import logo from "../assets/rorze-logo.png";

function LoginPage() {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const loginHandler = (e) => {
        e.preventDefault();

        if (id === "") {
            setMessage("아이디를 입력하세요.");
            return;
        }

        if (pw === "") {
            setMessage("비밀번호를 입력하세요.");
            return;
        }

        if (id !== "H") {
            setMessage("아이디가 틀렸습니다.");
            return;
        }
        else if(pw!=="H")
        {
            setMessage("비밀번호가 틀렸습니다.")
            return;
        }
        navigate("/main");
    };

    return (
        <div className="login-page">
            <img className="login-logo" src={logo} alt="RORZE Logo" />

            <form className="login-form" onSubmit={loginHandler}>
                <h2 className="login-list">로그인</h2>

                <div className="login-input-box">
                    <h4>아이디*</h4>
                    <input
                        className="login-id-input"
                        type="text"
                        placeholder="아이디를 입력하세요"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>

                <div className="login-input-box">
                    <h4>비밀번호*</h4>
                    <input
                        className="login-pw-input"
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                    />
                </div>

                <p className="login-message">{message}</p>

                <button className="login-button" type="submit">
                    로그인
                </button>

                <p className="login-footer-message">
                    로그인 성공 시, 메인 화면으로 이동합니다.
                </p>
            </form>
        </div>
    );
}

export default LoginPage;