import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import MediaKit from "./pages/MediaKit";
import ObjetosDeDeseo from "./pages/ObjetosDeDeseo";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/media-kit" component={MediaKit} />
      <Route path="/objetos-de-deseo" component={ObjetosDeDeseo} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
