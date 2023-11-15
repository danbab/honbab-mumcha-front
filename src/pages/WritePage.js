import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import KakaoMapWrite from "../components/KakaoMapWrite";
const { kakao } = window;

const WritePage = () => {
  const [buttonHashTag, setbuttonHashTag] = useState("");
  const [hashTags, setHashTags] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [placeCategory, setPlaceCategory] = useState("");
  const [time, setTime] = useState(null);
  const [meetDate, setMeetDate] = useState("");
  const [people, setPeople] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isInputVisible, setInputVisible] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  // const handleClick = () => {
  //   setInputVisible(!isInputVisible);
  // };

  // const handleButtonHashTag = (val) => {
  //   setbuttonHashTag(val);
  // };

  // const handleHashTags = (val) => {
  //   setHashTags(val);
  // };

  const handleSelectPlace = (name, address) => {
    setRestaurantName(name);
    setRestaurantAddress(address);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const geocoder = new kakao.maps.services.Geocoder();

    // 주소를 좌표로 변환합니다
    geocoder.addressSearch(restaurantAddress, async (result, status) => {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const lat = result[0].y;
        const lng = result[0].x;
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        console.log(coords);

        try {
          const response = await axios
            .post("http://localhost:8080/api/board/new", {
              restaurantName: restaurantName,
              restaurantAddress: restaurantAddress,
              foodCategory: foodCategory,
              placeCategory: placeCategory,
              time: time,
              meetDate: meetDate,
              people: people,
              title: title,
              content: content,
              locationX: String(coords.getLng()),
              locationY: String(coords.getLat()),
            })
            .then((response) => {
              console.log(response.data);
              // alert(response.data);
              alert('작성이 완료되었습니다.');
            });
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  return (
    <>
      <div className="flex flex-wrap justify-between items-center w-[74.9375rem] mx-auto my-0">
        <Link to="/">
          <img src="img/mainlogo.svg" alt="메인로고" />
        </Link>
        <div className="flex">
          <img src="img/Bell.svg" alt="이미지" />
          <p></p>
        </div>
      </div>
      <div className="w-[50.5rem] mx-auto my-0">
        <div className="text-[1.25rem] mt-[0.5rem]">식당찾기</div>
        <KakaoMapWrite onSelectPlace={handleSelectPlace} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-[50.5rem] h-[46.75rem] mt-[3rem] mx-auto my-0">
          <div className="flex justify-between border-b-2 border-[#000000] pb-3">
            <div className="text-[1.25rem] mt-[0.5rem]">글쓰기</div>
            <button
              className="rounded-[0.625rem] text-[0.75rem] w-[6.3125rem] h-[2.4375rem] bg-[#54AB75] hover:bg-green-600 text-[#ffffff] shadow-md"
              type="submit"
            >
              약속 만들기
            </button>
          </div>
          <div className="flex flex-col mt-5">
            <div className="flex flex-row justify-between mb-4">
              <input
                className="border w-[15.9375rem] h-[2.0625rem] bg-[#F9F9F9] rounded-md px-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                type="text"
                placeholder="식당 이름"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
              />
              <input
                className="border w-[33.9375rem] h-[2.0625rem] bg-[#F9F9F9] rounded-md px-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                type="text"
                placeholder="주소"
                value={restaurantAddress}
                onChange={(e) => setRestaurantAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-row justify-between gap-12 mb-4">
              <select
                className="border w-[12.875rem] h-[2.0625rem] bg-[#F9F9F9] rounded-md px-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                value={foodCategory}
                onChange={(e) => setFoodCategory(e.target.value)}
                defaultValue={"음식테마 선택"}
              >
                <option value="음식테마 선택">음식테마 선택</option>
                <option value="양식">양식</option>
                <option value="카페">카페</option>
                <option value="찜">찜</option>
                <option value="일식">일식</option>
                <option value="피자">피자</option>
                <option value="햄버거">햄버거</option>
                <option value="떡볶이">떡볶이</option>
                <option value="아시아">아시아</option>
                <option value="족발">족발</option>
              </select>
              <select
                className="border w-[12.875rem] h-[2.0625rem] bg-[#F9F9F9] rounded-md px-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                value={placeCategory}
                onChange={(e) => setPlaceCategory(e.target.value)}
                defaultValue={"장소 선택"}
              >
                <option value="음식테마 선택">장소 선택</option>
                <option value="용산">용산</option>
                <option value="성수">성수</option>
                <option value="종로">종로</option>
                <option value="동대문">동대문</option>
                <option value="잠실">잠실</option>
                <option value="여의도">여의도</option>
                <option value="홍대">홍대</option>
                <option value="신사">신사</option>
                <option value="청담">청담</option>
                <option value="삼성">삼성</option>
              </select>
              <input
                className="border bg-[#F9F9F9] rounded-md w-[16rem] h-[2.0625rem] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] px-2"
                type="time"
                placeholder="시간"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <input
                className="border bg-[#F9F9F9] rounded-md px-2 w-[15.875rem] h-[2.0625rem] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                type="date"
                placeholder="날짜"
                value={meetDate}
                onChange={(e) => setMeetDate(e.target.value)}
              />
              <input
                className="border bg-[#F9F9F9] rounded-md px-2 w-[6.875rem] h-[2.0625rem] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                type="text"
                placeholder="인원수(숫자)"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
              />
            </div>
            <input
              className="border bg-[#F9F9F9] rounded-md px-2 h-[2.0625rem] mb-4 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="border bg-[#F9F9F9] rounded-md h-[36.5rem] mb-5 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] py-3 px-3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>
        <input type="hidden" name="lat" value={lat} />
        <input type="hidden" name="lng" value={lng} />
      </form>
    </>
  );
};

export default WritePage;