import { NextResponse } from "next/server"

const topics = [
  {
    id: "arrays",
    title: "Arrays",
    description: "Basic data structure for storing elements of the same type",
    problemCount: 15,
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    description: "Linear data structure where elements are not stored in contiguous memory",
    problemCount: 12,
  },
]

export async function GET() {
  try {
    return NextResponse.json({ topics })
  } catch (error) {
    console.error("Error fetching topics:", error)
    return NextResponse.json({ error: "Failed to fetch topics" }, { status: 500 })
  }
}
