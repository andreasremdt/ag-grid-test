import { type FormEvent, type KeyboardEvent, useState } from "react";

function useInlineEditable(callback: (value: string) => void) {
  const [editing, setEditing] = useState<boolean>(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = new FormData(event.target as HTMLFormElement).get(
      "title"
    ) as string;

    if (title.trim() === "") return;

    callback(title);
    setEditing(false);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();

      (event.target as HTMLInputElement).form?.requestSubmit();
    } else if (event.key === "Escape") {
      event.preventDefault();

      setEditing(false);
    }
  }

  function onStartEditing() {
    setEditing(true);
  }

  return { editing, onStartEditing, onSubmit, onKeyDown };
}

export default useInlineEditable;
