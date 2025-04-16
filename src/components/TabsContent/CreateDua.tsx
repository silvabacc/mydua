import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card";
import { Input } from "../input";
import { useState } from "react";
import { Reorder } from "motion/react";
import duasJson from "../../data/duas.json";
import { Dua } from "../../types";
import { Separator } from "../separator";

export default function CreateDua() {
  const [searchedDuas, setSearchedDuas] = useState<Dua[]>(duasJson as Dua[]);
  const [duas, setDuas] = useState<Dua[]>([]);

  const handleOnDrag = (e: React.DragEvent, dua: Dua) =>
    e.dataTransfer.setData("dua", JSON.stringify(dua));

  const handleonDrop = (e: React.DragEvent) => {
    const dua = e.dataTransfer.getData("dua");
    setDuas((prev) => [...prev, JSON.parse(dua) as Dua]);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  return (
    <div className="p-4 space-y-2">
      <Input placeholder="Search for a dua..." className="" />
      <div className="grid lg:grid-cols-1 sm:grid-cols-2 gap-4">
        {searchedDuas.map((dua) => (
          <Card
            key={dua.translation}
            draggable
            onDragStart={(e) => handleOnDrag(e, dua)}
          >
            <CardHeader>
              <CardTitle>{dua.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{dua.arabic}</p>
              <p>{dua.translation}</p>
              <CardFooter>
                <p>{dua.source}</p>
              </CardFooter>
            </CardContent>
          </Card>
        ))}
      </div>
      <div
        onDrop={handleonDrop}
        onDragOver={handleDragOver}
        className="bg-red-200 h-34"
      >
        <Reorder.Group axis="y" values={duas} onReorder={setDuas}>
          {duas.map((dua) => (
            <Reorder.Item key={dua.title} value={dua}>
              {dua.title}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}
