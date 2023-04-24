import React from 'react'

// chakra ui
import { Spinner } from '@chakra-ui/react'

// styles
import './loading.css'

export default function Loading() {
  return (
    <div className="loading-page-container">
        <h1>MANTRA SEEDS</h1>
        <Spinner 
        emptyColor='gray.200'
        color='#669C54'
        style={{
            width: "4rem", // Custom width
            height: "4rem", // Custom height
          }}
        />
    </div>
  )
}
