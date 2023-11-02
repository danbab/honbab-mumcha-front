import React from 'react'

const MenuSquare = () => {

    const menus = [
        {
            image:'img/westernfood.svg',
            alt: '양식 음식 이미지',
        },
        {
            image:'img/dessert.svg',
            alt: '디저트 이미지',
        },
        {
            image:'img/koreanfood.svg',
            alt: '한식 음식 이미지',
        },
        {
            image:'img/japanfood.svg',
            alt: '일식 음식 이미지',
        },
        {
            image:'img/pizza.svg',
            alt: '피자 음식 이미지',
        },
        {
            image:'img/hamburger.svg',
            alt: '햄버거 음식 이미지',
        },
        {
            image:'img/snackbar.svg',
            alt: '분식 음식 이미지',
        },
        {
            image:'img/asiafood.svg',
            alt: '아시아 음식 이미지',
        },
        {
            image:'img/midnightsnack.svg',
            alt: '야식 음식 이미지',
        },
]
return (

    <div className='grid grid-cols-3 gap-4 mt-[6.14rem]'>
        {menus.map( menu=> (
            <div className='rounded-lg overflow-hidden'>
                <img className='w-[361px] h-[194px] rounded-[10px] shadow' src={menu.image} alt={menu.alt}></img>
            </div>
        ))}
    </div>

  )
}

export default MenuSquare;