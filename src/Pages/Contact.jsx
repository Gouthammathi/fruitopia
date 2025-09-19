import React from 'react'

const Contact = () => {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold">Contact Us</h2>
        <p className="text-gray-600">We would love to hear from you. Send us a message.</p>
      </div>
      <form className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none" placeholder="Jane" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none" placeholder="Doe" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none" placeholder="you@email.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea rows={4} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none" placeholder="How can we help?" />
        </div>
        <button type="button" className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700">Send Message</button>
      </form>
    </div>
  )
}

export default Contact