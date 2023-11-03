import React from 'react'

const Footer = () => {
    return (
        <div className='bg-[#F3F3F3] mt-[3.15rem]'>
            <div className='flex w-[90rem] h-[10.5rem] mx-auto my-0 justify-between'>
                <div className=' ' >
                    <ul className='flex mt-[1.4rem]'>
                        <p className='mr-[0.75rem]'>프로그램소개</p>
                        <p className='mx-[0.75rem]'>이용약관</p>
                        <p className='mx-[0.75rem] text-[#000] font-bold'>개인정보처리방침</p>
                    </ul>

                    <ul className='flex mt-[1.4rem]  text-[#B0ACAC] text-[0.9rem] font-light'>
                        <li className='mr-[0.75rem]'>백엔드 구축을 위한 클라우드 기술활용 개발자 과정(JAVA 기반)</li>
                        <li className='mx-[0.75rem]'>주최 : 청년취업사관학교 (sesac) x KFO 한국 직업 개발원</li>
                    </ul>

                    <ul className='flex text-[#B0ACAC] text-[0.9rem] font-light'>
                        <li className='mr-[0.75rem]'>팀명 : 영보이클럽</li>
                        <li className='mx-[0.93rem]'>팀원 : 이로운, 김완, 민동찬, 류수환, 김태호</li>
                        <li className='mr-[0.85rem]'>프로젝트명 : 혼밥멈춰</li>
                    </ul>

                    <ul className='flex text-[#B0ACAC] mt-[0.6rem] text-[0.8rem] font-light'>
                       <li className='mr-[0.85rem]'>Copyright ⓒ 영보이클럽(이로운, 김완, 민동찬, 류수환, 김태호)</li>
                    </ul>
                    </div>
                


                    <ul className='flex mt-[1.7rem] text-[#7E7E7E] font-light'>
                        <li className='mx-[0.4rem]'>홈</li> |
                        <li className='mx-[0.4rem]'>약속 게시판</li> |
                        <li className='mx-[0.4rem]'>지도</li> |
                        <li className='mx-[0.4rem]'>리뷰 게시판</li>
                    </ul>
                
                


            </div>
        </div>
    )
}

export default Footer