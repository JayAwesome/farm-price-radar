import React from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import AIAssistant from "./components/AIAssistant";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/sonner";

const AppFooter = () => (
  <footer className="text-center text-xs text-muted-foreground p-4 lg:ml-64">
    Data is simulated for this prototype. It could be integrated with sources like the
    <TooltipProvider> <Tooltip> <TooltipTrigger>
      <span className="font-bold cursor-pointer"> National Bureau of Statistics (NBS) </span>
    </TooltipTrigger> <TooltipContent> <p>Or local market surveys and commodity exchange APIs.</p> </TooltipContent> </Tooltip> </TooltipProvider>
    for live market data.
  </footer>
);

function App() {
  const [activeTab, setActiveTab] = React.useState("dashboard");

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "analytics" && <Analytics />}
          {activeTab === "assistant" && <AIAssistant />}
        </div>
        <AppFooter />
      </main>

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
