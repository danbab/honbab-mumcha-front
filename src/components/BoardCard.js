import axios from "axios";
import Button from "../components/Button";
import Heart from "../components/Heart";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const Card = ({
  boardDto,
  user,
  participants,
  bringParticipants,
  boardDtos,
  likes,
  bringLikes,
}) => {
  const [active, setActive] = useState(false);
  const [joinStatus, setJoinStatus] = useState("join-status-default");
  const [buttonText, setButtonText] = useState("참여하기");
  const [isLoading, setIsLoading] = useState(true);
  let date = new Date(boardDto.regDate);
  // 날짜 및 시간 형식 지정
  const options = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  // 지역화된 문자열로 변환
  date = date
    .toLocaleDateString("ko-KR", options)
    .replace(/\./g, "-")
    .replace(/ /g, "");

  const enterParty = () => {
    //로그인 되어 있지 않으면 로그인 페이지로
    if (user === null) {
      alert("로그인이 필요합니다");
      sessionStorage.setItem("togoUrl", "/boardList");
      window.location.href = "/login";
    } else {
      //로그인 되어 있다면 서버에 참가하기 요청
      axios
        .post("http://localhost:8080/api/app/participate", {
          boardNo: boardDto.boardId,
          email: user.email,
          username: user.username,
        })
        .then((response) => {
          console.log("what" + response);
          let confirmMove = window.confirm(
            "참가신청이 완료되었습니다.\n마이페이지로 이동하시겠습니까?"
          );
          if (confirmMove) {
            window.location.href = "/my";
          } else {
            window.location.reload();
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            alert(error.response.data);
            //console.log(error.response);
          } else if (error.response.status === 401) {
            alert("권한이 없습니다. 로그인해주세요.");
            sessionStorage.setItem("togoUrl", "/boardList");
            window.location.href = "/login";
          } else alert("Client : 서버 오류");
        });
    }
  };

  const [isLiking, setIsLiking] = useState(false); // '좋아요' 요청이 진행 중인지 나타내는 상태 변수 생성

  const enterLikes = async (e) => {
    //로그인 되어 있지 않으면 로그인 페이지로
    if (user === null) {
      alert("로그인이 필요합니다");
      sessionStorage.setItem("togoUrl", "/boardList");
      window.location.href = "/login";
      return new Promise((resolve, reject) => reject("로그인이 필요합니다"));
    } else {
      if (active) {
        //이미 '좋아요' 상태라면 '좋아요' 제거 요청
        return axios
          .post("http://localhost:8080/api/app/dislikes", {
            boardNo: boardDto.boardId,
            email: user.email,
          })
          .then((response) => {
            console.log("what" + response);
          })
          .catch((error) => {
            if (error.response.status === 400) {
              alert(error.response.data);
              //console.log(error.response);
            } else if (error.response.status === 401) {
              alert("권한이 없습니다. 로그인해주세요.");
              sessionStorage.setItem("togoUrl", "/boardList");
              window.location.href = "/login";
            } else alert("Client : 서버 오류");
          });
      } else {
        //아직 '좋아요' 상태가 아니라면 '좋아요' 요청
        return axios
          .post("http://localhost:8080/api/app/likes", {
            boardNo: boardDto.boardId,
            email: user.email,
          })
          .then((response) => {
            console.log("what" + response);
          })
          .catch((error) => {
            if (error.response.status === 400) {
              alert(error.response.data);
              //console.log(error.response);
            } else if (error.response.status === 401) {
              alert("권한이 없습니다. 로그인해주세요.");
              sessionStorage.setItem("togoUrl", "/boardList");
              window.location.href = "/login";
            } else alert("Client : 서버 오류");
          });
      }
    }
  };

  useEffect(() => {
    if (user === null) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    console.log("BoardCard button setting called :)");
    setJoinStatus("join-status-default");
    setButtonText("참여하기");
    setActive(false);
    console.log("I was called intermidately::" + participants);
    participants.forEach((participant) => {
      //console.log("dfdfdfdf" + boardDto.boardId);
      if (participant.board.id === boardDto.boardId) {
        console.log("BoardCard button setting called twice :)");
        if (participant.status === 1) {
          setJoinStatus("join-status-accepted");
          setButtonText("참여중");
        } else if (participant.status === 0) {
          setJoinStatus("join-status-pending");
          setButtonText("대기중");
        } else if (participant.status === -1) {
          setJoinStatus("join-status-rejected");
          setButtonText("거절됨");
        } else return;
      }
    });

    likes.forEach((like) => {
      if (like.board.id === boardDto.boardId) {
        setActive(true);
      }
    });
    setIsLoading(false);
  }, [user, boardDtos]);

  if (isLoading) {
    return <LoadingSpinner />; // 로딩 중일 때는 이 메시지를 표시
  }

  return (
    <div className="bg-[#FDFDFD] w-[15.625rem] h-[24.875rem] rounded-[1.25rem] relative">
      <div className="w-[14.25rem] h-[21.875rem] flex justify-between mx-auto">
        <div className="flex gap-2 ml-2 mt-[1.25rem]">
          <img
            className="w-[2.125rem] h-[2.125rem]"
            src="img/iamlogo.svg"
            alt="로고"
          />
          {/* 작성자 이름 */}
          <div className="text-[#000] text-[12px] mt-3">
            {boardDto.writer.name}
          </div>
        </div>
        {/* 작성일-reg_date */}
        <div className="text-[#BFBFBF] text-[10px] mt-[2.1rem] mr-[0.5rem]">
          {date}
        </div>
        {boardDto.regDate !== boardDto.lastModified && (
          <span className="absolute top-12 right-[1.2rem] text-[#BFBFBF] text-[10px]">
            수정됨
          </span>
        )}
      </div>
      <img
        className="absolute top-[4.5rem] right-0 w-full h-[12.1875rem] "
        src="img/boardexampleimg.svg"
        alt="대표 이미지"
      />

      <Link to={`/board/boardDetail/${boardDto.boardId}`} >
        {/* 글 제목-title */}
        <p className="absolute bottom-[6rem] left-[1rem] ml-1 text-[1rem] font-bold overflow-hidden overflow-ellipsis whitespace-nowrap w-[10.2rem]">
          {boardDto.title}
        </p>
      </Link>
      <Heart
        className="w-[1.5rem] absolute bottom-[6rem] right-[1.1rem]"
        // isActive={active}
        isActive={active}
        //#v1
        // onClick={async () => {
        //   setActive(!active);
        //   await enterLikes();
        //   await bringLikes();
        // }}
        //#v2
        // onClick={() => {
        //   enterLikes().then(() => {
        //     setActive(!active);
        //     bringLikes();
        //   });
        // }}

        //#v3
        // onClick={() => {
        //   setActive(!active); // Immediately update the UI
        //   enterLikes()
        //     .catch(() => {
        //       // If the request fails, revert the UI update
        //       setActive(active);
        //     })
        //     .finally(() => {
        //       bringLikes(); // Update the likes list once the server request completes
        //     });
        // }}
        //#v4
        onClick={() => {
          if (!isLiking) {
            setIsLiking(true);
            enterLikes().then(() => {
              setActive(!active);
              bringLikes();
              setIsLiking(false);
            });
          }
        }}
        animationTrigger="both"
        inactiveColor="rgba(255,125,125,.75)"
        activeColor="#E14949"
        animationDuration={0.1}
      />

      <ul className="list-disc absolute bottom-[3.8rem] left-[2rem] ">
        <li className="text-[#8B8686] text-[0.6rem]">
          {boardDto.restaurantName}
        </li>
        <li className="text-[#8B8686] text-[0.6rem]">
          {boardDto.restaurantAddress}
        </li>
      </ul>

      <div className="absolute bottom-[1rem] left-[1rem]">
        <div className="w-[14.25rem] h-[2rem] flex justify-between ">
          <Button
            type={joinStatus}
            onClick={async () => {
              enterParty();
              await bringParticipants();
            }}
          >
            {buttonText}
          </Button>
          {/* 상태에 따라 모집중 또는 모집완료 표시 */}
          {boardDto.status === 1 ? (
            <span className="mt-1 mr-4 text-[0.9rem] text-green-500 font-bold">
              모집중
            </span>
          ) : (
            <span className="mt-1 mr-4 text-[0.9rem] text-red-500 font-bold">
              모집완료
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
