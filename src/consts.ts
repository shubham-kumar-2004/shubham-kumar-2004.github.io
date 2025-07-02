import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'shubham.work',
  description:
    'Portfolio of Shubham Kumar - Developer & Creator',
  href: 'https://shubham.work',
  author: 'Shubham Kumar',
  locale: 'en-US',
  featuredPostCount: 1,
  postsPerPage: 1,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/about',
    label: 'about',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/shubham-kumar-2004',
    label: 'GitHub',
  },
  {
    href: 'https://twitter.com/shubhams_twt',
    label: 'Twitter',
  },
  {
    href: 'https://linkedin.com/in/shubham-work',
    label: 'LinkedIn',
  },
  {
    href: 'https://instagram.com/shubham.jpeg',
    label: 'Instagram',
  },
  {
    href: 'mailto:shubham-work@outlook.com',
    label: 'Email',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Instagram: 'lucide:instagram',
  Email: 'lucide:mail',
}
