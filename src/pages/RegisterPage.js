import Input from "../components/Input";
import Lable from "../components/Lable";
import Button from "../components/Button";
import PopupDom from '../components/PopupDom';
//import PopupPostCode from '../components/PopupPostCode';
import DaumPostcode from "react-daum-postcode";
import axios from "axios";
import React, {useEffect, useState} from "react";
//import Address from "../components/Address";



function JoinPage() {

// 성별, 폰번호, 주소, 생년월일, MBTI 초기화
const [gender, setGender] = useState('');
const [phone, setPhone] = useState('');    
const [address, setAddress] = useState('');
const [birth, setBirth] = useState('');
const [mbti, setMbti] = useState('');
// 팝업창 상태 관리
const [isPopupOpen, setIsPopupOpen] = useState(false)

// 팝업창 열기
const openPostCode = () => {
    setIsPopupOpen(true)
}
 
// 팝업창 닫기
const closePostCode = () => {
    setIsPopupOpen(false)
}

// 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = ''; 
    
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    console.log(data)
    // fullAddress 값을 주소 상태에 저장
    setAddress(fullAddress);
    //팝업창을 닫음.
    closePostCode();
}

    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: "10%",
        width: "600px",
        height: "600px",
        padding: "7px",
      };

//이름, 이메일, 비밀번호, 비밀번호 확인
const [userName, setUserName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [passwordConfirm, setPasswordConfirm] = useState('')

//오류메시지 상태저장
const [passwordMessage, setPasswordMessage] = useState('')
const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')



//값 세팅 메서드
//이름
const userNameChange = (e) => {
    e.preventDefault();
    setUserName(e.target.value); 
}
//이메일 (추후 수정)
const emailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value); 
}
//폰번호
const phoneChange = (e) => {
    e.preventDefault();
    setPhone(e.target.value); 
}
//주소
const addressChange = (e) => {
    e.preventDefault();
    setAddress(e.target.value); 
}
//성별
const genderChange = (e) => {
    //e.preventDefault();
    setGender(e.target.value); 
}
//생년월일
const birthChange = (e) => {
    e.preventDefault();
    setBirth(e.target.value); 
}
//MBTI
const mbtiChange = (e) => {
    e.preventDefault();
    setMbti(e.target.value); 
}

// 유효성 검사
const [isPassword, setIsPassword] = useState(false)
const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)
//폼 제출 전 유효한지 체크
const [isFormValid, setIsFormValid] = useState(false);

// 비밀번호
const onChangePassword = (e) => {

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/; //숫자+영문자+특수문자 조합으로 8자리 이상
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);
    
    if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
        setIsPassword(false);
    } else {
        setPasswordMessage('안전한 비밀번호에요 : )');
        setIsPassword(true);
    }
};

// 비밀번호 확인
const onChangePasswordConfirm = (e) => {

    const passwordConfirmCurrent = e.target.value
    setPasswordConfirm(passwordConfirmCurrent)
    
    if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 : )')
        setIsPasswordConfirm(true)
    } else {
        setPasswordConfirmMessage('비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ')
        setIsPasswordConfirm(false)
    }
}

//비밀번호 유효성 검사
useEffect(() => {
    setIsFormValid(isPassword && isPasswordConfirm);
  }, [isPassword, isPasswordConfirm]);

