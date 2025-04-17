import { Dua } from "../types";

type DuaLocalStorage = {
  duaName: string;
  duas: Dua[];
};

export const useLocalStorage = () => {
  const saveDua = (duaName: string, duas: Dua[]) => {
    const savedDuas = getSavedDua();

    localStorage.setItem(
      "duas",
      JSON.stringify([...savedDuas, { duaName: duaName, duas: duas }])
    );
  };

  const getSavedDua = () => {
    const duas = localStorage.getItem("duas");
    if (duas) {
      return JSON.parse(duas) as DuaLocalStorage[];
    }

    return [];
  };

  return { saveDua, getSavedDua };
};
