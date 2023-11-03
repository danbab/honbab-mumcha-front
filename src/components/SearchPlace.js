import React, { useState } from 'react'
import Map from './Map';

const SearchPlace = () => {
    const [inputText, setInputText] = useState("");
    const [place, setPlace] = useState("");

    //onChange 함수를 활용해서 작성된 검색어를 setInputText에 넣어준다
    const onChange = (evnet) => {
        setInputText(evnet.target.value);
    };

    //submit이 실행되면 지역에 inpuText를 넣어서 보내준다.
    const handleSubmit = (event) => {
        event.preventDefault();
        setPlace(inputText);
        setInputText("");
    };


  return (
    <>
     <div>
        <form className='inputForm' onSubmit={handleSubmit}>
            <inpu 
                placeholder="검색어를 입력해주세요"
                onChange={onChange}
                value={inputText}
            />
            <button type="submit"></button>
        </form>
        <Map searchPlace={place} />
        </div>   
    </>

  )
}

export default SearchPlace