import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DetailPageJoinList = () => {
  const [participationData, setParticipationData] = useState([]);

  // API에서 데이터를 가져오는 함수
  const fetchParticipationData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/my/');
      setParticipationData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchParticipationData();
  }, []);

  return (
    <div className='felx justify-between boader-2'>
      <h3>참여 현황</h3>
      {participationData.length > 0 ? (
        <ul>
          {participationData.map((participant, index) => (
            <li key={index}>
              <p>{participant.name}</p>
              <p>{participant.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>참여자 정보가 없습니다.</p>
      )}
    </div>
  );
};

export default DetailPageJoinList;