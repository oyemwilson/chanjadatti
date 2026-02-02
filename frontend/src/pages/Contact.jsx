import { useState, useEffect } from "react";
import Loading from "../components/Loading";

export default function Contact() {
  const [loading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setFormStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully.",
        });
        form.reset();
      } else {
        setFormStatus({
          type: "error",
          message: "Oops! Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "Oops! Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-[80%] mx-auto px-4 sm:px-6">

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-semibold mb-10">
          Contact <span className="text-[#9DB36B]">Us</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 rounded-xl overflow-hidden shadow-sm min-h-[650px] lg:min-h-[700px]">

          {/* ⭐ LEFT FORM */}
          <div className="bg-[#F0F9E3] p-6 sm:p-10">
            <h3 className="text-3xl font-semibold mb-6 mt-16">
              Get in touch with us
            </h3>

            {/* Success/Error Message */}
            {formStatus.message && (
              <div
                className={`mb-4 p-4 rounded-md ${
                  formStatus.type === "success"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                {formStatus.message}
              </div>
            )}

            <form
              action="https://www.formbackend.com/f/eb508c55ca0021fd"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* NAME */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Name
                </label>
                <input
                  name="name"
                  required
                  type="text"
                  className="w-full rounded-md border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9DB36B]"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Email
                </label>
                <input
                  name="email"
                  required
                  type="email"
                  className="w-full rounded-md border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9DB36B]"
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  className="w-full rounded-md border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9DB36B]"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#7BA717] hover:bg-[#8aa45e] transition text-white px-6 py-3 rounded-full text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send my message"}
              </button>

            </form>
          </div>

          {/* ⭐ RIGHT MAP */}
          <div className="relative w-full h-[600px] md:h-[400px] lg:h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.46504921734!2d7.46128177617014!3d9.021271191039737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0c9ebe102a1f%3A0xb677c740c9561526!2sChanja%20Datti%20Recycling%20Co.%20Ltd.!5e0!3m2!1sen!2sng!4v1769513556113!5m2!1sen!2sng"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Chanja Datti Location"
            />
          </div>

        </div>
      </div>
    </section>
  );
}