'use client'

import { useEffect, useState } from "react";
import { MagnifyingGlass } from "lucide-react";

export default function CareersPage() {
  const [careers, setCareers] = useState([]);
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState("All");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    // Fetch careers from your API
    const fetchCareers = async () => {
      try {
        const res = await fetch(`/api/careers`);
        const data = await res.json();
        setCareers(data.careers);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCareers();
  }, []);

  useEffect(() => {
    let temp = [...careers];

    // Filter by position
    if (positionFilter !== "All") {
      temp = temp.filter((c) => c.position.includes(positionFilter));
    }

    // Search filter
    if (search) {
      temp = temp.filter((c) =>
        c.position.toLowerCase().includes(search.toLowerCase()) ||
        c.department.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(temp);
  }, [careers, search, positionFilter]);

  return (
    <section className="py-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0372b9] mb-4">
            Join Our <span className="text-[#3ab54a]">Team</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We are always looking for passionate individuals to help us deliver
            quality healthcare. Explore our open positions below.
          </p>
        </div>

        {/* Search / Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by position or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0372b9] focus:outline-none"
            />
            <MagnifyingGlass className="absolute right-3 top-3 text-slate-400" size={20} />
          </div>
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0372b9] focus:outline-none"
          >
            <option>All</option>
            <option>Medical</option>
            <option>Nursing</option>
            <option>Admin</option>
            <option>Support</option>
          </select>
        </div>

        {/* Career Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length === 0 && (
            <p className="text-center text-slate-500 col-span-full">
              No positions found.
            </p>
          )}

          {filtered.map((career) => (
            <div
              key={career.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200"
            >
              <h3 className="text-xl font-bold text-[#0372b9] mb-2">
                {career.position}
              </h3>
              <p className="text-slate-500 text-sm mb-4">
                {career.department} | {career.location}
              </p>
              <p className="text-slate-600 mb-4">{career.description}</p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                {career.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
              <button className="mt-6 w-full bg-[#0372b9] text-white py-2 rounded-xl hover:bg-[#3ab54a] transition-colors">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
