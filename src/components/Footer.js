import React from 'react'

const Footer = () => {
  return (
    <div className=' bg-[#F3F3F3] mt-[4.15rem]'>
        <div className='flex w-[90rem] h-[10.5rem] mx-auto my-0 justify-between'>
            <ul className='flex justify-items-end'>
            <p>프로그램소개</p>
            <p>이용약관</p>
            <p className='text-[#000] font-bold'>개인정보처리방침</p>
            </ul>

            <ul className='flex text-[#7E7E7E] font-light'>
                <li>홈</li> | 
                <li>약속 게시판</li> | 
                <li>지도</li> | 
                <li>리뷰 게시판</li>
            </ul>
             
        </div>



    </div>
  )
}

export default Footer