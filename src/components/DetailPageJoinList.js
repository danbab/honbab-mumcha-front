import axios from 'axios';
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import LoadingSpinner from "../components/LoadingSpinner";
import DetailPageParticipantsCard from "../components/DetailPageParticipantsCard";

const DetailPageJoinList = ({ boardData, isLoading }) => {
  const [participationData, setParticipationData] = useState([]);
  const [cookies] = useCookies();
  const token = cookies.token;

  console.log("조인리스트에서 쓸: " + JSON.stringify(boardData));

  const requestOption = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    const fetchParticipationData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/my/party/${boardData.boardId}`, requestOption);
        setParticipationData(response.data);
        console.log('axios로 값 받아온 데이터:', participationData);
      } catch (e) {
        console.error("데이터 가져오기 실패!: ", e);
      }
    };
    fetchParticipationData();
  }, []);

  console.log("참여자 정보요: " + JSON.stringify(participationData));

  if (isLoading || !boardData || !participationData) {
    return <LoadingSpinner />;    //로딩 중일 때는 LoadingSpinner 컴포넌트를 렌더링
  }

  return (
    <div className="grid grid-cols-2 gap-4 text-center justify-between max-w-screen-sm mx-auto my-10 rounded-[2rem] border-2 border-gray-200 bg-white">
      <p className="col-span-2 mt-2 text-xl text-center font-sans ">참가 현황</p>
      {participationData.length > 0 ? (
        <div className='col-span-2'>
          <ul className='grid grid-cols-2 gap-4 justify-items-center items-center'>
            {participationData.map((participant, index) => {
              // 참가자 생년월일 -> 나이로 변환해주는 로직
              const birthDate = new Date(participant.birth);
              const today = new Date();
              let age = today.getFullYear() - birthDate.getFullYear();
              let m = today.getMonth() - birthDate.getMonth();
              if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
              }

              return (
                <DetailPageParticipantsCard
                  key={index}
                  isLoading={isLoading}
                  participants={participant}
                  age={age}
                />
              );
            })}
          </ul>
        </div>
      ) : (
        <p className="grid-cols-2">참가자 정보가 없습니다.</p>
      )}
    </div>
  );
};

export default DetailPageJoinList;