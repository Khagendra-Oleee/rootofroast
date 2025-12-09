import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Sourcing from "@/pages/Sourcing";
import Space from "@/pages/Space";
import Craft from "@/pages/Craft";
import ExploreProcess from "@/pages/ExploreProcess";
import Machines from "@/pages/Machines";

const pageVariants = {
  initial: { opacity: 0, filter: "blur(10px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(10px)" }
};

const pageTransition = {
  duration: 0.5,
  ease: "easeInOut" as const
};

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/sourcing">
          <motion.div
            key="sourcing"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Sourcing />
          </motion.div>
        </Route>
        <Route path="/space">
          <motion.div
            key="space"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Space />
          </motion.div>
        </Route>
        <Route path="/craft">
          <motion.div
            key="craft"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Craft />
          </motion.div>
        </Route>
        <Route path="/process">
          <motion.div
            key="process"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ExploreProcess />
          </motion.div>
        </Route>
        <Route path="/machines">
          <motion.div
            key="machines"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Machines />
          </motion.div>
        </Route>
        <Route path="/">
          <motion.div
            key="home"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Home />
          </motion.div>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
