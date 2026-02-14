import React, { useEffect, useState } from "react";
import "./src/i18n";
import { initLangFromStorage } from "./src/i18n";
import { AppProviders } from "./src/AppProviders";
import { AppNavigator } from "./src/navigation/AppNavigator";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await initLangFromStorage();
      setReady(true);
    })();
  }, []);

  if (!ready) return null;

  return (
    <AppProviders>
      <AppNavigator />
    </AppProviders>
  );
}