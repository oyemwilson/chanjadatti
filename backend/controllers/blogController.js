import Blog from "../models/blogModel.js";

/* PUBLIC */
export const getBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
};

export const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.json(blog);
};

/* ADMIN */
export const createBlog = async (req, res) => {
  const { title, excerpt, content } = req.body;

  const blog = await Blog.create({
    title,
    excerpt,
    content,
    image: req.file.path, // Cloudinary
  });

  res.status(201).json(blog);
};

export const updateBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });

  blog.title = req.body.title;
  blog.excerpt = req.body.excerpt;
  blog.content = req.body.content;

  if (req.file) {
    blog.image = req.file.path;
  }

  const updated = await blog.save();
  res.json(updated);
};

export const deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
};
