import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Blog.css";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop";

const DEMO_BLOGS = [
  {
    _id: "demo1",
    title: "The Science of Progressive Overload",
    content: "Progressive overload is the gradual increase of stress placed upon the body during training. It is the single most important principle in strength and muscle development. Without consistently challenging your muscles beyond what they're accustomed to, growth stalls completely. This applies to weight, reps, sets, frequency, and even rest periods. Track every session and aim for small, consistent improvements each week.",
    author: "Coach Arjun",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    image: "",
  },
  {
    _id: "demo2",
    title: "Meal Timing: Does It Actually Matter?",
    content: "The myth that you must eat within 30 minutes of training has been largely debunked. Total daily intake of protein and calories matters far more than timing windows. That said, having a meal 1–2 hours before training can improve performance, and consuming protein within a few hours post-workout supports recovery.",
    author: "Nutritionist Priya",
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    image: "",
  },
  {
    _id: "demo3",
    title: "Why Sleep Is Your Best Recovery Tool",
    content: "Deep sleep triggers growth hormone release, repairs micro-tears in muscle tissue, and consolidates motor patterns learned during training. Athletes sleeping less than 7 hours show significantly worse performance metrics. Prioritize a consistent sleep schedule over any supplement stack.",
    author: "Dr. Meena",
    createdAt: new Date(Date.now() - 9 * 86400000).toISOString(),
    image: "",
  },
  {
    _id: "demo4",
    title: "Mobility Work: The Missing Piece",
    content: "Most gym-goers skip mobility entirely until an injury forces them to pay attention. A 10-minute daily routine targeting hips, thoracic spine, and ankles can dramatically improve squat depth, pressing mechanics, and long-term joint health. Consistency beats intensity here.",
    author: "Coach Arjun",
    createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    image: "",
  },
];

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/blogs");
      const data = Array.isArray(res.data) ? res.data : [];
      if (data.length === 0) { setBlogs(DEMO_BLOGS); setIsDemo(true); }
      else { setBlogs(data); setIsDemo(false); }
      setError("");
    } catch {
      setBlogs(DEMO_BLOGS);
      setIsDemo(true);
      setError("");
    } finally {
      setLoading(false);
    }
  };

  const getImg = (url) => url || FALLBACK_IMG;

  const featured = blogs[0] || null;
  const secondary = blogs.slice(1);

  return (
    <div className="blog-page">
      <div className="blog-container">

        {/* Header */}
        <header className="blog-header">
          <div>
            <p className="section-num">08 — BLOG</p>
            <h1 className="heavy-title">LEARN &amp; <br />GROW</h1>
          </div>
          <p className="header-desc">
            Expert-written articles on training, nutrition, recovery, and mindset.
          </p>
        </header>

        {isDemo && (
          <div className="demo-badge">⚡ DEMO MODE — showing sample articles</div>
        )}

        {loading ? (
          <div className="loading-state">Loading blogs...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : blogs.length === 0 ? (
          <div className="empty-state">No articles published yet.</div>
        ) : (
          <>
            {/* ── Featured ── */}
            {featured && (
              <section className="featured-post" onClick={() => setSelectedBlog(featured)}>
                {/* IMAGE — object-fit: contain */}
                <div className="featured-image-box">
                  <img
                    src={getImg(featured.image)}
                    alt={featured.title}
                    className="card-img card-img--contain"
                  />
                </div>

                <div className="featured-content">
                  <p className="post-category">BLOG</p>
                  <h2 className="post-title">{featured.title}</h2>
                  <p className="post-desc">{featured.content?.slice(0, 200)}...</p>
                  <div className="post-meta">
                    <span>{featured.author || "Admin"}</span>
                    <span className="meta-dot"></span>
                    <span>{new Date(featured.createdAt).toDateString()}</span>
                  </div>
                </div>
              </section>
            )}

            {/* ── Secondary grid ── */}
            {secondary.length > 0 && (
              <div className="secondary-grid">
                {secondary.map((post) => (
                  <div className="small-post-card" key={post._id} onClick={() => setSelectedBlog(post)}>
                    {/* IMAGE — object-fit: contain */}
                    <div className="small-card-top">
                      <img
                        src={getImg(post.image)}
                        alt={post.title}
                        className="card-img card-img--contain"
                      />
                    </div>

                    <div className="small-card-body">
                      <p className="post-category">BLOG</p>
                      <h3 className="small-post-title">{post.title}</h3>
                      <p className="small-post-desc">{post.content?.slice(0, 100)}...</p>
                      <span className="read-time">{new Date(post.createdAt).toDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Modal ── */}
        {selectedBlog && (
          <div className="modal-overlay" onClick={() => setSelectedBlog(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedBlog(null)}>×</button>

              {/* IMAGE — object-fit: contain inside modal */}
              <div className="modal-img-box" style={{ minHeight: selectedBlog.videoUrl ? '350px' : 'auto' }}>
                {selectedBlog.videoUrl ? (
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={selectedBlog.videoUrl.includes("watch?v=") ? selectedBlog.videoUrl.replace("watch?v=", "embed/") : selectedBlog.videoUrl} 
                    title={selectedBlog.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  ></iframe>
                ) : (
                  <img
                    src={getImg(selectedBlog.image)}
                    alt={selectedBlog.title}
                    className="card-img card-img--contain"
                  />
                )}
              </div>

              <div className="modal-body">
                <p className="post-category">BLOG</p>
                <h2 className="modal-title">{selectedBlog.title}</h2>
                <div className="modal-meta">
                  <span>{selectedBlog.author || "Admin"}</span>
                  <span style={{ margin: "0 10px" }}>•</span>
                  <span>{new Date(selectedBlog.createdAt).toDateString()}</span>
                </div>
                <div className="modal-text">{selectedBlog.content}</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Blog;
