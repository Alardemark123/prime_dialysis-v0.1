import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark } from 'lucide-react'
import { articlesData } from '@/lib/mock-data/articles'
import Link from 'next/link'
import Image from 'next/image'

export function ArticleDetail({ article }) {
  const relatedArticles = articlesData
    .filter(a => a.id !== article.id && (
      a.category === article.category ||
      a.tags.some(tag => article.tags.includes(tag))
    ))
    .slice(0, 3)

  return (
    <article className="py-16 bg-white text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="text-[#0372b9] hover:text-gray-800 transition-colors"
            asChild
          >
            <Link href="/articles">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Articles
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <Badge
                variant="secondary"
                className="bg-[#0372b9]/10 text-[#0372b9] border border-[#0372b9]/20"
              >
                {article.category}
              </Badge>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-[#0372b9]" />
                  <time dateTime={article.date}>
                    {new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-[#3ab54a]" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-[#0372b9] leading-tight mb-6">
              {article.title}
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {article.excerpt}
            </p>

            {/* Author and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-[#0372b9]/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-[#0372b9]" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{article.author}</div>
                  <div className="text-sm text-gray-500">Medical Technology Expert</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#0372b9] text-[#0372b9] hover:bg-[#0372b9] hover:text-white"
                >
                  <Share2 className="mr-2 w-4 h-4" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#3ab54a] text-[#3ab54a] hover:bg-[#3ab54a] hover:text-white"
                >
                  <Bookmark className="mr-2 w-4 h-4" />
                  Save
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={article.image}
                alt={article.title}
                width={1200}
                height={600}
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none text-gray-700">
            {article.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('# ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-[#0372b9] mt-12 mb-6">
                    {paragraph.substring(2)}
                  </h2>
                )
              } else if (paragraph.startsWith('## ')) {
                return (
                  <h3 key={index} className="text-xl font-semibold text-[#3ab54a] mt-8 mb-4">
                    {paragraph.substring(3)}
                  </h3>
                )
              } else if (paragraph.startsWith('### ')) {
                return (
                  <h4 key={index} className="text-lg font-semibold text-gray-800 mt-6 mb-3">
                    {paragraph.substring(4)}
                  </h4>
                )
              } else if (paragraph.trim() === '') {
                return <div key={index} className="h-4" />
              } else {
                return (
                  <p key={index} className="mb-6 leading-relaxed text-gray-700">
                    {paragraph}
                  </p>
                )
              }
            })}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-[#0372b9] mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-[#3ab54a] text-[#3ab54a]"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0372b9] mb-4">
                Related Articles
              </h2>
              <p className="text-gray-600">
                Explore more insights in dialysis technology and healthcare innovation
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <article
                  key={relatedArticle.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#0372b9]/10 text-[#0372b9] border border-[#0372b9]/20">
                        {relatedArticle.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                      {relatedArticle.title}
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {relatedArticle.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{relatedArticle.readTime}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#0372b9] text-[#0372b9] hover:bg-[#0372b9] hover:text-white"
                        asChild
                      >
                        <Link href={`/articles/${relatedArticle.slug}`}>
                          Read More
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
