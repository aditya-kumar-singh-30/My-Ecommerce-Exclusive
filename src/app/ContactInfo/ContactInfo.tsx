'use client'

import Link from "next/link"
import React, { useState } from "react"
import Image from "next/image"
import emailjs from "@emailjs/browser"
import toast, { Toaster } from "react-hot-toast"

export default function ContactInfo() {
  const [name, setName] = useState("")
  const [mail, setMail] = useState("")
  const [contact, setContact] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
   
    emailjs.send("service_fjzkoy6", "template_y5g4cze", {
      from_name: name,
      to_name: 'Aditya',
      from_email: mail,
      to_email: 'developer.aditya1@gmail.com',
      message: [message, "------------", contact, "----------", mail],
    }, "FRLy8YNjtxqqNFSum")
      .then(() => {
        toast.success('Thank you. We will get back to you as soon as possible.')
        setName("")
        setMail("")
        setContact("")
        setMessage("")
      }, (error) => {
        console.log(error)
        toast.error('Something went wrong.')
      })
  }
  
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
      <Toaster />
      <div className="mb-8 md:mb-12">
        <p className="text-sm text-gray-600">
          <Link href="/" className="opacity-50 hover:opacity-100 transition-opacity">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Contact</span>
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="lg:w-1/3 bg-white shadow-lg rounded-lg p-6 lg:p-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Image src="/Contact-images/call.png" alt="Call icon" width={24} height={24} />
              <p className="text-lg font-medium">Call To Us</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm">We are available 24/7, 7 days a week.</p>
              <p className="text-sm">
                Phone:
                <a href="tel:+8801611112222" className="text-blue-700 hover:underline ml-1">
                  +8801611112222
                </a>
              </p>
            </div>
          </div>
          <hr className="my-6 border-gray-200" />
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/Contact-images/mail.png" alt="Mail icon" width={24} height={24} />
              <p className="text-lg font-medium">Write To Us</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm">
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p className="text-sm">
                Email:
                <a href="mailto:customer@exclusive.com" className="text-blue-700 hover:underline ml-1">
                  customer@exclusive.com
                </a>
              </p>
              <p className="text-sm">
                Email:
                <a href="mailto:support@exclusive.com" className="text-blue-700 hover:underline ml-1">
                  support@exclusive.com
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-2/3 bg-white shadow-lg rounded-lg p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                className="flex-1 p-3 bg-gray-100 rounded-md outline-none"
                placeholder="Your Name *"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="flex-1 p-3 bg-gray-100 rounded-md outline-none"
                placeholder="Your Email *"
                required
                type="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
              <input
                className="flex-1 p-3 bg-gray-100 rounded-md outline-none"
                placeholder="Your Phone *"
                required
                type="tel"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <textarea
              className="w-full h-40 p-3 bg-gray-100 rounded-md outline-none resize-none"
              placeholder="Your message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}