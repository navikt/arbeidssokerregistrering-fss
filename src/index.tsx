import * as React from "react";
import * as ReactDOM from "react-dom";
import "idempotent-babel-polyfill";
import "react-app-polyfill/ie11";
import Modal from "react-modal";
import AppFss from "./app-fss";
import "./index.less";

Modal.setAppElement("#root");

if (process.env.REACT_APP_MOCK) {
  console.log("==========================");
  console.log("======== MED MOCK ========");
  console.log("==========================");

  /* ************************************************************************************** */
  /* Hotjar script som bruke i herokuapp for brukertesting */
  /* Dataen er tilgjengelig under organisasjon navlab.no i NAV hotjar */
  const s = document.createElement("script");
  const code =
    "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n" +
    "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n" +
    "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n" +
    "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n" +
    "})(window,document,'script','dataLayer','GTM-T5HQ63');\n";
  s.async = true;
  s.appendChild(document.createTextNode(code));
  document.body.appendChild(s);
  /* ************************************************************************************** */

  require("./mocks/mocks");
}

ReactDOM.render(<AppFss />, document.getElementById("root") as HTMLElement);
