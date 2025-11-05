import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


function App() {
  const [fees, setFees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    course: "",
    intake: "",
    consent: false,
  });
  const [msg, setMsg] = useState("");

  const FEES_API =
    "https://raw.githubusercontent.com/Udit0776/webdev-assessment/refs/heads/main/mdu.json";
  const PIPEDREAM_URL = "https://eod52emokaumq2r.m.pipedream.net";

  useEffect(() => {
    if (showModal) {
      fetch(FEES_API)
        .then((res) => res.json())
        .then((data) => setFees(data.courses))
        .catch(() => setFees([]));
    }
  }, [showModal]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const validate = () => {
    const phoneOk = /^\d{10}$/.test(formData.phone);
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    return (
      formData.name &&
      emailOk &&
      phoneOk &&
      formData.state &&
      formData.course &&
      formData.intake &&
      formData.consent
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setMsg("Please fill all fields correctly.");
      return;
    }
    try {
      const res = await fetch(PIPEDREAM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setMsg("✅ Submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          state: "",
          course: "",
          intake: "",
          consent: false,
        });
      } else setMsg("❌ Submission failed.");
    } catch {
      setMsg("⚠️ Network error");
    }
  };

  return (
  <div className="bg-gray-100 text-gray-900 min-h-screen">
    {/* Header */}
    <header className="bg-black text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <motion.h1
          className="text-lg font-bold"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          MDU University
        </motion.h1>
        <motion.nav
          className="hidden md:flex gap-5"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <a href="#overview">Overview</a>
          <a href="#courses">Courses</a>
          <a href="#fees">Fees</a>
          <a href="#facilities">Facilities</a>
          <a href="#apply" className="bg-green-400 text-black px-3 py-1 rounded">
            Apply Now
          </a>
        </motion.nav>
      </div>
    </header>

    {/* Hero */}
    <section className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8 items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-2">
          Build your future with MDU University
        </h2>
        <p className="mb-4">
          Discover top-ranked programs, world-class facilities, and strong placement
          support for every student.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="border px-4 py-2 rounded"
          >
            Check Course-wise Fees
          </button>
          <a
            href="/brochure.pdf"
            className="border px-4 py-2 rounded"
            download
          >
            Download Brochure
          </a>
          <motion.a
            href="#apply"
            className="bg-green-400 text-black px-4 py-2 rounded"
            whilweHover={{ scale: 1.1 }}
          >
            Apply Now
          </motion.a>
        </div>
      </motion.div>

      {/* Lead Form */}
      <motion.form
        id="apply"
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-3"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h3 className="font-semibold text-lg mb-2">Apply for Admission</h3>
        {/* form fields remain same */}
        <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone (10 digits)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select State</option>
            <option>Tamil Nadu</option>
            <option>Maharashtra</option>
            <option>Karnataka</option>
          </select>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Course Interested</option>
            <option>B.Tech CSE</option>
            <option>MBA</option>
            <option>B.Des</option>
          </select>
          <select
            name="intake"
            value={formData.intake}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Intake Year</option>
            <option>2025</option>
            <option>2026</option>
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
            />
            I agree to be contacted.
          </label>
          <div className="text-sm">{msg}</div>
          <motion.button
            type="submit"
            className="w-full bg-black text-white py-2 rounded"
            whileHover={{scale: 1}}
          >
            Submit
          </motion.button>
        {/* etc. */}
      </motion.form>
    </section>

    {/* Modal with animation */}
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded p-6 w-80 sm:w-96"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold">Course-wise Fees</h4>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            <ul className="list-disc pl-5">
              {fees.length ? (
                fees.map((c, i) => (
                  <li key={i}>
                    <b>{c.name}</b>: {c.fees}
                  </li>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);


}

export default App;
