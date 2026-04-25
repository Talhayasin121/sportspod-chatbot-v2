import ChatWidget from "@/components/ChatWidget";

export default function WidgetPage() {
  return (
    <main className="min-h-screen bg-transparent flex items-end justify-end">
      <ChatWidget standalone />
    </main>
  );
}
