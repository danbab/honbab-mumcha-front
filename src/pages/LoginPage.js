import React from "react";

const LoginPage = () => {

  const containerStyle = {
    backgroundImage: `url('/img/backgroundLogin.svg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh', // 화면 전체 높이를 채우도록 설정
  }

  return (
    <>
  <div style={containerStyle}>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="img/mainlogo.svg"
            alt="메인 로고"
          />
          <h2 className="mt-2 text-center text-[2.25rem] font-bold leading-9 tracking-tight text-gray-900">
            Login
          </h2>
        </div>
    </div>
    </div>




    </>
  );
};

export default LoginPage;