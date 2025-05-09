import { useContext } from "react";
import {
  ThemeProviderContext,
  ThemeProviderState,
} from "@/contexts/theme-context";

export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
