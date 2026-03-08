import JournalFilter from "./JournalFilter";
import { journalPosts } from "@/content/journal";
import JournalHeader from "./JournalHeader";
import Navbar from "@/components/navbar/Navbar";

export const metadata = {
  title: "Journal | Weylor",
  description:
    "Essays on slow fashion, natural fabrics, sustainability, and timeless wardrobes. Explore the philosophy of clothing, craft, and conscious living from Weylor.",
};

export default function JournalPage() {
  return (
    <>
    <Navbar/>

    <main className="max-w-7xl mx-auto px-6 py-28">

      <JournalHeader/>

      {/* Client Filter */}
      <JournalFilter posts={journalPosts} />

    </main>
    </>
  );
}