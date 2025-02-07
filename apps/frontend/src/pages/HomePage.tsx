import { useState } from "react";
import { CardInfo } from "@/constants/cardInfo";
import { CardForm } from "@/components/cardForm/CardForm";
import { CardStorage } from "@/components/cardDisplays/CardStorage";
import { CardMainDisplay } from "@/components/cardDisplays/CardMainDisplay";

const HomePage = () => {
  const [currentCard, setCurrentCard] = useState<CardInfo>();
  const [allCards, setAllCards] = useState<CardInfo[]>([]);

  return (
    <div className="h-fit p-20 flex flex-col justify-center items-center">
      <img src="/ptbags.png" alt="" width="140" height="75" />
      <h1 className="pb-4">Project Pokebag</h1>
      <CardForm
        allCards={allCards}
        setCurrentCard={setCurrentCard}
        setAllCards={setAllCards}
      />
      <CardMainDisplay cardInfo={currentCard ?? null} />
      <CardStorage allCards={allCards} />
    </div>
  );
};

export default HomePage;
