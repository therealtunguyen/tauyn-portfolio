import {defineField, defineType} from 'sanity'

/**
 * Reusable object: Skill Item
 * Matches the "skills_cloud" section items
 */
export const skillItem = defineType({
  name: 'skillItem',
  title: 'Skill Item',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      description: 'Internal identifier (e.g. skills.item_marketing)',
    }),
    defineField({
      name: 'value',
      title: 'Skill Label',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'value'},
  },
})

/**
 * Document: Project
 * Combines data from "projects_grid" and "project_detail_view"
 * Each project in the grid will reference a full project record
 */
export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  initialValue: {
    cardGradient: 'green',
    cardEmoji: '🎵',
    listHeaderLabel: 'KẾT QUẢ ĐẠT ĐƯỢC',
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'meta',
      title: 'Project Meta (Grid View)',
      type: 'string',
      description: 'Example: Marketing & Sự kiện – 2025',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cardGradient',
      title: 'Project Card Color',
      type: 'string',
      options: {
        list: [
          {title: 'Green', value: 'green'},
          {title: 'Emerald', value: 'emerald'},
          {title: 'Teal', value: 'teal'},
          {title: 'Lime', value: 'lime'},
          {title: 'Cyan', value: 'cyan'},
          {title: 'Sky', value: 'sky'},
        ],
      },
      description: 'Color style used by the project card in grid view',
    }),
    defineField({
      name: 'cardEmoji',
      title: 'Project Card Emoji',
      type: 'string',
      description: 'Example: 🎵',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Project Thumbnail',
      type: 'image',
      description: 'Image shown on project card and project detail hero',
      options: {hotspot: true},
    }),
    defineField({
      name: 'categoryYear',
      title: 'Category and Year (Detail View)',
      type: 'string',
      description: 'Example: CHIẾN LƯỢC TRUYỀN THÔNG – 2025',
    }),
    defineField({
      name: 'description',
      title: 'Description (Detail View)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata Line (Detail View)',
      type: 'string',
      description: 'Example: Phạm Hoàng Thảo Uyên • 2025 • 4 thành tựu',
    }),
    defineField({
      name: 'listHeaderLabel',
      title: 'Results Header Label',
      type: 'string',
      description: 'Example: KẾT QUẢ ĐẠT ĐƯỢC',
    }),
    defineField({
      name: 'results',
      title: 'Results / Achievements',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List items shown under the header (one string per bullet)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'meta',
      media: 'thumbnail',
    },
  },
})

/**
 * Document: Portfolio Page (Singleton)
 * Contains all sections from the JSON
 */
