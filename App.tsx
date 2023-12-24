import React from "react";
import { Providers } from "./providers/Providers";
import { RushmoreStackContainer } from "./navigation/RushmoreStackContainer";

export default function App() {
  return (
    <Providers>
      <RushmoreStackContainer />
    </Providers>
  );
}
