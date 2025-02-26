import { createContext, useContext, useState, ReactNode } from "react";

export type Bet = {
  game: any;
  odds: any;
  selectedTeam: { name: string; logo: string };
  oddType: string;
};

type BetContextType = {
  selectedBets: Bet[];
  addBet: (bet: Bet) => void;
  removeBet: (betId: string | number) => void;
  updateBetStake: (betId: string | number, stake: number) => void;
  clearBets: () => void;
};

const BetContext = createContext<BetContextType>({} as BetContextType);

type BetProviderProps = {
  children: ReactNode;
};

export const BetProvider = ({ children }: BetProviderProps) => {
  const [selectedBets, setSelectedBets] = useState<Bet[]>([]);

  const addBet = (bet: Bet) => {
    setSelectedBets((prevBets) => {
      const existingBet = prevBets.find((b) => b.game.id === bet.game.id);
      return existingBet ? prevBets : [...prevBets, bet];
    });
  };

  const removeBet = (betId: string | number) => {
    setSelectedBets((prevBets) =>
      prevBets.filter((bet) => bet.game.id !== betId)
    );
  };

  const updateBetStake = (betId: string | number, stake: number) => {
    setSelectedBets((prevBets) =>
      prevBets.map((bet) =>
        bet.game.id === betId
          ? { ...bet, stake, potentialPayout: stake * bet.odds }
          : bet
      )
    );
  };

  const clearBets = () => {
    setSelectedBets([]);
  };

  return (
    <BetContext.Provider
      value={{ selectedBets, addBet, removeBet, updateBetStake, clearBets }}
    >
      {children}
    </BetContext.Provider>
  );
};

export const useBet = () => useContext(BetContext);
