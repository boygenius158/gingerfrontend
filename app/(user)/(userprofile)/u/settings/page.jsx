import MiniProfile from '@/components/MiniProfile'
import Premium from '@/components/Premium'
import Settings from '@/components/Settings'
import React from 'react'

export default function page() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto">
        <section className="md:col-span-2 ">
          {/* <Posts /> */}
          <Settings/>
          

        </section>

        <section className="hidden md:inline-grid  md:col-span-1">
          <div className="fixed w-[380px]">
            {/* <Sidebar/> */}
            <MiniProfile />
          </div>
        </section>
      </main>
  )
}
