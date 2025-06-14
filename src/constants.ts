import { GithubIcon, LinkedinIcon, MailIcon, RssIcon, TwitterIcon } from 'lucide-react'
import type { Site, SocialLink } from './types'

export const SITE: Site = {
  title: `Diego Lima's Blog`,
  description: 'A blog about technology, programming, and other things.',
  href: 'https://diegolm.dev',
  author: 'Diego Lima',
  locale: 'en-US',
  recentPostCount: 3,
  postsPerPage: 10,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'Blog',
  },
  {
    href: '/about',
    label: 'About',
  },
  // {
  //   href: '/rss.xml',
  //   label: 'RSS',
  // },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://twitter.com/diblacksmith',
    label: 'X',
  },
  {
    href: 'https://www.linkedin.com/in/lima-diego/',
    label: 'LinkedIn',
  },
]

export const ICON_MAP: Record<string, React.ElementType> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  X: TwitterIcon,
  Email: MailIcon,
  RSS: RssIcon,
}
