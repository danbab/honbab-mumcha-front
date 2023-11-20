import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import DetailPageHeader from "../components/DetailPageHeader";
import DetailPageTitleAndContentSection from "../components/DetailPageTitleAndContentSection";
import axios from 'axios';
import LoadingSpinner from "../components/LoadingSpinner";
import DetailPageMapContainer from "../components/DetailPageMapContainer";
import { useCookies } from "react-cookie";

const BoardDetailPage = () => {
  let { state } = useLocation();
  const [boardData, setBoardData] = useState();
  console.log("state.id: " + state.id);
  const [isLoading, setIsLoading] = useState(true);  // 로딩 상태를 관리하는 state

    //토큰 사용을 위한 초기화
    const [cookies] = useCookies();
    const token = cookies.token;

    //요청 헤더에 토큰 값 넘기기
    const requestOption = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/board/boardDetails/${state.id}`,requestOption);
        setBoardData(response.data);
        console.log('axios로 값 받아온 후의 보드 데이터:' + JSON.stringify(response.data));
      } catch (e) {
        console.error("모집글 상세 정보 가져오기 실패!: ", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBoardData();
  }, [state.id]);

  if (isLoading) {
    return <LoadingSpinner />;  // 로딩 중일 때는 LoadingSpinner 컴포넌트를 렌더링
  }

  return (
    <div>
      <DetailPageHeader boardData={boardData} isLoading={isLoading} />
      <DetailPageTitleAndContentSection boardData={boardData} isLoading={isLoading} />

      <div className="flex justify-between max-w-screen-xl mx-auto">
        <div className="w-full h-full mt-20 my-5">
          <DetailPageMapContainer boardData={boardData} />
        </div>
      </div>
    </div>
  );
};

export default BoardDetailPage;


// import React, { useReducer, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import axios from 'axios';
// import LoadingSpinner from "../components/LoadingSpinner";
// import DetailPageHeader from "../components/DetailPageHeader";
// import DetailPageTitleAndContentSection from "../components/DetailPageTitleAndContentSection";
// import DetailPageMapContainer from "../components/DetailPageMapContainer";

// const initialState = {
//   isLoading: true,
//   boardData: null,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'FETCH_SUCCESS':
//       return {
//         isLoading: false,
//         boardData: action.payload,
//       };
//     case 'FETCH_ERROR':
//       return {
//         ...state,
//         isLoading: false,
//       };
//     default:
//       throw new Error();
//   }
// }

// const BoardDetailPage = () => {
//   let { state } = useLocation();
//   const [appState, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     const fetchBoardData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/board/${state.id}`);
//         dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
//       } catch (e) {
//         console.error("모집글 상세 정보 가져오기 실패!: ", e);
//         dispatch({ type: 'FETCH_ERROR' });
//       }
//     };
//     fetchBoardData();
//   }, [state.id]);

//   if (appState.isLoading) {
//     return <LoadingSpinner />;
//   }

//   console.log('이게 뭔데? ::', fetchBoardData);
//   return (
//     <div>
//       <DetailPageHeader boardData={appState.boardData} />
//       <DetailPageTitleAndContentSection boardData={appState.boardData} />

//       <div className="flex justify-between max-w-screen-xl mx-auto">
//         <div className="w-full h-full mt-20 my-5">
//           <DetailPageMapContainer boardData={appState.boardData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BoardDetailPage;