import Input from "../components/Input";
import Lable from "../components/Lable";
import Button from "../components/Button";
import Radio from "../components/Radio";
import RadioGroup from "../components/RadioGroup";
import Date from "../components/Date";



function JoinPage() {
    return (
    <>  
        <div className="w-[78.75rem] mx-auto my-0">
            <div className="flex justify-between mt-4">
                <img src="img/mainlogo.svg" alt="메인로고" />
            </div>
        </div>

        <div className="mt-10 w-[35.625rem] rounded-[0.625rem] bg-[rgba(7, 7, 7, 0.42)] mx-auto">
            <h2 className="mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                회원 가입
            </h2>
            <form className="space-y-6" action="#" method="POST"> {/*TODO: action에 요청을 보낼 경로 지정 */}
            <div className="flex gap-3">
                <div className="flex gap-1">    
                    <Lable type="register-lable">이메일 </Lable>
                    <span className="text-[#F60000] mt-[0.350rem]">*</span>
                </div>
                <Input 
                    type="register-input" 
                    id="email"
                    name="email"
                    required
                    placeholder="이메일을 입력해주세요. (예: aa @ bb.cc)"
                    ></Input>
            </div>
            <div className="flex gap-3">
                <div className="flex gap-1">    
                    <Lable type="register-lable">이름 </Lable>
                    <span className="text-[#F60000] mt-[0.350rem]">*</span>
                </div>
                <Input 
                    type="register-input" 
                    id="userName"
                    name="userName"
                    required
                    placeholder="이름을 입력해주세요."
                    ></Input>
            </div>
            <div className="flex gap-3">
                <div className="flex gap-1">    
                    <Lable type="register-lable">비밀번호 </Lable>
                    <span className="text-[#F60000] mt-[0.350rem]">*</span>
                </div>
                <Input 
                    type="register-input" 
                    id="password"
                    name="password"
                    required
                    placeholder="비밀번호를 입력해주세요."
                    ></Input>
            </div>
            <div className="flex gap-3">
                <div className="flex gap-1">    
                    <Lable type="register-lable">비밀번호 확인 </Lable>
                    <span className="text-[#F60000] mt-[0.350rem]">*</span>
                </div>
                <Input 
                    type="register-input" 
                    id="passwordCheck"
                    name="passwordCheck"
                    required
                    placeholder="비밀번호를 한 번 더 입력해주세요."
                    ></Input>
            </div>
            <div className="flex gap-3">
                <div className="flex gap-1">    
                    <Lable type="register-lable">휴대폰 </Lable>
                    <span className="text-[#F60000] mt-[0.350rem]">*</span>
                </div>
                <Input 
                    type="register-input" 
                    id="phone"
                    name="phone"
                    required
                    placeholder="전화번호를 입력해주세요. (예: 010-0000-0000)"
                    ></Input>
            </div>
            <div className="flex gap-3">
                <div className="flex gap-1">    
                    <Lable type="register-lable">주소 </Lable>
                    <span className="text-[#F60000] mt-[0.350rem]">*</span>
                </div>
                <Button 
                    type="register-addressSearch" 
                    id="address"
                    name="address"
                    required
                    >주소 검색</Button>
            </div>
            <div className="flex gap-3 justify-between">
                <div className="flex gap-1">    
                    <Lable type="register-lable">성별 </Lable>
                </div>
                <RadioGroup>
                    <Radio name="gender" value="m" >남</Radio>
                    <Radio name="gender" value="f" >여</Radio>
                    <Radio name="gender" value="n">선택 안함</Radio>
                </RadioGroup>
            </div>
            <div className="flex gap-3">
                <div className="flex gap-1">    
                    <Lable type="register-lable">생년월일 </Lable>
                </div>
                <Date></Date>
            </div>
            <div className="flex gap-3 justify-center">
                <div className="flex gap-1"> 
                    <Radio name="policy" value="policy">개인정보 수집 이용 동의</Radio>
                </div>
            </div>
            <div className="flex gap-3 justify-center">
                <Input 
                    type="submit" 
                    className=" shadow-md rounded-[0.625rem] text-[0.875rem] w-[13.75rem] h-[2.875rem] bg-[#54AB75] text-[#ffffff] "
                    name="submit"
                    value="가입하기"
                    ></Input>
            </div>                
            </form>
        </div>    
    </>      
    
    );
  }
  
  export default JoinPage;