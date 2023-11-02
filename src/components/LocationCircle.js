import React from 'react'

const LocationCircle = () => {

    const locations = [
        {
            name: "",
            image: 'img/location.svg',
            alt:"내 위치 아이콘"
        },
        {
            name: "",
            image: 'img/yongsan.svg',
            alt:"용산 이미지"
        },
        {
            name: "",
            image: 'img/sungsu.svg',
            alt:"성수 이미지"
        },
        {
            name: "",
            image: 'img/jongro.svg',
            alt: "종로 이미지"
        },
        {
            name: "",
            image: 'img/dongdaemun.svg',
            alt: "동대문 이미지"
        },
        {
            name: "", 
            image: 'img/jamsil.svg',
            alt:"잠실 이미지"
        },
        {
            name: "",
            image: 'img/yeouido.svg',
            alt: "여의도 이미지"
        },
        {
            name: "",
            image: 'img/hongdae.svg',
            alt: "홍대 이미지"
        },
        {
            name: "",
            image: 'img/sinsa.svg',
            alt : "신사 이미지"
        },
        {
            name: "",
            image: 'img/gyeongbokgung.svg',
            alt:"경복궁 이미지"
        },
        {
            name: "",
            image: 'img/cheongdam.svg',
            alt: "청담 이미지"
        },
        {
            name: "",
            image: 'img/samsung.svg',
            alt: "삼성 이미지"
        }
    ]
    return (
        <div className="grid grid-cols-6 gap-4 mt-[6.14rem]">
            {locations.map(location => (
                <div className='relative'>
                    <p className="absolute inset-0 flex items-center justify-center text-white text-xl font-medium font-['Inter'] p-4">{location.name}</p>
                    <img className='w-[140px] h-[140px] rounded-[100px]' src={location.image} alt={location.alt}/>
                </div>
            ))}
        </div>
    )
}

export default LocationCircle;