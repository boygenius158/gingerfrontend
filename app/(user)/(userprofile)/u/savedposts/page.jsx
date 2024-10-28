"use client"

import useAdminRedirect from '@/app/utils/useAdminRedirect'
import MiniProfile from '@/components/MiniProfile'
import Posts from '@/components/Posts'
import SavedPosts from '@/components/SavedPosts'
import React from 'react'

export default function Page() {
  useAdminRedirect();

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto">
        <section className="md:col-span-2">
          <SavedPosts />
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
