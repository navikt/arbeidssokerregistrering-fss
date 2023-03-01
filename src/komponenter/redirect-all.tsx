import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { RouteHerokuMock } from "../mocks/HerokuappEndreMockRegistreringLoep/herokuapp-endre-mock-registrering-loep";

interface OwnProps {
  to: string;
  component: any;
}

function RedirectAll(props: OwnProps) {
  const { to, component } = props;

  return (
    <Routes>
      {RouteHerokuMock}
      <Route element={component} />
      <Navigate to={to} replace />
    </Routes>
  );
}

export default RedirectAll;
