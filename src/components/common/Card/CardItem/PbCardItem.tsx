"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import bookmark from "/public/assets/images/icon/pbcontent_bookmark.svg";
import bookmark_filled from "/public/assets/images/icon/pbcontent_bookmark_filled.svg";
import { useQuery } from "@tanstack/react-query";
import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { postBookMarkPB, deleteBookMarkPB } from "@/app/apis/services/user";
import { IPbCard } from "@/types/card";
import { ILoginedUserInfo } from "@/types/common";
import { AxiosError } from "axios";

function PbCardItem({ item }: { item: IPbCard }) {
  const { data: userData } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["/auth/account"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });
  const router = useRouter();
  const [isBookmarked, setisBookmarked] = useState<boolean | undefined>(item.isBookmarked);

  const bookMark = () => {
    if (isBookmarked) {
      deleteBookMarkPB(item.id);
    } else {
      postBookMarkPB(item.id);
    }
  };

  const goToDetail = () => {
    router.push("/detail/info");
  };

  return (
    <li className="card h-[200px] bg-white px-[20px] pt-[20px]">
      <div className="mb-[18px] flex">
        <Image
          src={item.profile !== "person.png" ? item.profile : "/assets/images/profile.svg"}
          alt="프로필"
          width={60}
          height={60}
          className="mr-[13px] h-[60px] w-[60px] rounded-full"
        />
        <div className="flex flex-1 flex-col">
          <div className="mb-[6px] text-base font-bold">{item.name} PB</div>
          <div className="text-xs">
            {item.companyName}&nbsp;{item.branchName}
          </div>
          <div className="flex text-xs text-gray-normal">
            <p className="font-bold">분야</p>&nbsp;{item.speciality1}&nbsp;
            {item.speciality2 ? item.speciality2 : null}&nbsp;・&nbsp;
            {item.career}년차
          </div>
        </div>
        {userData?.role && (
          <button onClick={bookMark} className="flex-2 flex w-12 items-start justify-center pt-1">
            {isBookmarked ? (
              <Image
                src={bookmark_filled}
                alt="북마크 해제"
                width={24}
                height={25}
                priority
                className="h-[25px] w-[24px]"
              />
            ) : (
              <Image src={bookmark} alt="북마크" width={24} height={25} priority className="h-[25px] w-[24px]" />
            )}
          </button>
        )}
      </div>
      <div className="flex h-[34px] items-center justify-center rounded-md bg-background-primary text-xs font-bold text-primary-normal">
        {item.msg && `"${item.msg}"`}
      </div>
      <div className="mt-[13px] flex items-center text-sm">
        <div className="flex flex-1 text-[10px]">
          <div className="mr-[27px] flex">
            <p className="font-bold">총 상담횟수</p>&nbsp;{item.reserveCount ? item.reserveCount : 0}회
          </div>
          <div className="flex">
            <p className="font-bold">상담 후기</p>&nbsp;{item.reviewCount ? item.reviewCount : 0}건
          </div>
        </div>
        <button onClick={goToDetail} className="flex-2 h-[34px] w-[110px] rounded-md bg-primary-normal text-white">
          상담 신청
        </button>
      </div>
    </li>
  );
}

export default PbCardItem;
