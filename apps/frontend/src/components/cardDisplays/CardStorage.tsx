import { CardInfo } from "@/constants/cardInfo";

type CardStorageProps = {
  allCards: CardInfo[];
};

/**
 * todo: display more info
 * - display variant of card added
 * - display market price of card
 */

export const CardStorage = ({ allCards }: CardStorageProps) => {
  return (
    <div className="my-6 grid grid-cols-6 gap-4">
      {allCards.map((card) => {
        return <img key={card.id} src={card.imageSrc} />;
      })}
    </div>
  );
};
