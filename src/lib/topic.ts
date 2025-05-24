export interface Topic {
  id: string
  title: string
  description: string
  problems: Problem[]
}

export interface Problem {
  id: string
  title: string
  description: string
  youtubeLink: string
  leetcodeLink: string
  articleLink: string
  difficulty: "Easy" | "Medium" | "Hard"
}
