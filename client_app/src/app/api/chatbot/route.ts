import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chatbot/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      throw new Error(`Flask API responded with status: ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error proxying to Flask API:', error)
    
    // Return error response
    return NextResponse.json(
      { 
        error: 'Failed to connect to chatbot service',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 500,
      }
    )
  }
}
