'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ArrowRight, Search, Clock, User, Calendar } from 'lucide-react'
import { articlesData } from '@/lib/mock-data/articles'
import Link from 'next/link'
import Image from 'next/image'

export function ArticlesList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', ...new Set(articlesData.map(article => article.category))]

  const filteredArticles = articlesData.filter(article => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredArticle = articlesData.find(article => article.featured)

  return (
    <section className="py-16 bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[#3ab54a]/10 text-[#3ab54a]">
            Articles & Insights
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0372b9] mb-6">
            Latest in <span className="text-[#3ab54a]">Dialysis Innovation</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay informed about breakthrough technologies, industry trends, and best practices
            that are shaping the future of renal care.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10 border-gray-300 focus:ring-[#0372b9] focus:border-[#0372b9]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-[#0372b9] text-white hover:bg-[#0363a3]"
                    : "border-gray-300 text-gray-700 hover:border-[#0372b9] hover:text-[#0372b9]"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        {featuredArticle && searchTerm === '' && selectedCategory === 'All' && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-[#0372b9] mb-8">Featured Article</h2>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
              <div className="grid lg:grid-cols-2">
              <div className="relative h-64 lg:h-[500px] w-full">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#3ab54a]/90 text-white">Featured</Badge>
                </div>
              </div>


                <div className="p-8 flex flex-col h-full">
                  <div className="flex-grow">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <Badge className="bg-[#0372b9]/10 text-[#0372b9]">
                        {featuredArticle.category}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-[#0372b9]" />
                        <time dateTime={featuredArticle.date}>
                          {new Date(featuredArticle.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </time>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-[#0372b9] mb-4">
                      {featuredArticle.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4 text-[#0372b9]" />
                          <span>{featuredArticle.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-[#0372b9]" />
                          <span>{featuredArticle.readTime}</span>
                        </div>
                      </div>

                      <Button
                        className="bg-[#3ab54a] hover:bg-[#349d41] text-white"
                        asChild
                      >
                        <Link href={`/articles/${featuredArticle.slug}`}>
                          Read Article
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredArticles
            .filter(article => !article.featured || searchTerm !== '' || selectedCategory !== 'All')
            .map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#0372b9]/10 text-[#0372b9] border border-[#0372b9]/30">
                      {article.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-[#0372b9] mb-3 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <User className="w-4 h-4 text-[#3ab54a]" />
                      <span>{article.author}</span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#0372b9] text-[#0372b9] hover:bg-[#0372b9] hover:text-white"
                      asChild
                    >
                      <Link href={`/articles/${article.slug}`}>
                        Read More
                        <ArrowRight className="ml-2 w-3 h-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-[#0372b9] mb-4">
              No articles found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or category filter.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
