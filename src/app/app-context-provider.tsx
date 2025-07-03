"use client";

import type { CustomView } from "@/components/table";
import AppContext from "@/lib/app-context";
import { useState, type ReactNode } from "react";

export default function AppContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [liveUpdates, setLiveUpdates] = useState<boolean>(() => {
    return localStorage.getItem("live-updates") === "true";
  });
  const [columnHeadersInCode, setColumnHeadersInCode] = useState<boolean>(
    () => {
      return localStorage.getItem("column-headers") === "true";
    }
  );
  const [customViewQuickActions, setCustomViewQuickActions] = useState<boolean>(
    () => {
      return localStorage.getItem("custom-view-quick-actions") === "true";
    }
  );
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const items = localStorage.getItem("bookmarks");

    if (items) {
      return JSON.parse(items);
    }

    return [];
  });
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

  function toggleLiveUpdates() {
    const newValue = !liveUpdates;

    setLiveUpdates(newValue);

    localStorage.setItem("live-updates", String(newValue));
  }

  function toggleColumnHeadersInCode() {
    const newValue = !columnHeadersInCode;

    setColumnHeadersInCode(newValue);

    localStorage.setItem("column-headers", String(newValue));
  }

  function toggleCustomViewQuickActions() {
    const newValue = !customViewQuickActions;

    setCustomViewQuickActions(newValue);

    localStorage.setItem("custom-view-quick-actions", String(newValue));
  }

  function updateBookmarks(selection: object[]) {
    const ids = selection.map((s) => s.sub_id);

    const toAdd = ids.filter((id) => !bookmarks.includes(id));
    const toDelete = ids.filter((id) => bookmarks.includes(id));

    const cleanedBookmarks = bookmarks.filter((b) => toDelete.includes(b));
    const updatedBookmarks = [...cleanedBookmarks, ...toAdd];

    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  }

  return (
    <AppContext.Provider
      value={{
        customViews,
        liveUpdates,
        columnHeadersInCode,
        customViewQuickActions,
        bookmarks,
        updateBookmarks,
        toggleLiveUpdates,
        toggleColumnHeadersInCode,
        toggleCustomViewQuickActions,
        onCreateCustomView,
        onSaveCustomView,
        onDeleteCustomView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
