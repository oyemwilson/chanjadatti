import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../utils/axiosConfig";
import Loading from "../components/Loading"; // ⭐ ADD

const ITEMS_PER_PAGE = 4;

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true); // ⭐ ADD

  /* ---------- FETCH BLOGS ---------- */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await api.get("/api/blogs");
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs");
      } finally {
        setLoading(false); // ⭐ IMPORTANT
      }
    };

    fetchBlogs();
  }, []);

  /* ---------- LOADING FIRST ---------- */
  if (loading) return <Loading />;

  /* ---------- PAGINATION LOGIC ---------- */
  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;

  const currentBlogs = blogs.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goPrev = () => setPage((p) => Math.max(p - 1, 1));
  const goNext = () => setPage((p) => Math.min(p + 1, totalPages));
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* BLOG GRID */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {currentBlogs.map((blog) => (
            <div key={blog._id} className="min-w-0">
              <img
                src={blog.image}
                className="h-[260px] w-full object-cover mb-4 rounded"
                alt={blog.title}
              />

              <p className="text-sm text-gray-500 mb-1">
                {new Date(blog.publishedAt).toDateString()}
              </p>

              <h3 className="text-xl font-semibold mb-2 break-words">
                {blog.title}
              </h3>

              <p className="text-gray-600 mb-4 line-clamp-3 break-words">
                {blog.excerpt}
              </p>

              <Link
                to={`/blog/${blog._id}`}
                className="inline-block bg-[#7BA717] text-white px-4 py-2 rounded"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>


        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            {/* Prev */}
            <button
              onClick={goPrev}
              disabled={page === 1}
              className={`w-9 h-9 flex items-center justify-center rounded
                ${page === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#7BA717] text-white"
                }`}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-9 h-9 flex items-center justify-center rounded font-medium
                  ${page === i + 1
                    ? "bg-[#7BA717] text-white"
                    : "bg-[#F0F9E3] text-black hover:bg-[#7BA717] hover:text-white"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={goNext}
              disabled={page === totalPages}
              className={`w-9 h-9 flex items-center justify-center rounded
                ${page === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#7BA717] text-white"
                }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
