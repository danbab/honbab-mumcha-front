import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {

  const containerStyle = {
    backgroundImage: `url('/img/backgroundLogin.svg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh', // 화면 전체 높이를 채우도록 설정
  }

  return (
    <>
  <div className="py-20" style={containerStyle}>
    <div className="justify-center w-[37.625rem] h-[43.625rem] m-auto bg-neutral-500/60 py-20 rounded-[1rem]">
        <div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="img/mainlogo.svg"
            alt="메인 로고"
          />
          <h2 className="mt-2 text-center text-[2.25rem] font-bold leading-9 text-gray-900">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="/api/users/login" method="POST"> {/*TODO: action에 요청을 보낼 경로 지정 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focu s:ring-[#54AB75] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-[#54AB75] hover:text-[#49965F]">
                    비밀번호를 잊어버리셨나요?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#54AB75] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#54AB75] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#49965F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                로그인 
              </button>
            </div>
          </form>
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