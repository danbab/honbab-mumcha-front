import React from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const DetailPageParticipantsCard = ({ participants, age, isLoading }) => {
    console.log(participants);
    console.log(age);

    if (participants.gender === 'm') {
        participants.gender = '남자'
    } else { participants.gender = '여자' }

    if (isLoading) {
        return <LoadingSpinner />;  //로딩 중일 때는 LoadingSpinner 컴포넌트를 렌더링
    }

    return (
        <div className="flex my-2 border bg-neutral-100 w-[13rem] h-auto rounded-[2rem]">
            <div className="mx-auto my-2">
                <img className="mx-auto" src="/img/iamlogo.svg" />
                <img
                    className="my-2 w-[5.5rem] h-[5.5rem]"
                    src="/img/profile.svg"
                />
                <div className="text-gray-700 list-disc mx-3 font-sans">
                    <li>{participants.name}</li>
                    <li>{age}세</li>
                    <li>{participants.gender}</li>
                </div>
            </div>
        </div>
    );
};

export default DetailPageParticipantsCard;