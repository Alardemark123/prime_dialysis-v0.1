import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Clock, User } from 'lucide-react'
import { articlesData } from '@/lib/mock-data/articles'
import Link from 'next/link'
import Image from 'next/image'

export function ArticlePreview() {
  const featuredArticles = articlesData.filter(article => article.featured).slice(0, 3)

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Latest Insights & Innovation
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Stay informed about the latest developments in dialysis technology, industry trends, and best practices.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {featuredArticles.map((article, index) => (
            <article 
              key={article.id}
              className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-glow transition-all duration-300 scale-hover"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90 text-foreground">
                    {article.category}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-3 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <time dateTime={article.date}>
                    {new Date(article.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full text-primary border-[#0372b9] hover:bg-[#0372b9] hover:text-primary-foreground"
                  asChild
                >
                  <Link href={`/articles/${article.slug}`}>
                    Read Article
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-[#3ab54a] hover:bg-[#3ab54a]/90 text-[white]"
            asChild
          >
            <Link href="/articles">
              View All Articles
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}