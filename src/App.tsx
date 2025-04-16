import "./App.css";
import { Separator } from "./components/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/tabs";
import CreateDua from "./components/TabsContent/CreateDua";

function App() {
  const tabConfigs = [
    { label: "Create dua", value: "createdua", content: <CreateDua /> },
    { label: "My dua", value: "mydua", content: <>my dua</> },
  ];

  return (
    <div className="min-h-screen min-w-sm flex px-4 rounded-md shadow-lg border border-gray-300">
      <div className="min-w-sm">
        <div className="text-left rounded-md py-2">
          <span className="text-3xl font-bold">MyDua 🕊️</span>
          <h2 className="font-bold">
            Create your own{" "}
            <span className="text-purple-400">beautiful&nbsp;</span>
            duas
          </h2>
        </div>
        <Tabs defaultValue={tabConfigs[0].value}>
          <TabsList className="flex bg-white justify-start">
            {tabConfigs.map((config) => (
              <TabsTrigger value={config.value}>{config.label}</TabsTrigger>
            ))}
          </TabsList>
          <Separator className="mt-4" />
          {tabConfigs.map((config) => (
            <TabsContent key={config.value} value={config.value}>
              {config.content}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default App;
