"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Navigation, Phone, Mail, X } from "lucide-react"
import { branchLocations } from "@/lib/branchLocatorModule"
 
export function MapPlaceholder() {
  const [selected, setSelected] = useState(branchLocations[0])
  const [showDirectionModal, setShowDirectionModal] = useState(false)

  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const markerRef = useRef(null)

  // Load Google Maps script dynamically
  const loadGoogleMapsScript = (callback) => {
    if (typeof window === "undefined") return

    if (window.google) {
      callback()
      return
    }

    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`
    script.async = true
    script.defer = true
    script.onload = callback
    document.head.appendChild(script)
  }

  // Initialize map
  useEffect(() => {
    loadGoogleMapsScript(() => {
      if (mapRef.current) {
        mapInstance.current = new window.google.maps.Map(mapRef.current, {
          center: { lat: selected.lat, lng: selected.lng },
          zoom: 15,
        })

        markerRef.current = new window.google.maps.Marker({
          position: { lat: selected.lat, lng: selected.lng },
          map: mapInstance.current,
        })
      }
    })
  }, [])

  // Update marker and map center when selected location changes
  useEffect(() => {
    if (mapInstance.current && markerRef.current) {
      const newPos = { lat: selected.lat, lng: selected.lng }
      mapInstance.current.setCenter(newPos)
      markerRef.current.setPosition(newPos)
    }
  }, [selected])

  // Modal handlers
  const handleGetDirections = () => setShowDirectionModal(true)
  const handleCancelDirections = () => setShowDirectionModal(false)
  const handleConfirmDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`
    window.open(url, "_blank", "noopener,noreferrer")
    setShowDirectionModal(false)
  }

  return (
    <section className="relative bg-slate-50 flex flex-col items-center justify-center py-10 px-4 rounded-lg shadow-sm">
      {/* Title */}
      <div className="text-center mb-6">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 mb-3 rounded-2xl bg-blue-100 flex items-center justify-center">
            <MapPin className="w-8 h-8 text-[#0372b9]" />
          </div>
          <h3 className="text-2xl font-bold text-[#0372b9] mb-2">
            Our Locations
          </h3>
          <p className="text-gray-600 max-w-md">
            Find Prime Dialysis Center branches near you. Choose a location below to view on the map.
          </p>
        </div>
      </div>

      {/* Dropdown */}
      <div className="mb-6 w-full max-w-sm relative">
  <select
    className="w-full appearance-none border border-gray-300 rounded-lg p-3 pr-10 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#3ab54a] focus:border-[#3ab54a] shadow-sm transition-all"
    value={selected.name}
    onChange={(e) =>
      setSelected(branchLocations.find((loc) => loc.name === e.target.value))
    }
  >
    {branchLocations.map((loc) => (
      <option key={loc.name} value={loc.name}>
        {loc.name}
      </option>
    ))}
  </select>

  {/* Dropdown Icon */}
  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
    <svg
      className="h-4 w-4 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>


     {/* Map With Floating Info Card */}
    <div className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-md border border-gray-200">
      <div ref={mapRef} className="w-full h-full"></div>

      {/* Floating Card */}
      <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-md shadow-xl rounded-lg p-3 w-64 sm:w-56 border border-gray-200 text-sm hidden md:block">
        <img
          src={selected.image}
          alt={selected.name}
          className="w-full h-24 object-cover rounded-lg mb-2"
        />

        <h4 className="text-base font-semibold truncate">{selected.name}</h4>
        <p className="text-gray-600 mt-1 truncate">{selected.address}</p>
        <p className="text-gray-700 mt-1 truncate flex items-center gap-1">
          <Phone className="w-4 h-4 text-gray-600" />
          <a href={`tel:${selected.phone}`} className="hover:underline">
            {selected.phone}
          </a>
        </p>

        <p className="text-gray-700 truncate flex items-center gap-1">
          <Mail className="w-4 h-4 text-gray-600" />
          <a
            href={`https://mail.google.com/mail/?view=cm&to=${selected.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {selected.email}
          </a>
        </p>


        {/* Get Directions Button */}
        <button
          onClick={handleGetDirections}
          className="mt-2 w-full flex items-center justify-center gap-1.5 bg-[#0372b9] hover:bg-[#0265a6] text-white px-3 py-1.5 rounded-md font-semibold text-sm"
        >
          <Navigation className="w-3 h-3" />
          Directions
        </button>
      </div>
    </div>

    {/* Card for Mobile below Map */}
    <div className="md:hidden mt-3 bg-white/95 backdrop-blur-md shadow-xl rounded-lg p-3 border border-gray-200 text-sm w-[330px]">
      <img
        src={selected.image}
        alt={selected.name}
        className="w-full h-24 object-cover rounded-lg mb-2"
      />

      <h4 className="text-base font-semibold truncate">{selected.name}</h4>
      <p className="text-gray-600 mt-1 truncate">{selected.address}</p>
      <p className="text-gray-700 mt-1 truncate flex items-center gap-1">
      <Phone className="w-4 h-4 text-gray-600" />
      <a href={`tel:${selected.phone}`} className="hover:underline">
        {selected.phone}
      </a>
    </p>
    <p className="text-gray-700 truncate flex items-center gap-1">
  <Mail className="w-4 h-4 text-gray-600" />
  <a
    href={`https://mail.google.com/mail/?view=cm&to=${selected.email}`}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline"
  >
    {selected.email}
  </a>
</p>

      <button
        onClick={handleGetDirections}
        className="mt-2 w-full flex items-center justify-center gap-1.5 bg-[#0372b9] hover:bg-[#0265a6] text-white px-3 py-1.5 rounded-md font-semibold text-sm"
      >
        <Navigation className="w-3 h-3" />
        Directions
      </button>
    </div>
 


      {/* Direction Confirmation Modal */}
      {showDirectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Leave Site?</h3>
              <button
                onClick={handleCancelDirections}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              You are about to be redirected to Google Maps. Continue?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancelDirections}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDirections}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Continue to Google Maps
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
