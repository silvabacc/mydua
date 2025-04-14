import "./App.css";

function App() {
  return (
    <div className="min-h-screen flex rounded-md shadow-lg border border-gray-300">
      <div className="max-w-xl min-w-sm">
        <div className="text-left bg-black text-white rounded-md px-4 py-2">
          <span className="text-3xl font-bold">MyDua 🕊️</span>
          <h2 className="font-bold">
            Create your own{" "}
            <span className="text-purple-400">beautiful&nbsp;</span>
            duas
          </h2>
        </div>
        <div className="p-4">
          <input
            type="text"
            placeholder="Search for a dua..."
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          <div className="space-y-2">
            <div className="p-3 border border-gray-200 rounded">
              O Allah, forgive meaaaaO Allah, forgive meaaaaO Allah, forgive
              meaaaaO Allah, forgive meaaaaO Allah, forgive me
            </div>
            <div className="p-3 border border-gray-200 rounded">
              Guide me to the straight path.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
