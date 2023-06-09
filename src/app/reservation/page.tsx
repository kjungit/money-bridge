"use client";
import BubbleSection from "@/components/reservationPage/BubbleSection";
import { useState } from "react";
import reservationInfo from "@/mocks/seon/reservationInfo.json";
import { IAnswers } from "@/types/reservation";
import SelectTimeModal from "@/components/reservationPage/SelectTimeModal";

function ReservationPage() {
  const { pbName, pbStation, consultTime, userInfo } = reservationInfo.data;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<IAnswers>({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  });

  const moveToNextStep = () => {
    setStep(step + 1);
  };

  return (
    <>
      <div className="w-full p-6">
        <section className="mb-4 flex flex-col gap-y-4">
          <div className="chatBubble">
            <p>
              {pbName}의 상담예약 페이지입니다!
              <br />
              머니브릿지와 함께 정해보아요~
            </p>
          </div>
          <div className="userBubble">
            <p>네! 좋아요</p>
          </div>
        </section>
        {step >= 0 && (
          <BubbleSection step={0} answers={answers} setAnswers={setAnswers} moveToNextStep={moveToNextStep} />
        )}
        {step >= 1 && (
          <BubbleSection step={1} answers={answers} setAnswers={setAnswers} moveToNextStep={moveToNextStep} />
        )}
        {step >= 2 && (
          <BubbleSection
            pbStation={pbStation}
            step={2}
            answers={answers}
            setAnswers={setAnswers}
            moveToNextStep={moveToNextStep}
          />
        )}
        {step >= 3 && (
          <BubbleSection step={3} answers={answers} setAnswers={setAnswers} moveToNextStep={moveToNextStep} />
        )}
        {step >= 4 && (
          <BubbleSection
            consultTime={consultTime}
            step={4}
            answers={answers}
            setAnswers={setAnswers}
            moveToNextStep={moveToNextStep}
          />
        )}
      </div>
      <SelectTimeModal consultTime={consultTime} />
    </>
  );
}

export default ReservationPage;
