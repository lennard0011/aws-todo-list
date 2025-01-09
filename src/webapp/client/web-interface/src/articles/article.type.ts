import type React from 'react'

export interface Article {
  url: string
  title: string
  summary: string
  releaseDate: Date
  content: React.JSX.Element
}
