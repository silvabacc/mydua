import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { SavedDua } from "../../types";
import { Card } from "antd";

const MyDuas = () => {
  const { getSavedDua } = useLocalStorage();
  const [cards, setCards] = useState<SavedDua[]>([]);

  useEffect(() => {
    const savedDuas = getSavedDua();
    setCards(savedDuas);
  }, []);

  console.log(cards);
  console.log("asdasd");

  return (
    <div className="space-y-2">
      {cards.map((card, index) => (
        <Card title={card.duaName} key={`${card.duaName}-${index}`}>
          {card.duas.map((dua, index) => (
            <div key={index}>
              <p>{dua.arabic}</p>
              <p>{dua.translation}</p>
            </div>
          ))}
        </Card>
      ))}
    </div>
  );
};

export default MyDuas;
