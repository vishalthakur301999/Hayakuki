import { ArrowLeft, ArrowRight, Clock3 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { stories } from '../data'

export function StoriesPage() {
  return <main className="stories-page"><section className="subpage-hero stories-hero"><div className="page-width"><span className="overline">TRAVEL IDEAS</span><h1>Stories for<br />the window seat.</h1><p>City notes, slow routes and reasons to take the trip.</p></div></section><section className="stories-content page-width"><div className="stories-intro"><span className="overline coral">LATEST NOTES</span><h2>Go curious.</h2></div><div className="stories-grid">{stories.map((story, index) => <Link to={`/stories/${story.id}`} className={`story-card ${story.className} ${index === 0 ? 'featured' : ''}`} key={story.id}><div className="story-art"><span>{story.category}</span></div><div className="story-copy"><span>{story.date} · {story.readTime}</span><h3>{story.title}</h3><p>{story.excerpt}</p><em>Read story <ArrowRight /></em></div></Link>)}</div></section></main>
}

export function StoryPage() {
  const { id } = useParams()
  const story = stories.find((item) => item.id === id)
  if (!story) return <main className="not-found"><h1>Story not found.</h1><Link to="/stories">Back to stories</Link></main>
  return <main className="story-page"><section className={`story-article-hero ${story.className}`}><div className="story-article-art" /><div className="page-width"><Link to="/stories"><ArrowLeft /> All stories</Link><span className="overline">{story.category}</span><h1>{story.title}</h1><p>{story.excerpt}</p><div><span>By {story.author}</span><span><Clock3 /> {story.readTime}</span><span>{story.date}</span></div></div></section><article className="story-body">{story.body.map((paragraph, index) => <p className={index === 0 ? 'lead' : ''} key={paragraph}>{paragraph}</p>)}<blockquote>Travel a little slower. You notice more that way.</blockquote><Link to="/flights">Find a flight <ArrowRight /></Link></article></main>
}
