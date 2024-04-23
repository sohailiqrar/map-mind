import EmojiChart from "./components/moodTracker/EmojiChart";
import EmojiPanel from "./components/moodTracker/EmojiPanel";
import Header from "./components/Header";

export default function Home() {
  return (
    <main>
      <div>
        <Header />
        <EmojiPanel />
        <EmojiChart />
      </div>
    </main>
  );
}
