import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axiosConfig";
import { Link } from "react-router-dom";
import Loading from "../components/Loading"; // ⭐ ADD

export default function BlogDetail() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [others, setOthers] = useState([]);
  const [loading, setLoading] = useState(true); // ⭐ ADD

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const [blogRes, othersRes] = await Promise.all([
          api.get(`/api/blogs/${id}`),
          api.get("/api/blogs"),
        ]);

        setBlog(blogRes.data);
        setOthers(othersRes.data.slice(0, 2));
      } catch (error) {
        console.error("Failed to fetch blog detail");
      } finally {
        setLoading(false); // ⭐ IMPORTANT
      }
    };

    fetchBlogData();
  }, [id]);

  /* ⭐ LOADING FIRST */
  if (loading) return <Loading />;

  /* ⭐ SAFETY */
  if (!blog) {
    return (
      <div className="py-20 text-center">
        Blog not found
      </div>
    );
  }


  return (
    <section className="py-16 max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(blog.publishedAt).toDateString()}
      </p>

<div
  className="prose max-w-none mb-10"
  dangerouslySetInnerHTML={{ __html: blog.content }}
/>


      <hr className="my-10" />

      <h3 className="text-xl font-semibold mb-6">You might also like</h3>

<div className="grid md:grid-cols-2 gap-8">
  {others.map((b) => (
    <div key={b._id}>
      <img src={b.image} className="mb-3 rounded" />
      <h4 className="font-semibold mb-1">{b.title}</h4>
      <p className="text-sm text-gray-600 mb-3">{b.excerpt}</p>

      <Link
        to={`/blog/${b._id}`}
        className="text-[#7BA717] font-medium hover:underline"
      >
        Read more →
      </Link>
    </div>
  ))}
</div>

    </section>
  );
}
