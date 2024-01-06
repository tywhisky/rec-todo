import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Theme className="h-full">
    <App />
  </Theme>
);
