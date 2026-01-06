"use client";

import TypingPractice from "@/components/typing-practice";
import TypingToolbar from "@/components/typing-toolbar";

export default function Page() {
  return (
    <main className="my-6 px-6 justify-center flex flex-col items-center max-w-6xl mx-auto">
      <TypingToolbar />
      <TypingPractice />
    </main>
  );
}
