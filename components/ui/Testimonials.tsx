'use client'

import { useState, useEffect } from 'react'
import { Card } from './Card'

const testimonials = [
  {
    name: 'Priya & Rahul',
    event: 'Wedding',
    text: 'Jashn Planners made our dream wedding come true! Every detail was perfect.',
    rating: 5,
  },
  {
    name: 'Amit Sharma',
    event: 'Corporate Event',
    text: 'Professional, creative, and flawless execution. Highly recommended!',
    rating: 5,
  },
  {
    name: 'The Mehta Family',
    event: 'Goa Tour',
    text: 'An unforgettable vacation! The itinerary was perfectly planned.',
    rating: 5,
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative max-w-4xl mx-auto">
      <Card className="p-8 md:p-12">
        <div className="text-center">
          <div className="text-5xl text-[var(--color-luxury)] mb-4">★★★★★</div>
          <p className="text-xl md:text-2xl italic mb-6">"{testimonials[current].text}"</p>
          <div className="font-semibold text-lg">{testimonials[current].name}</div>
          <div className="text-sm opacity-70">{testimonials[current].event}</div>
        </div>
      </Card>
      
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? 'bg-[var(--color-primary)] w-8' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
