'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Send, CheckCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'

const inquiryTypes = [
  "Product Information",
  "Technical Support",
  "Sales Inquiry",
  "Partnership Opportunity",
  "Training & Certification",
  "Other"
]

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm()

  const inquiryType = watch("inquiryType")

  const onSubmit = async (data) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Form submitted:', data)
    setIsSubmitted(true)
    setIsLoading(false)
    reset()
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  if (isSubmitted) {
    return (
      <section className="bg-white flex items-center justify-center min-h-[500px] p-8">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#3ab54a]/10 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-[#3ab54a]" />
          </div>
          <h3 className="text-2xl font-bold text-[#0372b9] mb-4">
            Thank You!
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Your message has been sent successfully. Our team will get back to you within 24 hours.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white p-8 lg:p-12">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0372b9] mb-6">
          Send Us a Message
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Fill out the form below and our team will respond to your inquiry promptly. 
          All fields marked with an asterisk (*) are required.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                {...register("firstName", { 
                  required: "First name is required",
                  minLength: { value: 2, message: "First name must be at least 2 characters" }
                })}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                placeholder="Enter your last name"
                {...register("lastName", { 
                  required: "Last name is required",
                  minLength: { value: 2, message: "Last name must be at least 2 characters" }
                })}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@company.com"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address"
                  }
                })}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                {...register("phone", {
                  pattern: {
                    value: /^[\+]?[1-9][\d]{0,15}$/,
                    message: "Please enter a valid phone number"
                  }
                })}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Company and Inquiry Type */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company">Company/Organization *</Label>
              <Input
                id="company"
                placeholder="Your organization name"
                {...register("company", { 
                  required: "Company name is required",
                  minLength: { value: 2, message: "Company name must be at least 2 characters" }
                })}
                className={errors.company ? "border-red-500" : ""}
              />
              {errors.company && (
                <p className="text-sm text-red-500">{errors.company.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="inquiryType">Inquiry Type *</Label>
              <Select 
                onValueChange={(value) => setValue("inquiryType", value)}
                {...register("inquiryType", { required: "Please select an inquiry type" })}
              >
                <SelectTrigger className={errors.inquiryType ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select inquiry type" />
                </SelectTrigger>
                <SelectContent>
                  {inquiryTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.inquiryType && (
                <p className="text-sm text-red-500">{errors.inquiryType.message}</p>
              )}
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              placeholder="Brief description of your inquiry"
              {...register("subject", { 
                required: "Subject is required",
                minLength: { value: 5, message: "Subject must be at least 5 characters" }
              })}
              className={errors.subject ? "border-red-500" : ""}
            />
            {errors.subject && (
              <p className="text-sm text-red-500">{errors.subject.message}</p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              placeholder="Please provide detailed information about your inquiry..."
              rows={6}
              {...register("message", { 
                required: "Message is required",
                minLength: { value: 20, message: "Message must be at least 20 characters" }
              })}
              className={errors.message ? "border-red-500" : ""}
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}
          </div>

          {/* Newsletter */}
          <div className="flex items-start space-x-3">
            <Checkbox id="newsletter" {...register("newsletter")} />
            <Label
              htmlFor="newsletter"
              className="text-sm font-normal leading-snug cursor-pointer"
            >
              Subscribe to our newsletter for the latest updates on dialysis technology and industry insights
            </Label>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            size="lg" 
            className="w-full bg-[#0372b9] hover:bg-[#025a94] text-white transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Sending Message...
              </>
            ) : (
              <>
                Send Message
                <Send className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By submitting this form, you agree to our privacy policy and consent to being contacted 
            by our team regarding your inquiry.
          </p>
        </form>
      </div>
    </section>
  )
}