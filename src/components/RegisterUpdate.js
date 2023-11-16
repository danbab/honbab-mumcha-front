import React, { useState, useEffect } from 'react'
import Input from "../components/Input";
import Lable from "../components/Lable";
import axios from "axios";


const RegisterUpdate = ({ user }) => {


    const [users, setUsers] = useState({
        userName: '',
        userEmail: '',
        userAddress: ''

    });

    const {userName, userEmail, userAddress} = users; // 비구조화할당

    // e.target에서 name과 value만 가져온다.
    // const onChangeInput = (e) => {
    //     const { value, name } = e.target;
    //     setUsers({
    //         ...users,
    //         [name]: value,
    //     });
    // };

    const [name, setUserName] = useState("");
    const [email, setUserEmail] = useState("");
    const [address, setUserAddress] = useState("");


    const getUser = async (user) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/users`, {
                params: {
                    email: user.email
                }
            });
            console.log("여기는 ??",response.data);
            setUsers(response.data);
            // console.log(myCategory);
        } catch (error) {
            console.error(error);
        }
    };

    // const loginUserName = user.username;

    const updateUser = async () => {

        try {
            const data = {
                name: name,
                email: email,
                address: address
            };
    
            console.log("POST 요청 데이터: ", data);
    
            const response = await axios.post(`http://localhost:8080/api/users/edit`, data);
            alert('수정되었습니다.');
            console.log("서버 응답: ", response.data);
            window.location.href = "/my";
        } catch (error) {
            console.error(error);
        }
       
    };

    const backToMyPage = () => {
        window.location.href = "/my";
      };
    
      useEffect(() => {
        getUser(user);
      }, [user]);

    return (
        <div>
            <h2 className='ml-[4.3rem] mt-[1.3rem] text-2xl'>정보수정</h2>
            <form onSubmit={updateUser}>
                {/* 이름 작성 */}
                <div className='flex mt-[2.3rem]'>
                    <div className="flex gap-1">
                        <Lable type="register-lable">이름</Lable>
                        <span className="text-[#F60000] mt-[0.350rem]">*</span>
                    </div>
                    <div className='ml-[1.2rem]'>
                        <Input
                            type="register-input"
                            id="userName"
                            name="userName"
                            value={name}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            placeholder={users.name}
                            // disabled={true}
                        ></Input>
                    </div>
                </div>

                {/* 이메일 작성 */}
                <div className='flex mt-[1.3rem]'>
                    <div className="flex gap-1">
                        <Lable type="register-lable">수정할 이메일</Lable>
                        <span className="text-[#F60000] mt-[0.350rem]">*</span>
                    </div>
                    <div className='ml-[1.2rem]'>
                        <Input
                            type="register-input"
                            id="userEmail"
                            name="userEmail"
                            value={email}
                            onChange={(e) => setUserEmail(e.target.value)}
                            required
                            placeholder={users.email}
                        ></Input>
                    </div>
                </div>

                {/* 주소 보여주기 */}
                <div className='flex mt-[1.3rem]'>
                    <div className="flex gap-1">
                        <Lable type="register-lable">수정할 주소</Lable>
                        <span className="text-[#F60000] mt-[0.350rem]">*</span>
                    </div>
                    <div className='ml-[1.2rem]'>
                        <Input
                            type="register-input"
                            id="userAddress"
                            name="userAddress"
                            value={address}
                            onChange={(e) => setUserAddress(e.target.value)}
                            required
                            placeholder={users.address}
                        ></Input>
                    </div>
                </div>

                {/* 생년월일과 성별보여주기 */}
                <div className='mt-[1.3rem]'>
                <div className='ml-[1.2rem]'>
                    <Lable type="register-lable">생년월일 : {users.birth}</Lable>
                    </div>
                    <div className='ml-[1.2rem] mt-[1.3rem]'>
                    <Lable type="register-lable">MBTI : {users.mbti}</Lable>
                    </div>
                </div>

                {/* 회원정보 수정하기 */}
                <div className="flex gap-3 justify-center mt-[1.3rem] mr-[1.5rem]">
                    <button
                        type="submit"
                        className=" shadow-md rounded-[0.625rem] text-[0.875rem] w-[13.75rem] h-[2.875rem] bg-[#54AB75] text-[#ffffff] cursor-pointer hover:bg-transparent hover:text-[#54AB75] border border-green-500"
                    >
                        수정하기
                    </button>
                    <button
                        onClick={backToMyPage}
                        className=" shadow-md rounded-[0.625rem] text-[0.875rem] w-[13.75rem] h-[2.875rem] bg-[#54AB75] text-[#ffffff] cursor-pointer hover:bg-transparent hover:text-[#54AB75] border border-green-500"
                    >
                        취소하기
                    </button>
                </div>


            </form>
        </div>
    )
}

export default RegisterUpdate