import { createContext, useContext } from "react";
import type { CustomView } from "@/components/table";

export type AppContextState = {
  customViews: CustomView[];
  onCreateCustomView: (newCustomView: CustomView) => void;
  onSaveCustomView: (savedCustomView: CustomView) => void;
  onDeleteCustomView: (deletedCustomView: CustomView) => void;
};

const AppContext = createContext<AppContextState>({
  customViews: [],
  onCreateCustomView: () => {},
  onSaveCustomView: () => {},
  onDeleteCustomView: () => {},
});

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("The app can't be used without app context.");
  }

  return context;
}

export default AppContext;
