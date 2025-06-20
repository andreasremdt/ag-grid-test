"use client";

import { CustomView } from "@/components/table/types";
import AppContext from "@/lib/app-context";
import { useState, type ReactNode } from "react";

export default function AppContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [customViews, setCustomViews] = useState<CustomView[]>(() => {
    const items = localStorage.getItem("test.custom-views");

    if (items) {
      return JSON.parse(items);
    }

    return [];
  });

  function applyChangesToState(changedCustomViews: CustomView[]) {
    setCustomViews(changedCustomViews);

    localStorage.setItem(
      "test.custom-views",
      JSON.stringify(changedCustomViews)
    );
  }

  function onCreateCustomView(newCustomView: CustomView) {
    const updatedCustomViews = [...customViews, newCustomView];

    applyChangesToState(updatedCustomViews);
  }

  function onSaveCustomView(savedCustomView: CustomView) {
    const updatedCustomViews = customViews.map((customView) => {
      if (customView.id === savedCustomView.id) {
        return savedCustomView;
      }

      return customView;
    });

    applyChangesToState(updatedCustomViews);
  }

  function onDeleteCustomView(deletedCustomView: CustomView) {
    const updatedCustomViews = customViews.filter((customView) => {
      return customView.id !== deletedCustomView.id;
    });

    applyChangesToState(updatedCustomViews);
  }

  return (
    <AppContext.Provider
      value={{
        customViews,
        onCreateCustomView,
        onSaveCustomView,
        onDeleteCustomView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
