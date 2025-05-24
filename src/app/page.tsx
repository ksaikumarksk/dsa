import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-slate-800 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">DSA Learning Tracker</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Welcome to DSA Learning Tracker</h2>
            <p className="text-gray-600 mb-8 text-center">
              Track your progress through Data Structures and Algorithms topics and problems.
            </p>
            <div className="space-y-4">
              <Link
                href="/login"
                className="block w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-medium text-center rounded-md transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block w-full py-3 px-4 border border-slate-800 text-slate-800 hover:bg-slate-50 font-medium text-center rounded-md transition"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-slate-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} DSA Learning Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