export const portfolioPage = defineType({
  name: 'portfolioPage',
  title: 'Portfolio Page',
  type: 'document',
  initialValue: {
    tabs: {
      home: 'Trang chủ',
      profile: 'Thông tin',
      projects: 'Dự án',
      contact: 'Liên hệ',
    },
    projectsSection: {
      heading: 'Dự án',
      description: 'Tuyển chọn những công việc tốt nhất',
      nextButtonLabel: 'Tiếp theo',
    },
    contact: {
      linkedinUrl: 'https://www.linkedin.com/in/your-handle',
      emailUrl: 'you@example.com',
      facebookUrl: 'https://www.facebook.com/your-profile',
      instagramUrl: 'https://www.instagram.com/your-handle',
      phoneNumber: '+84 9xx xxx xxx',
    },
  },
  fields: [
    // Fixed Navigation Tabs (matches current app routes)
    defineField({
      name: 'tabs',
      title: 'Navigation Tabs',
      type: 'object',
      fields: [
        defineField({name: 'home', title: 'Home Tab Label', type: 'string'}),
        defineField({name: 'profile', title: 'Profile Tab Label', type: 'string'}),
        defineField({name: 'projects', title: 'Projects Tab Label', type: 'string'}),
        defineField({name: 'contact', title: 'Contact Tab Label', type: 'string'}),
      ],
    }),

    // Hero Landing Section
    defineField({
      name: 'hero',
      title: 'Hero Landing',
      type: 'object',
      fields: [
        defineField({name: 'heading', type: 'string', title: 'Main Heading'}),
        defineField({name: 'subheading', type: 'text', title: 'Subheading'}),
        defineField({
          name: 'inputPlaceholder',
          type: 'string',
          title: 'Input Placeholder',
        }),
        defineField({name: 'buttonContinue', type: 'string', title: 'Continue Button'}),
      ],
    }),

    // Profile Introduction Section
    defineField({
      name: 'profileIntro',
      title: 'Profile Introduction',
      type: 'object',
      fields: [
        defineField({name: 'label', type: 'string', title: 'Section Label'}),
        defineField({name: 'heading', type: 'string', title: 'Greeting Heading'}),
        defineField({name: 'body', type: 'text', title: 'Bio Text'}),
        defineField({
          name: 'profileAvatar',
          type: 'image',
          title: 'Profile Avatar',
          options: {hotspot: true},
        }),
        defineField({name: 'buttonSkills', type: 'string', title: 'Skills Button'}),
        defineField({name: 'buttonNext', type: 'string', title: 'Next Button'}),
      ],
    }),

    // Skills Cloud Section
    defineField({
      name: 'skills',
      title: 'Skills Cloud',
      type: 'object',
      fields: [
        defineField({name: 'title', type: 'string', title: 'Section Title'}),
        defineField({
          name: 'items',
          title: 'Skill Items',
          type: 'array',
          of: [{type: 'skillItem'}],
        }),
      ],
    }),

    // Projects Grid Section
    defineField({
      name: 'projectsSection',
      title: 'Projects Section Labels',
      type: 'object',
      fields: [
        defineField({name: 'heading', title: 'Section Heading', type: 'string'}),
        defineField({name: 'description', title: 'Section Description', type: 'string'}),
        defineField({name: 'nextButtonLabel', title: 'Next Button Label', type: 'string'}),
      ],
    }),

    defineField({
      name: 'projects',
      title: 'Projects Grid',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'project'}],
        },
      ],
      description:
        'Phải tạo ở trang Project trước rùi link từ đây (trên web sẽ hiển thị theo thứ tự)',
    }),

    // Contact Footer Section
    defineField({
      name: 'contact',
      title: 'Contact Footer',
      type: 'object',
      fields: [
        defineField({name: 'heading', type: 'string', title: 'Thank You Heading'}),
        defineField({name: 'body', type: 'text', title: 'Thank You Message'}),
        defineField({
          name: 'linkedinUrl',
          type: 'url',
          title: 'LinkedIn URL',
          description: 'Example: https://www.linkedin.com/in/your-handle',
        }),
        defineField({
          name: 'emailUrl',
          type: 'email',
          title: 'Email Address',
          description: 'Example: you@example.com',
        }),
        defineField({
          name: 'facebookUrl',
          type: 'url',
          title: 'Facebook URL',
          description: 'Example: https://www.facebook.com/your-profile',
        }),
        defineField({
          name: 'instagramUrl',
          type: 'url',
          title: 'Instagram URL',
          description: 'Example: https://www.instagram.com/your-handle',
        }),
        defineField({
          name: 'phoneNumber',
          type: 'string',
          title: 'Phone Number',
          description: 'Example: +84 9xx xxx xxx',
        }),
        defineField({name: 'subtext', type: 'string', title: 'Footer Subtext'}),
      ],
    }),

    // Music Player Bar Section
    defineField({
      name: 'musicPlayer',
      title: 'Music Player Bar',
      type: 'object',
      fields: [
        defineField({name: 'trackTitle', type: 'string', title: 'Track Title'}),
        defineField({name: 'artistName', type: 'string', title: 'Artist Name'}),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hero.heading',
    },
  },
})
