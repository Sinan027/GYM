export default function BlogCard({ post }) {
  return (
    <div className="card">
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
    </div>
  );
}