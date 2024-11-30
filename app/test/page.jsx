"use client"

import instance from '@/axiosInstance'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function page() {
    
    async function testApi(){
        const response = await instance.post('/test',{
          username:'albinshiju',
          id:'158'
        })
        console.log(response);
        
    }
  return (
    <div className='text-white'>
    <div>
        <Button > 
            <div onClick={testApi}>
            test api
            </div>
        </Button>
        </div></div>
  )
}
