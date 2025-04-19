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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;