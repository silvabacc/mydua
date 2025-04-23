import { Dispatch, SetStateAction, useEffect, useState } from "react";
import duasJson from "../../data/duas.json";
import { motion } from "framer-motion";
import { Dua } from "../../types";
import { Separator } from "../separator";
import { Button } from "../button";
import { Input } from "../input";
import { Alert, AlertDescription } from "../alert";
import { useLocalStorage } from "../../hooks/useLocalStorage";

type CreateDuaProps = {
  onSave: () => void;
};
export default function CreateDua({ onSave }: CreateDuaProps) {
  const { saveDua } = useLocalStorage();
  const [duaCards, setDuaCards] = useState<CardType[]>([]);
  const [duaName, setDuaName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const duas = duasJson.map((dua) => ({
      dua,
      id: dua.id,
      column: "duas" as ColumnType,
    }));

    setDuaCards(duas);
  }, []);

  const onSaveDua = () => {
    if (!duaName) {
      setError("Please name your dua");
      return;
    }
    if (duaCards.filter((dua) => dua.column === "mydua").length === 0) {
      setError("You haven't selected any duas");
      return;
    }

    const selectedDuas = duaCards
      .filter((dua) => dua.column === "mydua")
      .map((dua) => dua.dua);
    saveDua(duaName, selectedDuas);
    onSave();
  };

  const onChange = (v: React.ChangeEvent<HTMLInputElement>) => {
    setDuaName(v.currentTarget.value);
    setError("");
  };

  return (
    <div className="max-w">
      <div className="sticky top-0  bg-white justify-end">
        <div className="flex space-x-2 py-2">
          <Input value={duaName} onChange={onChange} placeholder="Dua name" />
          <Button onClick={onSaveDua}>Save dua</Button>
        </div>
        {error && (
          <Alert className="border rounded-sm border-red-500">
            <AlertDescription className="text-red-500">
              {error}
            </AlertDescription>
          </Alert>
        )}
      </div>
      <div className="flex w-full gap-3 ">
        <Column column="duas" cards={duaCards} setCards={setDuaCards} />
        <Column column="mydua" cards={duaCards} setCards={setDuaCards} />
      </div>
    </div>
  );
}

type ColumnProps = {
  cards: CardType[];
  column: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

const Column = ({ cards, column, setCards }: ColumnProps) => {
  const handleDragStart = (e: DragEvent, card: CardType) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${column}"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-1/2">
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors `}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column} />
      </div>
    </div>
  );
};

type CardProps = CardType & {
  handleDragStart: any;
};

const Card = ({ dua, id, column, handleDragStart }: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable
        onDragStart={(e) => handleDragStart(e, { dua, id, column })}
        className="cursor-grab border border-neutral-200 rounded p-3 active:cursor-grabbing"
      >
        <p className="text-sm">{dua.arabic}</p>
        <Separator className="my-2" />
        <p className="text-sm">{dua.translation}</p>
        <Separator className="my-2" />
        <p className="text-sm text-neutral-500">{dua.source}</p>
      </motion.div>
    </>
  );
};

type DropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

type ColumnType = "duas" | "mydua";

type CardType = {
  dua: Dua;
  id: string;
  column: ColumnType;
};
