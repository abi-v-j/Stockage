import React from "react";
import styles from "./Blog.module.css";

const blogPosts = [
  {
    id: 1,
    title: "How to Start Investing in Stocks",
    excerpt:
      "Learn the fundamentals of stock market investing, risk control, and portfolio building.",
    author: "Admin",
    date: "Jan 12, 2026",
    tag: "Beginner",
  },
  {
    id: 2,
    title: "Top 5 Indicators Every Trader Should Know",
    excerpt:
      "Discover the most powerful technical indicators used by professional traders.",
    author: "Market Team",
    date: "Jan 18, 2026",
    tag: "Strategy",
  },
  {
    id: 3,
    title: "Long Term vs Short Term Trading",
    excerpt:
      "Understand the difference between long-term investing and short-term trading styles.",
    author: "Editor",
    date: "Jan 25, 2026",
    tag: "Guide",
  },
  {
    id: 4,
    title: "How to Read Stock Charts Easily",
    excerpt:
      "A simple guide to reading candlestick charts and price action patterns.",
    author: "Analyst",
    date: "Feb 02, 2026",
    tag: "Charts",
  },
];

const Blog = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Market Blog</h1>
        <p>Insights, guides, and trading knowledge</p>
      </div>

      <div className={styles.grid}>
        {blogPosts.map((post) => (
          <div key={post.id} className={styles.card}>
            <span className={styles.tag}>{post.tag}</span>
            <h2>{post.title}</h2>
            <p className={styles.excerpt}>{post.excerpt}</p>

            <div className={styles.meta}>
              <span>By {post.author}</span>
              <span>{post.date}</span>
            </div>

            <button className={styles.readBtn}>Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog
