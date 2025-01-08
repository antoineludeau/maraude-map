"use client";
import { createContext, useContext, useState } from "react";
import type { Maraude } from "@/types/maraude";

import initMaraudes from "@/data/maraudes.json";

interface MaraudeContextType {
  maraudes: Maraude[];
  setMaraudes: React.Dispatch<React.SetStateAction<Maraude[]>>;
  updateMaraude: (id: string, updatedMaraude: Partial<Maraude>) => void;
  selectedMaraudeID: string | null;
  setSelectedMaraudeID: React.Dispatch<React.SetStateAction<string | null>>;
}

const MaraudeContext = createContext<MaraudeContextType | undefined>(undefined);

export const MaraudesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [maraudes, setMaraudes] = useState<Maraude[]>(
    initMaraudes as Maraude[]
  );
  const [selectedMaraudeID, setSelectedMaraudeID] = useState<string | null>(
    null
  );

  const updateMaraude = (id: string, updatedMaraude: Partial<Maraude>) => {
    setMaraudes((prevMaraudes) =>
      prevMaraudes.map((maraude) =>
        maraude.id === id ? { ...maraude, ...updatedMaraude } : maraude
      )
    );
  };

  return (
    <MaraudeContext.Provider
      value={{
        maraudes,
        setMaraudes,
        updateMaraude,
        selectedMaraudeID,
        setSelectedMaraudeID,
      }}
    >
      {children}
    </MaraudeContext.Provider>
  );
};

export const useMaraudes = () => {
  const context = useContext(MaraudeContext);
  if (!context) {
    throw new Error("useMaraudes must be used within a MaraudesProvider");
  }
  return context;
};
