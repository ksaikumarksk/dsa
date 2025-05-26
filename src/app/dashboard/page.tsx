"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpen, ChevronRight, LogOut } from "lucide-react"

const dsaTopics = [
  {
    id: "arrays",
    title: "Arrays",
    description: "Basic data structure for storing elements of the same type",
    problemCount: 15,
    completedCount: 0,
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    description: "Linear data structure where elements are not stored in contiguous memory",
    problemCount: 12,
    completedCount: 0,
  },
  {
    id: "stacks",
    title: "Stacks",
    description: "LIFO (Last In First Out) data structure",
    problemCount: 8,
    completedCount: 0,
  },
  {
    id: "queues",
    title: "Queues",
    description: "FIFO (First In First Out) data structure",
    problemCount: 7,
    completedCount: 0,
  },
  {
    id: "trees",
    title: "Trees",
    description: "Hierarchical data structure with a root value and subtrees of children",
    problemCount: 18,
    completedCount: 0,
  },
  {
    id: "graphs",
    title: "Graphs",
    description: "Non-linear data structure consisting of nodes and edges",
    problemCount: 14,
    completedCount: 0,
  },
  {
    id: "sorting",
    title: "Sorting Algorithms",
    description: "Algorithms for arranging elements in a specific order",
    problemCount: 10,
    completedCount: 0,
  },
  {
    id: "searching",
    title: "Searching Algorithms",
    description: "Algorithms for finding an element in a data structure",
    problemCount: 6,
    completedCount: 0,
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    description: "Method for solving complex problems by breaking them down into simpler subproblems",
    problemCount: 20,
    completedCount: 0,
  },
  {
    id: "greedy",
    title: "Greedy Algorithms",
    description: "Algorithms that make locally optimal choices at each stage",
    problemCount: 9,
    completedCount: 0,
  },
]

export default function Dashboard() {

  const router = useRouter()
  const [user, setUser] = useState('')
  const [topics, setTopics] = useState(dsaTopics)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch("/api/verify")
        const data = await response.json()
        setUser(data.data.email)
        console.log("data>>>", data.data.email )
        if (!response.ok) {
          router.push("/login")
          return
        }
        
      } catch (error) {
        console.error("Auth verification error:", error)
        // router.push("/login")
      } finally {
        setLoading(false)
      }
    }
    verifyAuth()
    

    const storedProgress = localStorage.getItem("userProgress")
    if (storedProgress) {
      const progress = JSON.parse(storedProgress)
      setTopics(
        topics.map((topic) => ({
          ...topic,
          completedCount: progress[topic.id] ? progress[topic.id].length : 0,
        })),
      )
    }

    setLoading(false)
  }, [])

  const handleLogout = async() => {
    try {
      await fetch("/api/logout", { method: "POST" })
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
      router.push("/login")
    }
    router.push("/login")
  }

  console.log("usersss>>>", user)

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-slate-800 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-slate-800 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold">
            DSA Learning Tracker
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm hidden md:inline-block">Welcome, { user}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-md text-sm"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline-block">Logout</span>
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your DSA Learning Dashboard</h1>
          <p className="text-gray-600">Track your progress through various Data Structures and Algorithms topics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/topics/${topic.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-bold">{topic.title}</h2>
                  <BookOpen className="text-slate-700" size={20} />
                </div>
                <p className="text-gray-600 mb-4 text-sm">{topic.description}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="font-medium">{topic.completedCount}</span>
                    <span className="text-gray-500"> / {topic.problemCount} completed</span>
                  </div>
                  <ChevronRight className="text-slate-500" size={18} />
                </div>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-slate-600 h-2 rounded-full"
                    style={{ width: `${(topic.completedCount / topic.problemCount) * 100}%` }}
                  ></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <footer className="bg-slate-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>{new Date().getFullYear()} DSA Learning Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
