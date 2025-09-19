import React from 'react'
import bowlImage from '../assets/bowl.png'

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-5">
          <p className="text-xs tracking-widest text-green-600 font-semibold">FRESH FRUIT FOR YOU</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900">Eat as <br className="hidden sm:block" /> you want</h2>
          <p className="text-gray-600">Fruit and vegetables should be an important part of your daily diet. They are naturally good and contain vitamins and minerals.</p>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-full bg-green-600 text-white shadow hover:bg-green-700">Add To Cart</button>
            <button className="px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50">Learn More</button>
          </div>
        </div>
        <div className="relative">
          <img 
            src={bowlImage} 
            alt="Fresh fruits and vegetables in a wooden bowl" 
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      {/* Banana section + stats */}
      <section className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="relative">
          <div className="aspect-video w-full rounded-2xl bg-yellow-100 border border-yellow-200" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-yellow-400">[Banana Image Placeholder]</span>
          </div>
        </div>
        <div className="space-y-5">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Eat a banana for a healthy snack</h3>
          <p className="text-gray-600">You should eat at least five serves of vegetables and two serves of fruit each day. Choose different colours and varieties.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { k: '150+', l: 'Global Franchise' },
              { k: '3+', l: 'Happy Customer' },
              { k: '97%', l: 'Satisfaction' },
              { k: '10M+', l: 'Monthly Sales' },
            ].map((item) => (
              <div key={item.k} className="rounded-xl bg-white shadow-sm border border-gray-100 p-4 text-center">
                <div className="text-lg font-bold text-green-600">{item.k}</div>
                <div className="text-xs text-gray-600">{item.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purpose + grid */}
      <section className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-3">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Our purpose is to deliver fresh fruit to you</h3>
          <p className="text-gray-600">Fruits and vegetables contain many vitamins and minerals that are good for your health. These include vitamins and antioxidants.</p>
          <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
            <li>Order Your Fruit</li>
            <li>Delivery and Pickup</li>
          </ol>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400">
              [Img]
            </div>
          ))}
        </div>
      </section>

      {/* Product feature cards */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {['Cherries', 'Anabki', 'Acai Berry'].map((name) => (
          <div key={name} className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center gap-3">
            <div className="w-24 h-24 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400">[Img]</div>
            <div className="font-semibold">{name}</div>
            <div className="text-sm text-gray-500">$5 - $15 / kg</div>
            <button className="mt-2 px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700">Add To Cart</button>
          </div>
        ))}
      </section>

      {/* Newsletter */}
      <section className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-lg font-semibold">Subscribe Newsletter</div>
          <p className="text-sm text-gray-600">Vegetables are available in many varieties and are available in season.</p>
        </div>
        <form className="flex w-full sm:w-auto gap-2">
          <input className="flex-1 sm:w-72 rounded-full border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter your email" />
          <button type="button" className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700">Send</button>
        </form>
      </section>
    </div>
  )
}

export default Home