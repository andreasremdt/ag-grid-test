"use client";

import SubmissionTable from "@/components/submission-table/submission-table";
import { useAppContext } from "@/lib/app-context";

export default function Page() {
  const { bookmarks } = useAppContext();

  return <SubmissionTable bookmarks={bookmarks} />;
}
