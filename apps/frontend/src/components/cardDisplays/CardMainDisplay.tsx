import { CardInfo } from "@/constants/cardInfo";

type CardMainDisplayProps = {
  cardInfo: CardInfo | null;
};

/**
 * todo: functionality
 * - be able to add card to storage
 * - be able to specify what card variant to add
 */

export const CardMainDisplay = ({ cardInfo }: CardMainDisplayProps) => {
  return (
    <div>
      <img src={cardInfo?.imageSrc} />
    </div>
  );
};
