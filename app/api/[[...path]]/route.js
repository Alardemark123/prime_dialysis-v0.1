// app/api/[[...path]]/route.js
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const { path = [] } = params
  const route = `/${path.join('/')}`

  //Products
  if (route === '/products' || route === '/products/') {
    try {
      const res = await fetch('https://api.jsonbin.io/v3/b/68fac834ae596e708f278633/latest', {
        headers: {
          'X-Master-Key': process.env.JSONBIN_KEY
        },
        cache: 'no-store'
      })
  
      const data = await res.json()
      const products = data.record // array ng products

      console.log(products)
  
      const url = new URL(request.url)
      const search = url.searchParams.get('search') || ''
      const category = url.searchParams.get('category') || 'All'
      const take = parseInt(url.searchParams.get('take') || '10', 10)
      const skip = parseInt(url.searchParams.get('skip') || '0', 10)
  
      let filtered = [...products]
  
      if (category !== 'All') {
        filtered = filtered.filter((p) => p.category.includes(category))
      }
  
      if (search) {
        const lowerSearch = search.toLowerCase()
        filtered = filtered.filter(
          (p) =>
            p.medicine_name.toLowerCase().includes(lowerSearch) ||
            p.brand_name.toLowerCase().includes(lowerSearch)
        )
      }
  
      const paginated = filtered.slice(skip, skip + take)
  
      return NextResponse.json({
        total: filtered.length,
        products: paginated
      })
    } catch (err) {
      console.error('Error fetching products:', err)
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
    }
  }
  
  //Careers
  if (route === '/careers' || route === '/careers/') {

    try {

      const res = await fetch('https://api.jsonbin.io/v3/b/690bf572ae596e708f476238/latest', {
        headers: {
          'X-Master-Key': process.env.JSONBIN_KEY
        },
        cache: 'no-store'
      })

      const data = await res.json()
      const careers = data.record // array ng careers

      console.log(careers)
    const url = new URL(request.url)
    const search = url.searchParams.get('search') || ''
    const position = url.searchParams.get('position') || 'All'
    const take = parseInt(url.searchParams.get('take') || '10', 10)
    const skip = parseInt(url.searchParams.get('skip') || '0', 10)
  
    let filtered = [...careers]
  
    // Position filter
    if (position !== 'All') {
      filtered = filtered.filter((c) => c.position.includes(position))
    }
  
    // Search filter
    if (search) {
      const lowerSearch = search.toLowerCase()
      filtered = filtered.filter(
        (c) =>
          c.position.toLowerCase().includes(lowerSearch)
      )
    }
  
    // Pagination
    const start = skip
    const end = start + take
    const paginated = filtered.slice(start, end)
  
    return NextResponse.json({
      total: filtered.length,
      careers: paginated,
    })
  } catch (err) {
    console.error('Error fetching careers:', err)
    return NextResponse.json({ error: 'Failed to fetch careers' }, { status: 500 })
  }

  }

  // Latest News API
  if (route === '/latestNews' || route === '/latestNews/') {
    try {

    const res = await fetch('https://api.jsonbin.io/v3/b/68fad1fed0ea881f40b6d3fc/latest', {
      headers: {
        'X-Master-Key': process.env.JSONBIN_KEY
      },
      cache: 'no-store'
    })

    const data = await res.json()
    const latestNews = data.record // array ng latestNews

    console.log(latestNews)
    const url = new URL(request.url)
    const search = url.searchParams.get('search') || ''
    const month = url.searchParams.get('month') || 'All'
    const take = parseInt(url.searchParams.get('take') || '10', 10)
    const skip = parseInt(url.searchParams.get('skip') || '0', 10)
    const all = url.searchParams.get('all') === 'true'

    let filtered = [...latestNews]

    // Filter by month
    if (!all && month !== 'All') {
      filtered = filtered.filter((c) => c.month.includes(month))
    }

    // Filter by search
    if (!all && search) {
      const lowerSearch = search.toLowerCase()
      filtered = filtered.filter((c) => c.activities.toLowerCase().includes(lowerSearch))
    }

    // Sort by latest year → latest month
    filtered.sort((a, b) => {
      const [monthA, yearA] = a.month.split(' ')
      const [monthB, yearB] = b.month.split(' ')
      const numYearA = Number(yearA)
      const numYearB = Number(yearB)
      if (numYearA !== numYearB) return numYearB - numYearA // latest year first
      return monthOrder[monthB] - monthOrder[monthA]         // latest month first
    })

    // Paginate if not all
    const paginated = all ? filtered : filtered.slice(skip, skip + take)

    return NextResponse.json({
      total: filtered.length,
      latestNews: paginated,
    })
  } catch (err) {
    console.error('Error fetching latest news:', err)
    return NextResponse.json({ error: 'Failed to fetch latest news' }, { status: 500 })
  }
}

  
  return NextResponse.json(
    { error: `Route ${route} not found` },
    { status: 404 }
  )
}



const monthOrder = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
}