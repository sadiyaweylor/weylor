import { journalPosts } from "@/content/journal";
import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";
import ExploreButton from "@/components/ExploreButton";

/* ---------------- STATIC GENERATION ---------------- */

export function generateStaticParams() {
  return journalPosts.map((post) => ({
    slug: post.slug,
  }));
}

/* ---------------- SEO METADATA ---------------- */

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const post = journalPosts.find((p) => p.slug === slug);

  if (!post) return notFound();

  const url = `https://weylor.com/journal/${post.slug}`;

  /*Create Suggested Posts*/

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      url: url,
      type: "article",
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: post.seo.title,
      description: post.seo.description,
      images: [post.image],
    },
  };
}

/* ---------------- PAGE ---------------- */

export default async function ArticlePage({ params }) {
  const { slug } = await params;

  const post = journalPosts.find((p) => p.slug === slug);

  if (!post) return notFound();

  const relatedPosts = journalPosts
    .filter((p) => p.slug !== post.slug)
    .filter((p) => p.tags?.some((tag) => post.tags?.includes(tag)))
    .slice(0, 3);

  const articleUrl = `https://weylor.world/journal/${post.slug}`;

  return (
    <main className="max-w-6xl mx-auto px-6 py-28">
      <Navbar />
      {/* HERO SECTION */}
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE */}
        <div>
          <p className="text-sm opacity-60">{post.date}</p>

          <h1 className="text-5xl mt-4 font-serif leading-tight">
            {post.title}
          </h1>

          <div className="flex gap-3 mt-6">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="relative w-full h-[420px] rounded-xl overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover shadow-xl"
          />
        </div>
      </div>

      {/* ARTICLE BODY */}
      <div className="mx-auto mt-20">
        <div
          className="prose prose-lg dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      <div className="flex flex-wrap gap-4 mt-16">

  <ExploreButton />

  <Link
    href="/journal"
    className="text-xl mt-10 rounded-full px-10 py-4 inline-flex items-center justify-center border dark:border-white dark:text-white hover:bg-white dark:hover:text-black transition shadow-xl"
  >
    Back to Journal
  </Link>

</div>

      {/* Luxury visual seperation */}

      <hr className="my-20 border-neutral-200" />

      {/* Suggested Articles Section */}

      {relatedPosts.length > 0 && (
        <section className="mt-28">
          <h2 className="text-2xl font-serif mb-10">Read Next</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((article) => (
              <Link
                key={article.slug}
                href={`/journal/${article.slug}`}
                className="group"
              >
                <div className="relative w-full h-[220px] rounded-lg overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <h3 className="mt-4 font-medium leading-snug group-hover:underline">
                  {article.title}
                </h3>

                <p className="text-sm text-neutral-500 mt-1">{article.date}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* JSON-LD SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.seo.description,
            image: post.image,
            datePublished: post.date,
            dateModified: post.date,
            author: {
              "@type": "Organization",
              name: "Weylor",
            },
            publisher: {
              "@type": "Organization",
              name: "Weylor",
              logo: {
                "@type": "ImageObject",
                url: "https://weylor.world/logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": articleUrl,
            },
          }),
        }}
      />
    </main>
  );
}
