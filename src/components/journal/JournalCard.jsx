import Link from "next/link";

export default function JournalCard({ post }) {
  return (
    <Link href={`/journal/${post.slug}`} className="group block">

      <div className="overflow-hidden rounded-xl">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-700"
        />
      </div>

      <div className="mt-4">
        <p className="text-xs opacity-60">{post.date}</p>

        <h2 className="text-xl font-serif mt-1 group-hover:opacity-70 transition">
          {post.title}
        </h2>

        <p className="text-sm mt-2 opacity-70">
          {post.excerpt}
        </p>
      </div>

    </Link>
  );
}