import { notFound } from 'next/navigation'
import { ArticleDetail } from '@/components/sections/ArticleDetail'
import { articlesData } from '@/lib/mock-data/articles'

export function generateStaticParams() {
  return articlesData.map((article) => ({
    slug: article.slug,
  }))
}

export function generateMetadata({ params }) {
  const article = articlesData.find(article => article.slug === params.slug)
  
  if (!article) {
    return {
      title: 'Article Not Found - Prime Dialysis Center Inc',
    }
  }

  return {
    title: `${article.title} - Prime Dialysis Center Inc`,
    description: article.excerpt,
  }
}

export default function ArticlePage({ params }) {
  const article = articlesData.find(article => article.slug === params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="overflow-hidden">
      <ArticleDetail article={article} />
    </div>
  )
}