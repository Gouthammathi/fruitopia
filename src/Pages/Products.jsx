import React from 'react'

const Products = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold">Products</h2>
        <p className="text-gray-600">Browse our seasonal selection of fresh fruits.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
            <div className="aspect-square rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400">[Img]</div>
            <div className="flex items-center justify-between">
              <div className="font-semibold">Fruit {i + 1}</div>
              <div className="text-green-700 font-semibold">$ {(5 + (i % 5))}.99</div>
            </div>
            <button className="self-start px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700">Add To Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products