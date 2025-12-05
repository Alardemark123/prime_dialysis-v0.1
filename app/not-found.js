"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-[#0372b9]/10 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          {/* 404 Illustration */}
          <div className="relative mb-12">
            <div className="text-[12rem] sm:text-[16rem] font-extrabold text-[#0372b9]/10 leading-none select-none">
              404
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#0372b9] mb-6">
            Oops! Page Not Found
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or may have been moved.
            Don’t worry, we’ll help you find what you’re looking for.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {/* Home Button */}
            <Button
              size="lg"
              className="bg-[#0372b9] hover:bg-[#025a94] text-white transition-colors"
              asChild
            >
              <Link href="/">
                <Home className="mr-2 w-5 h-5" />
                Go Home
              </Link>
            </Button>

            {/* Back Button */}
            <Button
              size="lg"
              variant="outline"
              className="border-[#3ab54a] text-[#3ab54a] hover:bg-[#3ab54a] hover:text-white transition-colors"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
