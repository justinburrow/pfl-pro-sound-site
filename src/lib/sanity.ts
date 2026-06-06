import { createClient } from '@sanity/client'
import { defineQuery } from 'groq';
import groq from 'groq';



const client = createClient({
  projectId: 'z3u9veqi',
  dataset: 'production',
  useCdn: false,
  apiVersion: 'v2021-10-21',
});

export default client;

export const SITE_SETTINGS_QUERY =
  defineQuery(`*[_type == 'siteSettings'][0]{
    accentColor,
    title,
    logo,
    copyright,
    social[]{ platform, url },
    seo
  }`);

export const HOME_QUERY = groq`{
  "home": *[_type == "homePage"][0]{
    heroHeadline,
    servicesImage,
    "sections": sections[!hidden]{
      _key,
      _type,
      _type == "servicesSection" => {
        services[]{ title, description }
      },
      _type == "imageText" => {
        heading, body, imagePosition, image
      }
    },
    "events": *[_type == "eventHighlight"] | order(orderRank){
      _id, title, image
    },
    "testimonials": *[_type == "testimonial"] | order(orderRank){
      _id, quote, reviewerName, reviewerTitle, clientName, clientUrl, image
    }
  }
}`;

export const HOME_OLD_QUERY = defineQuery(`*[_type == "homePage"][0]{
  heroHeadline,
  "sections": sections[hidden != true]{
    _type,
    _key,

    _type == "servicesSection" => {
      services[]{ title, description }
    },

    _type == "imageText" => {
      heading,
      body,
      imagePosition,
      image
    },

    _type == "testimonialsSection" => {
      "items": *[_type == "testimonial"] | order(orderRank){
        _id, quote, reviewerName, reviewerTitle, clientName, clientUrl, image
      }
    },
  },
}`);

export const ABOUT_QUERY = defineQuery(`*[_type == "aboutPage"][0]{
  headingAccent,
  headingCopy,
  lead,
  introBlock,
  ownerBlock
}`);

export const CONTACT_QUERY =
  defineQuery(`*[_type == "contactPage"][0]{
    formId
}`);

export const THANKS_QUERY = defineQuery(`*[_type == "thanksPage"][0]{
  heading,
  copy
}`);

export const BRANDPARTNER_QUERY =
  defineQuery(`*[_type == "brandPartner"] | order(orderRank){
      brandPartnerName,
      brandPartnerLink,
      image,
      "src": image.asset->url,
      "mimeType": image.asset->mimeType,
      logoWidthAdjustment
}`);

/*logos[]{
    brandPartnerName,
    logoWidthAdjustment,
    "src": brandPartnerLogo.asset->url,
    "mimeType": brandPartnerLogo.asset->mimeType
  }*/