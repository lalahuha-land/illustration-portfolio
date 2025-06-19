import createClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: process.env.REACT_APP_SANITY_DATASET,
  apiVersion: process.env.REACT_APP_SANITY_API_VERSION || '2023-10-01',
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

// GROQ queries
export const fetchIllustrations = async (category) => {
  const query = `*[_type == "illustration" ${
    category ? `&& category == "${category}"` : ''
  }] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    description,
    "imageUrl": mainImage.asset->url,
    colors,
    publishedAt
  }`;
  
  return await client.fetch(query);
};

export const fetchAbout = async () => {
  const query = `*[_type == "about"][0] {
    title,
    bio,
    "avatarUrl": avatar.asset->url,
    skills,
    funFacts
  }`;
  
  return await client.fetch(query);
};

export const fetchSiteSettings = async () => {
  const query = `*[_type == "siteSettings"][0] {
    title,
    description,
    contactEmail,
    contactPhone,
    location,
    socialLinks
  }`;
  
  return await client.fetch(query);
};