//백엔드 통신
const baseUrl = "http://localhost:8080";
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(birth)
    console.log(gender)
    console.log(userName)

    //폼에 입력된 값이 유효한지 체크한 후, false면 전송 X
    if (!isFormValid) {
        alert('회원가입 입력이 잘못되었습니다.');
        return;
      }

    await axios
        .post(baseUrl + "/api/users/new", {
            email: email,
            userName: userName,
            phone: phone,
            password: password,
            address: address,
            gender: gender,
            birth: birth,
            mbti: mbti
        })
        .then((response) => {
            console.log(response.data)
            console.log(birth)
            alert(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

return (
    <>  
    {/*헤더 부분 */}
        <div className="w-[78.75rem] mx-auto my-0">
            <div className="flex justify-between mt-4">
                <img src="img/mainlogo.svg" alt="메인로고" />
            </div>
        </div>

        {/*회원가입 폼 부분 */}
        <div className="mt-10 w-[35.625rem] rounded-[0.625rem] mx-auto">
            <h2 className="mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                회원 가입
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}> {/* submit 버튼으로 보냄. */}
            {/*input: 이메일 */}
            <div className="flex gap-3">
                <div className="flex gap-1">    
                    <Lable type="register-lable">이메일 </Lable>
                    <span className="text-[#F60000] mt-[0.350rem]">*</span>
                </div>
                <div className="flex">
                <Input 
                    type="register-input" 
                    id="email"
                    name="email"
                    value={email}
                    onChange={emailChange}
                    required
                    placeholder="이메일을 입력해주세요. (예: aa @ bb.cc)"
                    ></Input>
                <Button type="register-emailDoubleCheck">중복 확인</Button>
                </div>
            </div>
            {/*input: 이름 */}
            <div className="flex gap-3">
                <div className="flex gap-1">    
                    <Lable type="register-lable">이름 </Lable>
                    <span className="text-[#F60000] mt-[0.350rem]">*</span>
                </div>
                <Input 
                    type="register-input" 
                    id="userName"
                    name="userName"
                    value={userName}
                    onChange={userNameChange}
                    required
                    placeholder="이름을 입력해주세요."
                    ></Input>
            </div>
            {/*input: 비밀번호 */}
            <div className="flex gap-3">
                <div className="flex gap-1">    
                    <Lable type="register-lable">비밀번호 </Lable>
                    <span className="text-[#F60000] mt-[0.350rem]">*</span>
                </div>
                <Input 
                    type="password" 
                    id="password"
                    name="password"
                    value={password}
                    required
                    placeholder="비밀번호를 입력해주세요."
                    onChange={onChangePassword}
                    className="border-2 rounded-[0.3125rem] border-gray-300 w-[25.3125rem] h-[1.9375rem] rounded-[0.3125rem] border border-[#010101] bg-[#FFFBFB] placeholder:text-xs pl-[0.3rem] focus:border-[#54AB75]"
                    ></Input>

            </div>
            {/*비밀번호 유효성 체크 : 숫자+영문자+특수문자 조합으로 8자리 이상 */}
                {password.length > 0 && (
                <span className={`message ${isPassword ? 'success' : 'error'}`}
                    style={{ 
                        marginLeft: '7rem', // margin 값을 원하는 값으로 설정
                        color: isPassword ? 'green' : 'red' // 에러: 빨강색 / 성공: 초록색
                    }} 
                >{passwordMessage}</span>
                )}

            {/*input: 비밀번호 확인 */}
            <div className="flex gap-3">
                <div className="flex gap-1">    
                    <Lable type="register-lable">비밀번호 확인 </Lable>
                    <span className="text-[#F60000] mt-[0.350rem]">*</span>
                </div>
                <Input 
                    type="password" 
                    id="passwordCheck"
                    name="passwordCheck"
                    required
                    placeholder="비밀번호를 한 번 더 입력해주세요."
                    onChange={onChangePasswordConfirm}
                    className="border-2 rounded-[0.3125rem] border-gray-300 w-[25.3125rem] h-[1.9375rem] rounded-[0.3125rem] border border-[#010101] bg-[#FFFBFB] placeholder:text-xs pl-[0.3rem] focus:border-[#54AB75]"
                    ></Input>

            </div>
            {/*비밀번호 유효성 체크 : 비밀번호가 일치하는지 체크*/}
                {passwordConfirm.length > 0 && (
                <span className={`message ${isPasswordConfirm ? 'success' : 'error'}`}
                    style={{ 
                        marginLeft: '7rem', // margin 값을 원하는 값으로 설정
                        color: isPasswordConfirm ? 'green' : 'red' // 에러: 빨강색 / 성공: 초록색
                }} 
                >{passwordConfirmMessage}</span>
                )}
            {/*input: 휴대폰 */}
            <div className="flex gap-3">
                <div className="flex gap-1">    
                    <Lable type="register-lable">휴대폰 </Lable>
                    <span className="text-[#F60000] mt-[0.350rem]">*</span>
                </div>
                <div className="flex">
                <Input 
                    type="register-input" 
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={phoneChange}
                    required
                    placeholder="전화번호를 입력해주세요. (예: 010-0000-0000)"
                    ></Input>
                <Button type="register-certification">본인 인증</Button>
                </div>
            </div>
            {/*button: 주소 => 클릭 시, 주소찾기 api 연동 */}
            <div className="flex gap-3">
                <div className="flex gap-1">    
                    <Lable type="register-lable">주소 </Lable>
                    <span className="text-[#F60000] mt-[0.350rem]">*</span>
                </div>
                <div className="flex">
                <Input 
                    type="register-input" 
                    id="address"
                    name="address"
                    value={address}
                    onChange={addressChange}
                    required
                    placeholder="주소를 입력해주세요."
                    ></Input>
                <Button type="register-addressSearch" onClick={openPostCode}>주소 검색</Button>
            {/*팝업 생성 기준 div*/}
                <div id='popupDom'>
                    {isPopupOpen && (
                    <PopupDom>
                        <div>
                            <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
                            {/* 닫기 버튼 생성*/}
                            <button type='button' onClick={closePostCode} className='postCode_btn'>닫기</button>
                        </div>
                    </PopupDom>
                    )}
                </div>
                </div>
            </div>
            {/*radio: 성별 */}
            <div className="flex gap-3 justify-start">
                <div className="flex gap-1">    
                    <Lable type="register-lable">성별 </Lable>
                    <span className="text-[#F60000] mt-[0.350rem]">*</span>
                </div>
                    <label className="mt-1 ml-3">남</label>
                    <input type="radio" name="gender" value="m" checked={gender==="m"} onChange={genderChange} className="mt-1"/>
                    
                    <label className="mt-1">여</label>
                    <input type="radio" name="gender" value="f" checked={gender==="f"} onChange={genderChange} className="mt-1"/>
            </div>
            {/*input: 생년월일 => dateformat : yyyy-mm-dd */}
            <div className="flex gap-3">
                <div className="flex gap-1">    
                    <Lable type="register-lable">생년월일 </Lable>
                    <span className="text-[#F60000] mt-[0.350rem]">*</span>
                </div>
                <input type="date" name="birth" value={birth} onChange={birthChange} className="mt-1 ml-3"/>
            </div>
            {/*select: MBTI  */}
            <div className="flex gap-3">
                <div className="flex gap-1">    
                    <Lable type="register-lable">MBTI 유형:</Lable>
                </div>
                <select
                    id="mbti"
                    name="mbti"
                    value={mbti}
                    onChange={mbtiChange}
                    className="mt-1 ml-3"
                    >
                    <option value="" selected>-- MBTI를 선택하세요 --</option>
                    <option value="none">선택안함</option>
                    <option value="ENFJ">ENFJ</option>
                    <option value="ENFP">ENFP</option>
                    <option value="ENTJ">ENTJ</option>
                    <option value="ENTP">ENTP</option>
                    <option value="ESFJ">ESFJ</option>
                    <option value="ESFP">ESFP</option>
                    <option value="ESTJ">ESTJ</option>
                    <option value="ESTP">ESTP</option>
                    <option value="INFJ">INFJ</option>
                    <option value="INFP">INFP</option>
                    <option value="INTJ">INTJ</option>
                    <option value="INTP">INTP</option>
                    <option value="ISFJ">ISFJ</option>
                    <option value="ISFP">ISFP</option>
                    <option value="ISTJ">ISTJ</option>
                    <option value="ISTP">ISTP</option>

                    </select>
            </div>
            {/*radio: 개인정보 동의 => 어떻게 처리할까? */}
            <div className="flex gap-3 justify-center">
                <div className="flex gap-1"> 
                <label>
                    <input type="radio" name="policy" value="policy"/>개인 정보 수집 동의
                </label>
                </div>
            </div>
            {/*submit: 클릭 시, form에 입력된 정보들을 벡엔드로 보냄. */}
            <div className="flex gap-3 justify-center">
                <button 
                    type="submit" 
                    className=" shadow-md rounded-[0.625rem] text-[0.875rem] w-[13.75rem] h-[2.875rem] bg-[#54AB75] text-[#ffffff] cursor-pointer hover:bg-transparent hover:text-[#54AB75] border border-green-500"
                    >가입하기</button>
            </div>                
            </form>
        </div>    
    </>      
    
    );
}
  export default JoinPage;