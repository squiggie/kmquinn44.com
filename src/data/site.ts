const site = {
  url: 'https://kmquinn44.com',
  title: 'K.M. Quinn',
  defaultDescription:
    'Official site for K.M. Quinn, featuring books, blog posts, events, and community links.',
  socials: {
    linkedin: 'https://www.linkedin.com/in/kmquinn44',
    facebook: 'https://www.facebook.com/profile.php?id=61554033054982',
    instagram: 'https://www.instagram.com/kmbquinn/',
    truthSocial: 'https://truthsocial.com/@kmquinn',
  },
  seo: {
    titleTemplate: '%s | K.M. Quinn',
    defaultImage: '/images/og-default.jpg',
    twitterCard: 'summary_large_image',
  },
} as const;

export default site;
