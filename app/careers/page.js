'use client'

import { useEffect, useState } from "react"
import { Search, X } from "lucide-react"
import { motion } from "framer-motion"


export const CareersList = ({ careersData }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [paginated, setPaginated] = useState([]);
    const [selectedCareer, setSelectedCareer] = useState(null);
  
    useEffect(() => {
      const t = setTimeout(() => {
        setPaginated(Array.isArray(careersData) ? careersData : []);
        setIsLoading(false);
      }, 900);
      return () => clearTimeout(t);
    }, [careersData]);
  
    const SkeletonCard = () => (
      <div className="bg-gradient-to-br from-white to-[#f9fcff] p-6 rounded-2xl border border-slate-200 shadow-sm animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-slate-200 rounded w-1/3 mb-4"></div>
        <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
        <div className="h-3 bg-slate-200 rounded w-5/6 mb-2"></div>
        <div className="h-3 bg-slate-200 rounded w-4/6 mb-6"></div>
        <div className="flex justify-between items-center">
          <div className="h-3 bg-slate-200 rounded w-1/4"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-slate-200 rounded w-20"></div>
            <div className="h-6 bg-slate-200 rounded w-20"></div>
          </div>
        </div>
      </div>
    );
  
    return (
      <div className="lg:col-span-3">
        {/* Loading skeleton */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : paginated.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-6">
            {paginated.map((career, idx) => (
              <div
                key={idx}
                className="relative bg-gradient-to-br from-white to-[#f9fcff] p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-3">
                  <h3 className="text-[16px] font-semibold text-[#0372b9] leading-snug">
                    {career.position}
                  </h3>
                  <span className="text-[12px] font-medium text-[#3ab54a] bg-[#e8f9ee] px-2.5 py-1 rounded-full mt-2 sm:mt-0 whitespace-nowrap">
                    {career.employment_type || "N/A"}
                  </span>
                </div>
  
                {/* Location */}
                <div className="flex items-center text-[13px] text-slate-500 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mr-1.5 text-[#0372b9]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M12 22s8-7.333 8-14A8 8 0 004 8c0 6.667 8 14 8 14z"
                    />
                  </svg>
                  {career.location || "Location not specified"}
                </div>
  
                {/* Description */}
                {career.description && (
                  <p className="text-slate-600 text-[13px] leading-relaxed line-clamp-3 mb-4">
                    {career.description}
                  </p>
                )}
  
                <div className="border-t border-slate-100 my-3" />
  
                {/* Footer */}
                <div className="flex justify-between items-center">
                  <span className="text-[12px] text-slate-400 italic">
                    📅 {career.postedDate || "Recently posted"}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedCareer(career)}
                      className="px-3.5 py-1.5 text-[13px] border border-[#0372b9] text-[#0372b9] rounded-lg hover:bg-[#0372b9] hover:text-white transition-all duration-200"
                    >
                      View Details
                    </button>
                    <button className="px-3.5 py-1.5 text-[13px] bg-[#0372b9] text-white rounded-lg hover:bg-[#3ab54a] transition-all duration-200">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500 py-12 border border-dashed rounded-xl">
            No available positions found.
          </div>
        )}
  
        {/* Modal */}
        {selectedCareer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
            >
              <button
                onClick={() => setSelectedCareer(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-[#0372b9] transition"
              >
                <X size={22} />
              </button>
  
              <div className="p-8 sm:p-10">
                <div className="mb-6 border-b border-slate-200 pb-4">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-[#0372b9] mb-1">
                    {selectedCareer.position}
                  </h2>
                  <p className="text-slate-500 text-sm sm:text-[15px]">
                    {selectedCareer.department || "Prime Dialysis Center Inc."} •{" "}
                    {selectedCareer.location || "Philippines"}
                  </p>
                </div>
  
                <div className="grid md:grid-cols-2 gap-10 mb-8">
                  {selectedCareer.description && (
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm mb-2">
                        Job Description
                      </h4>
                      <p className="text-slate-600 text-[13px] leading-relaxed">
                        {selectedCareer.description}
                      </p>
                    </div>
                  )}
  
                  {selectedCareer.benefits?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm mb-2">
                        Benefits
                      </h4>
                      <ul className="list-disc list-inside text-slate-600 space-y-1 text-[13px]">
                        {selectedCareer.benefits.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
  
                {selectedCareer.requirements?.length > 0 && (
                  <div className="mb-8">
                    <h4 className="font-semibold text-slate-800 text-sm mb-2">
                      Requirements
                    </h4>
                    <ul className="list-disc list-inside text-slate-600 space-y-1 text-[13px]">
                      {selectedCareer.requirements.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
  
                <div className="flex justify-end">
                  <button className="min-w-[120px] px-6 py-2.5 rounded-lg font-medium text-white bg-[#0372b9] hover:bg-[#0363a0] transition-all shadow-md hover:shadow-lg">
                    Apply Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    );
  };

export default function CareersPage() {
  const [careers, setCareers] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState("")
  const [positionFilter, setPositionFilter] = useState("All")
  const [page, setPage] = useState(1)
  const [selectedCareer, setSelectedCareer] = useState(null)
  const take = 4 // jobs per page

  // Fetch data
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await fetch(`/api/careers`);
        const data = await res.json();
        console.log("Fetched careers:", data); // debug
        setCareers(data.careers || []); // ✅ correct key name
      } catch (err) {
        console.error(err);
      }
    };
    fetchCareers();
  }, []);
  

  const positions = ["All", ...new Set(careers.map((c) => c.position))]

  // Filters
  useEffect(() => {
    let temp = [...careers]

    if (positionFilter !== "All") {
      temp = temp.filter((c) => c.position === positionFilter)
    }

    if (search) {
      const lower = search.toLowerCase()
      temp = temp.filter(
        (c) =>
          c.position.toLowerCase().includes(lower) ||
          c.description.toLowerCase().includes(lower) ||
          c.location.toLowerCase().includes(lower)
      )
    }

    setFiltered(temp)
    setPage(1)
  }, [careers, search, positionFilter])

  const totalPages = Math.ceil(filtered.length / take)
  const paginated = filtered.slice((page - 1) * take, page * take)

  return (
    <section className="relative py-20 min-h-screen text-[13px] leading-relaxed bg-cover bg-center bg-no-repeat"
        style={{
            backgroundImage: "url('/assets/backgrounds/a.jpg')", // ✅ ilagay mo image mo dito
        }}
        >
            <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px]" />


      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0372b9] mb-2">
            Career <span className="text-[#3ab54a]">Opportunities</span>
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto text-[13px]">
            Join our growing healthcare team and make an impact in your field.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 bg-white p-5 rounded-xl shadow-sm border border-slate-200 h-fit top-20 space-y-5">
  {/* Search */}
  <div>
    <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
      Search
    </label>
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-1 focus:ring-[#0372b9] outline-none text-[13px]"
      />
      <Search className="absolute right-3 top-2.5 text-slate-400" size={16} />
    </div>
  </div>

  {/* Position Filter */}
  <div>
    <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
      Position
    </label>
    <div className="relative">
      <select
        value={positionFilter}
        onChange={(e) => setPositionFilter(e.target.value)}
        className="appearance-none w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-1 focus:ring-[#0372b9] outline-none text-[13px] pr-8 bg-white cursor-pointer"
      >
        {positions.map((pos, i) => (
          <option key={i}>{pos}</option>
        ))}
      </select>

      {/* Custom dropdown icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 absolute right-3 top-3 text-slate-400 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>

  {/* Pagination */}
  <div>
    <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
      Page
    </label>
    <div className="flex items-center justify-between">
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className={`px-2.5 py-1.5 rounded-md border text-[12px] transition-all ${
          page === 1
            ? "border-slate-200 text-slate-400 cursor-not-allowed"
            : "border-slate-300 text-[#0372b9] hover:bg-slate-100"
        }`}
      >
        Prev
      </button>
      <span className="text-slate-600 text-[12px]">
        {page} / {totalPages || 1}
      </span>
      <button
        disabled={page === totalPages || totalPages === 0}
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        className={`px-2.5 py-1.5 rounded-md border text-[12px] transition-all ${
          page === totalPages || totalPages === 0
            ? "border-slate-200 text-slate-400 cursor-not-allowed"
            : "border-slate-300 text-[#0372b9] hover:bg-slate-100"
        }`}
      >
        Next
      </button>
    </div>
  </div>
          </aside>


          {/* Job Listings */}
          <CareersList careersData={paginated} />

        </div>
      </div>

     


    </section>
  )
}
