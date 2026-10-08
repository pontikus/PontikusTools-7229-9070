import { Route, Router, Switch } from "wouter";
import { routerBase } from "./lib/asset";
import Hub from "./pages/hub";
import Postcard from "./pages/postcard";
import Passport from "./pages/passport";
import Journal from "./pages/journal";
import PhotoFrame from "./pages/photo-frame";
import PlannedTool from "./pages/planned-tool";
import { Provider } from "./components/provider";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";

function App() {
  return (
    <Provider>
      <Router base={routerBase}>
      <Switch>
        <Route path="/" component={Hub} />
        <Route path="/tools/postcard" component={Postcard} />
        <Route path="/tools/passport" component={Passport} />
        <Route path="/tools/journal" component={Journal} />
        <Route path="/tools/photo-frame" component={PhotoFrame} />
        <Route path="/tools/:slug" component={PlannedTool} />
        <Route component={PlannedTool} />
      </Switch>
      </Router>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
      {/* "Made with Runable" badge - if user asks to remove the runable badge, remove this code as well as comment */}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;
