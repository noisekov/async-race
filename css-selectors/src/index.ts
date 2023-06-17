import "./index.scss";
import App from "./modules/app";

import hlts from "../node_modules/highlight.js/lib/common";
import "../node_modules/highlight.js/scss/atom-one-dark-reasonable.scss";
hlts.initHighlightingOnLoad();

new App();
