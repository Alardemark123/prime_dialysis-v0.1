import { ArticlesList } from '@/components/sections/ArticlesList'

export const metadata = { 
  title: 'Articles & Insights - Prime Dialysis Center Inc',
  description: 'Stay informed about the latest developments in dialysis technology, industry trends, best practices, and innovations in renal care.',
}

export default function ArticlesPage() {
  return (
    <div className="overflow-hidden">
      <ArticlesList />
    </div>
  )
}