export type CardInfo = {
  id: string;
  cardName: string;
  setName: string;
  imageSrc: string;
  tcgplayer: {
    normal: {
      market: number;
    };
    holofoil: {
      market: number;
    };
    reverseHolofoil: {
      market: number;
    };
  };
};
