import "./App.css";
import CreateDua from "./components/TabsContent/CreateDua";
import MyDuas from "./components/TabsContent/MyDuas";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

function App() {
  const tabConfigs: TabsProps["items"] = [
    {
      key: "createdua",
      label: "Create dua",
      children: <CreateDua />,
    },

    {
      key: "mydua",
      label: "My duas",
      children: <MyDuas />,
    },
  ];

  return (
    <div className="h-screen min-w-sm flex px-4 rounded-md shadow-lg border border-gray-300 overflow-auto">
      <div className="min-w-sm">
        <div className="text-left rounded-md py-2">
          <span className="text-3xl font-bold">MyDua 🕊️</span>
          <h2 className="font-bold">
            Create your own{" "}
            <span className="text-purple-400">beautiful&nbsp;</span>
            duas
          </h2>
        </div>
        <Tabs items={tabConfigs} />
      </div>
    </div>
  );
}

export default App;
