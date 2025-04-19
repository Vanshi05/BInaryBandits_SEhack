<<<<<<< HEAD
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Search from "./pages/Search";
import ItemDetail from "./pages/ItemDetail";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Channel from "./components/Channel";
import { auth } from "@/Backend/firebase";
import { useAuthState } from "@/hooks";
import { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Auth protection component
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, initializing } = useAuthState(auth);

  if (initializing) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return user ? <>{children}</> : <Navigate to="/" replace />;
};
=======

import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import NotFound from "./pages/NotFound"
import Dashboard from "./pages/Dashboard"
import ListItem from "./pages/ListItem"
import Browse from "./pages/Browse"
import ItemDetail from "./pages/ItemDetail"
import HowItWorks from "./pages/HowItWorks"
import About from "./pages/About"
import Impact from "./pages/Impact"
import AadharVerification from "./pages/AadharVerification"

const queryClient = new QueryClient()
>>>>>>> 6048c5d2ddec5792972ccf9e0cdbddc13ad74202

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/search" element={<Layout><Search /></Layout>} />
          <Route path="/item/:id" element={<Layout><ItemDetail /></Layout>} />
          
          {/* Protected Channel Route */}
          <Route 
            path="/channel" 
            element={
              <Layout>
                <ProtectedRoute>
                  <Channel />
                </ProtectedRoute>
              </Layout>
            } 
          />
          
          {/* Add more protected routes as needed */}
=======
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/share" element={<ListItem />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/profile" element={<Dashboard />} />
          <Route path="/aadhar-verification" element={<AadharVerification />} />
>>>>>>> 6048c5d2ddec5792972ccf9e0cdbddc13ad74202
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
)

<<<<<<< HEAD
export default App;
=======
export default App
>>>>>>> 6048c5d2ddec5792972ccf9e0cdbddc13ad74202
