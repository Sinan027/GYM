import BlogCard from "./BlogCard";

export default function BlogList({ posts }) {
  return (
    <div className="grid">
      {posts.map((post, i) => (
        <BlogCard key={i} post={post} />
      ))}
    </div>
  );
}