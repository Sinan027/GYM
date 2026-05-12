const Blog = require("../models/Blog");

const getImageUrl = (req) => {
  if (req.file) {
    if (req.file.path.startsWith("http")) return req.file.path;
    return `http://localhost:5000/uploads/${req.file.filename}`;
  }
  return req.body.imageUrl || undefined;
};

// CREATE
exports.createBlog = async (req, res) => {
  try {
    const { title, content, author, videoUrl } = req.body;

    const blog = await Blog.create({
      title,
      content,
      author,
      videoUrl,
      image: getImageUrl(req), 
    });

    res.json(blog);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// GET ALL
exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
};

// UPDATE
exports.updateBlog = async (req, res) => {
  let updateData = { ...req.body };
  const imageUrl = getImageUrl(req);
  if (imageUrl) {
    updateData.image = imageUrl;
  }

  const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  });
  res.json(blog);
};

// DELETE
exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ msg: "Blog deleted" });
};