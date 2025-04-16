import "./App.css";
import { Separator } from "./components/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/tabs";

function App() {
  const tabConfigs = [
    { label: "Create dua", value: "createdua", content: <>Create Dua</> },
    { label: "My dua", value: "mydua", content: <>my dua</> },
  ];

  return (
    <div className="min-h-screen max-w-2xl min-w-sm flex px-4 rounded-md shadow-lg border border-gray-300">
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
        {/* <div className="p-4 space-y-4">
          <Input placeholder="Search for a dua..." className="" />

          <div className="space-y-2">
            <div className="p-3 border border-gray-200 rounded">
              O Allah, forgive meaaaaO Allah, forgive meaaaaO Allah, forgive
              meaaaaO Allah, forgive meaaaaO Allah, forgive me
            </div>
            <div className="p-3 border border-gray-200 rounded">
              Guide me to the straight path.
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default App;
