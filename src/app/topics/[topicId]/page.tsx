"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, CheckCircle, Circle, ExternalLink, LogOut, Youtube } from "lucide-react"

const dsaTopicsData = {
  arrays: {
    title: "Arrays",
    description:
      "Arrays are a fundamental data structure that store elements of the same type in contiguous memory locations.",
    problems: [
      {
        id: "arrays-1",
        title: "Two Sum",
        description: "Find two numbers in an array that add up to a specific target.",
        youtubeLink: "https://www.youtube.com/watch?v=KLlXCFG5TnA",
        leetcodeLink: "https://leetcode.com/problems/two-sum/",
        articleLink: "https://www.geeksforgeeks.org/two-sum/",
        difficulty: "Easy",
      },
      {
        id: "arrays-2",
        title: "Best Time to Buy and Sell Stock",
        description: "Find the maximum profit by buying and selling a stock once.",
        youtubeLink: "https://www.youtube.com/watch?v=1pkOgXD63yU",
        leetcodeLink: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
        articleLink: "https://www.geeksforgeeks.org/stock-buy-sell/",
        difficulty: "Easy",
      },
      {
        id: "arrays-3",
        title: "Contains Duplicate",
        description: "Determine if an array contains any duplicate elements.",
        youtubeLink: "https://www.youtube.com/watch?v=3OamzN90kPg",
        leetcodeLink: "https://leetcode.com/problems/contains-duplicate/",
        articleLink: "https://www.geeksforgeeks.org/find-duplicates-in-on-time-and-constant-extra-space/",
        difficulty: "Easy",
      },
      {
        id: "arrays-4",
        title: "Product of Array Except Self",
        description: "Calculate the product of all elements except the current one without using division.",
        youtubeLink: "https://www.youtube.com/watch?v=bNvIQI2wAjk",
        leetcodeLink: "https://leetcode.com/problems/product-of-array-except-self/",
        articleLink: "https://www.geeksforgeeks.org/product-array-puzzle-set-2-o1-space/",
        difficulty: "Medium",
      },
      {
        id: "arrays-5",
        title: "Maximum Subarray",
        description: "Find the contiguous subarray with the largest sum.",
        youtubeLink: "https://www.youtube.com/watch?v=5WZl3MMT0Eg",
        leetcodeLink: "https://leetcode.com/problems/maximum-subarray/",
        articleLink: "https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/",
        difficulty: "Medium",
      },
    ],
  },
  "linked-lists": {
    title: "Linked Lists",
    description:
      "Linked Lists are linear data structures where elements are not stored in contiguous memory locations.",
    problems: [
      {
        id: "linked-lists-1",
        title: "Reverse Linked List",
        description: "Reverse a singly linked list.",
        youtubeLink: "https://www.youtube.com/watch?v=G0_I-ZF0S38",
        leetcodeLink: "https://leetcode.com/problems/reverse-linked-list/",
        articleLink: "https://www.geeksforgeeks.org/reverse-a-linked-list/",
        difficulty: "Easy",
      },
      {
        id: "linked-lists-2",
        title: "Detect Cycle in a Linked List",
        description: "Determine if a linked list has a cycle.",
        youtubeLink: "https://www.youtube.com/watch?v=gBTe7lFR3vc",
        leetcodeLink: "https://leetcode.com/problems/linked-list-cycle/",
        articleLink: "https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/",
        difficulty: "Easy",
      },
      {
        id: "linked-lists-3",
        title: "Merge Two Sorted Lists",
        description: "Merge two sorted linked lists into one sorted list.",
        youtubeLink: "https://www.youtube.com/watch?v=XIdigk956u0",
        leetcodeLink: "https://leetcode.com/problems/merge-two-sorted-lists/",
        articleLink: "https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/",
        difficulty: "Easy",
      },
    ],
  },
}

export default function TopicPage() {
  const router = useRouter()
  const params = useParams()
  const topicId = params.topicId as string

  const [user, setUser] = useState('')
  
  type Topic = {
    title: string;
    description: string | undefined;
    problems: {
      id: string;
      title: string;
      description: string;
      youtubeLink: string;
      leetcodeLink: string;
      articleLink: string;
      difficulty: string;
    }[];
  };

  const [topic, setTopic] = useState<Topic | null>(null);
  const [completedProblems, setCompletedProblems] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch("/api/verify")
        if (!response.ok) {
          router.push("/login")
          return
        }

        const data = await response.json()
        setUser(data.data.email)
      } catch (error) {
        console.error("Auth verification error:", error)
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }
    verifyAuth()


    const topicData = dsaTopicsData[topicId as keyof typeof dsaTopicsData]
    if (!topicData) {
      router.push("/dashboard")
      return
    }

    setTopic(topicData)

    const storedProgress = localStorage.getItem("userProgress")
    if (storedProgress) {
      const progress = JSON.parse(storedProgress)
      if (progress[topicId]) {
        setCompletedProblems(progress[topicId])
      }
    }

    setLoading(false)
  }, [router, topicId])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  const toggleProblemCompletion = (problemId: string) => {
    let updatedCompletedProblems: string[]

    if (completedProblems.includes(problemId)) {
      updatedCompletedProblems = completedProblems.filter((id) => id !== problemId)
    } else {
      updatedCompletedProblems = [...completedProblems, problemId]
    }

    setCompletedProblems(updatedCompletedProblems)

    const storedProgress = localStorage.getItem("userProgress")
    const progress = storedProgress ? JSON.parse(storedProgress) : {}

    progress[topicId] = updatedCompletedProblems
    localStorage.setItem("userProgress", JSON.stringify(progress))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
      case "tough":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
          <p className="text-gray-600">Loading topic details...</p>
        </div>
      </div>
    )
  }

  if (!topic) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Topic not found.</p>
          <Link href="/dashboard" className="text-slate-800 font-medium mt-4 inline-block">
            Return to Dashboard
          </Link>
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
          <Link href="/dashboard" className="inline-flex items-center text-slate-700 hover:text-slate-900 mb-4">
            <ArrowLeft size={16} className="mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-2">{topic.title}</h1>
          <p className="text-gray-600">{topic.description}</p>
          <div className="mt-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{completedProblems.length}</span> of{" "}
              <span className="font-medium">{topic.problems.length}</span> problems completed
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-slate-600 h-2 rounded-full"
                style={{ width: `${(completedProblems.length / topic.problems.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Problem
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Difficulty
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Resources
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topic.problems.map((problem: { id: string; title: string; description: string; youtubeLink: string; leetcodeLink: string; articleLink: string; difficulty: string }) => (
                  <tr key={problem.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleProblemCompletion(problem.id)}
                        className="text-slate-800 hover:text-slate-600"
                      >
                        {completedProblems.includes(problem.id) ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                          <Circle className="h-6 w-6 text-gray-300" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{problem.title}</div>
                      <div className="text-sm text-gray-500">{problem.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getDifficultyColor(problem.difficulty)}`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-3">
                        <a
                          href={problem.youtubeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 hover:text-red-800 flex items-center"
                          title="YouTube Tutorial"
                        >
                          <Youtube size={18} />
                        </a>
                        <a
                          href={problem.leetcodeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-800 hover:text-slate-600 flex items-center"
                          title="LeetCode/CodeForces"
                        >
                          <ExternalLink size={18} />
                        </a>
                        <a
                          href={problem.articleLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                          title="Article"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                          </svg>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
