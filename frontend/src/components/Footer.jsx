import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useState } from "react";

// Add this to your Footer component
export default function Footer() {
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
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
          message: "Thank you for subscribing!",
        });
        form.reset();
      } else {
        setFormStatus({
          type: "error",
          message: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };



  const links = [
    { label: "About us", path: "/about" },
    { label: "What we do", path: "/what-we-do" },
    { label: "Our campaigns", path: "/campaigns" },
    { label: "Careers", path: "/careers" },
    { label: "Blog", path: "/blog" },
    { label: "Contact us", path: "/contact" },
    { label: "Privacy Policy", path: "/privacy" },
  ];

  return (
    <footer className="bg-white rounded-t-3xl mt-20">
      <div className="max-w-[80%] mx-auto px-6 py-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <img
                src="/images/Chanja-Logo.png"
                alt="Chanja Datti"
                className="h-10"
              />
            </div>

            <p className="text-sm text-gray-600 mt-4 max-w-xs">
              Abuja’s home of waste recycling and leader in Nigeria’s green
              revolution.
            </p>

            {/* Address Box */}
            <div className="mt-6 bg-[#E9F3D6]   p-4 text-sm text-gray-700">
              <p className="font-semibold text-[#5A7C2E]">
                Main Office Address
              </p>
              <p className="mt-1">
                Plot 833, Durumi District Phase II, <br />
                Abuja, FCT, Nigeria
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              Contact Info
            </h4>

            <p className="text-sm text-gray-600">
              Call us
            </p>
            <p className="text-sm font-medium text-gray-900">
              (+234) 818 238 9100
            </p>
            <p className="text-xs text-green-600 mb-4">
              Available 24hrs
            </p>

            <p className="text-sm text-gray-600">
              Email us
            </p>
            <p className="text-sm font-medium text-gray-900">
              info@chanjadatti.com
            </p>
          </div>

          {/* Quick Links */}
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              Quick Links
            </h4>

            <ul className="space-y-3 text-sm text-gray-600">
              {links.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-2 group"
                  >
                    <span className="text-[#9DB36B] transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>

                    <span className="group-hover:text-[#9DB36B] transition-colors">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              Subscribe to our Newsletter
            </h4>

      <div>
        {/* Success/Error Message */}
        {formStatus.message && (
          <div
            className={`mb-2 p-2 rounded text-sm ${
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
          onSubmit={handleNewsletterSubmit}
          className="flex items-center border rounded-md overflow-hidden"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your Email"
            className="w-full px-3 py-2 text-sm outline-none"
          />

          {/* ⭐ Identify source */}
          <input type="hidden" name="formType" value="newsletter-footer" />

          {/* ⭐ Optional anti spam */}
          <input
            type="text"
            name="_gotcha"
            style={{ display: "none" }}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#9DB36B] px-4 py-2 text-white hover:bg-[#86A85C] disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isSubmitting ? "..." : "→"}
          </button>
        </form>
      </div>

            {/* Social */}
            <div className="flex items-center gap-4 mt-6 text-gray-600">
              <span className="text-sm">Follow:</span>

              <a
                href="https://www.facebook.com/chanjadattirecycling?_rdc=1&_rdr#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex p-1"
              >
                <Facebook className="h-4 w-4 hover:text-[#9DB36B]" />
              </a>
              <a
                href="https://www.instagram.com/chanjadatti"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex p-1"
              >
                <Instagram className="h-4 w-4 hover:text-[#9DB36B]" />
              </a>
              <a
                href="https://x.com/chanjadattiltd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex p-1"
              >
                <Twitter className="h-4 w-4 hover:text-[#9DB36B]" />
              </a>


            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-12 pt-6 text-center text-sm text-gray-500">
          © Copyright {new Date().getFullYear()} Chanja Datti Co. Ltd.
          All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
