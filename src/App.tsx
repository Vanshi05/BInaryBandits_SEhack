import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import ListItem from "./pages/ListItem";
import Browse from "./pages/Browse";
import ItemDetail from "./pages/ItemDetail";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Impact from "./pages/Impact";
import AadharVerification from "./pages/AadharVerification";
import HomePage from './components/HomePage';
import ChatPage from './pages/ChatPage'; // Updated from ChatRoom to ChatPage
import { ZegoProvider } from './context/ZegoContext'; // Replacing ChatProvider with ZegoProvider

const queryClient = new QueryClient();

const App = () => {
  // In a real app, you'd get these from your auth system
  const demoUser = {
    id: 'user123',
    name: 'Demo User'
  };

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ZegoProvider userID={demoUser.id} userName={demoUser.name}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/share" element={<ListItem />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/item/:id" element={<ItemDetail />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<About />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/profile" element={<Dashboard />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/aadhar-verification" element={<AadharVerification />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ZegoProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;