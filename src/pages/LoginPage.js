import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useCookies } from "react-cookie";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  //토큰 사용을 위한 초기화
  const [cookies, setCookies] = useCookies();
  
  // 이메일
  const emailChange = (e) => {
    e.preventDefault();
    //이메일 형식만 가능
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value; // 입력된 이메일
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식이 맞지 않습니다.");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 이메일 형식이에요 : )");
      setIsEmail(true);
    }
  };

  // 비밀번호
  const onChangePassword = (e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/; //숫자+영문자+특수문자 조합으로 8자리 이상
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("");
      setIsPassword(true);
    }
  };

  const containerStyle = {
    backgroundImage: `url('/img/backgroundLogin.svg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh", // 화면 전체 높이를 채우도록 설정
  };

  //백엔드 통신
  const baseUrl = "http://localhost:8080";
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    await axios
      .post(baseUrl + "/api/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        //alert("로그인에 성공하였습니다.");
        //alert("나는 언제쯤..." + response.data);
        //console.log("사용자 정보:", response.data);
        sessionStorage.setItem("user", JSON.stringify(response.data));
        //alert(sessionStorage.getItem("user"));
        const responseData = response.data;
        console.log(responseData);
        const {expireTime, token, user } = responseData;
        const expires = new Date();
        expires.setMilliseconds(expires.getMilliseconds() + expireTime)
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        console.log(user);

        setCookies("token", token, { expires });
        window.location.href = "/"; // 로그인 성공시 메인페이지로 이동.
        
        const togoUrl = sessionStorage.getItem("togoUrl");
        if (togoUrl) {
          sessionStorage.removeItem("togoUrl");
          window.location.href = togoUrl;
        } else {
          window.location.href = "/";
        } // 로그인 성공시 메인페이지로 이동.
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          alert("이메일 또는 비밀번호가 일치하지 않습니다.");
        } else {
          console.log(error.response);
          alert("Client : 서버 오류");
        }
      });
  };

  return (
    <>
      <div className="py-20" style={containerStyle}>
        <div className="justify-center w-[37.625rem] h-[43.625rem] m-auto bg-neutral-500/60 py-20 rounded-[1rem]">
          <div>
            {/*메인로고 */}
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <Link to={"/"}>
                <img
                  className="mx-auto h-10 w-auto"
                  src="img/mainlogo.svg"
                  alt="메인 로고"
                />
              </Link>

              <h2 className="mt-2 text-center text-[2.25rem] font-bold leading-9 text-gray-900">
                Login
              </h2>
            </div>
            {/*로그인 폼 */}
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {" "}
                {/*TODO: action에 요청을 보낼 경로 지정 */}
                {/*이메일 */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      autoComplete="email"
                      onChange={emailChange}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focu s:ring-[#54AB75] sm:text-sm sm:leading-6"
                    />
                  </div>
                  {/* 이메일 유효성 검사 */}
                  {email.length > 0 && (
                    <span
                      className={`message ${isEmail ? "success" : "error"}`}
                      style={{
                        marginLeft: "7rem", // margin 값을 원하는 값으로 설정
                        color: isEmail ? "green" : "red", // 에러: 빨강색 / 성공: 초록색
                      }}
                    >
                      {emailMessage}
                    </span>
                  )}
                </div>
                {/*비밀번호 */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-[#54AB75] hover:text-[#49965F]"
                      >
                        비밀번호를 잊어버리셨나요?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      autoComplete="current-password"
                      onChange={onChangePassword}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#54AB75] sm:text-sm sm:leading-6"
                    />
                  </div>
                  {/*비밀번호 유효성 체크 : 숫자+영문자+특수문자 조합으로 8자리 이상 */}
                  {password.length > 0 && (
                    <span
                      className={`message ${isPassword ? "success" : "error"}`}
                      style={{
                        marginLeft: "0rem", // margin 값을 원하는 값으로 설정
                        color: isPassword ? "green" : "red", // 에러: 빨강색 / 성공: 초록색
                      }}
                    >
                      {passwordMessage}
                    </span>
                  )}
                </div>
                {/*로그인 버튼 */}
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-[#54AB75] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#49965F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    로그인
                  </button>
                </div>
              </form>
              {/*구글 로그인 버튼 */}
              <div className="my-10">
                <Link to="/oauth2/authorization/google">
                  <img
                    className="mx-auto h-10 w-auto"
                    src="img/googleLogin.svg"
                    alt="구글 로그인"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
