"use client";

import { useState } from "react";
import Link from "next/link";

export default function JournalFilter({ posts }) {
  const [activeTag, setActiveTag] = useState("all");

  // collect all unique tags
  const allTags = [
    "all",
    ...new Set(posts.flatMap((post) => post.tags)),
  ];

  // filter posts
  const filteredPosts =
    activeTag === "all"
      ? posts
      : posts.filter((post) =>
          post.tags.includes(activeTag)
        );

  return (
    <>
      {/* TAG FILTER */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-5 py-2 rounded-full text-sm transition
              ${
                activeTag === tag
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-neutral-200 dark:bg-neutral-800"
              }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* POSTS GRID */}
<div key={activeTag} className="grid md:grid-cols-3 gap-12">        {filteredPosts.map((post) => (
<Link key={`post-${post.slug}`} href={`/journal/${post.slug}`}>            <article className="cursor-pointer group">

              <img
                src={post.image}
                alt={post.title}
                className="w-full h-72 object-cover mb-4 rounded-lg group-hover:opacity-90 transition"
              />

              <h2 className="text-xl font-serif mb-2 group-hover:underline">
                {post.title}
              </h2>

              <p className="opacity-70 text-sm">
                {post.description}
              </p>

            </article>
          </Link>
        ))}
      </div>
    </>
  );
}