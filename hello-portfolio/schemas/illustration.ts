import {defineField, defineType} from 'sanity'

// Illustration schema
export const illustration = defineType({
  name: 'illustration',
  title: 'Illustration',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Information', value: 'information'},
          {title: 'Landscapes', value: 'landscapes'},
          {title: 'Objects', value: 'objects'},
          {title: 'Comics', value: 'comics'},
          {title: 'Animations', value: 'animations'},
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'colors',
      title: 'Color Palette',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Red', value: '#FF6B6B'},
          {title: 'Orange', value: '#FFA94D'},
          {title: 'Yellow', value: '#FFD700'},
          {title: 'Green', value: '#51CF66'},
          {title: 'Blue', value: '#339AF0'},
          {title: 'Indigo', value: '#845EF7'},
          {title: 'Violet', value: '#CC5DE8'},
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      category: 'category',
    },
    prepare(selection) {
      const {title, media, category} = selection;
      return {
        title,
        media,
        subtitle: category.charAt(0).toUpperCase() + category.slice(1),
      };
    },
  },
});