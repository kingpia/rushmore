import React from "react";
import { Providers } from "./providers/Providers";
import { AppStackContainer } from "./nav/containers/AppStackContainer";

export default function App() {
  return (
    <Providers>
      <AppStackContainer />
    </Providers>
  );
}
