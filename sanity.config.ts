// sanity.config.ts
import { defineConfig, isDev } from 'sanity';
import { vercelDeploy } from '@liiift-studio/deploy-vercel-from-sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import {
  ControlsIcon,
  HomeIcon,
  DocumentIcon,
  DotIcon,
  FeedbackIcon,
  HeartIcon,
} from '@sanity/icons';


const singletonTypes = new Set([
  'siteSettings',
  'homePage',
  'aboutPage',
  'contactPage',
  'clients',
  'thanksPage',
]);

const singletonActions = new Set([
  'publish',
  'discardChanges',
  'restore',
]);

const devOnlyPlugins = [visionTool()];

export default defineConfig({
  name: 'pfl-pro-sound',
  title: 'PFL Pro Sound',
  projectId: 'z3u9veqi',
  dataset: 'production',
  plugins: [
    visionTool({
      defaultDataset: 'production',
      defaultApiVersion: 'v2026-03-01',
      ...(isDev ? devOnlyPlugins : []),
    }),
    vercelDeploy({ title: 'Deploy', name: 'vercel-deploy' }),
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .icon(ControlsIcon)
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings'),
              ),
            S.divider(),
            S.listItem()
              .title('Home Page')
              .id('homePage')
              .icon(HomeIcon)
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage'),
              ),
            orderableDocumentListDeskItem({
              type: 'eventHighlight',
              title: 'Event Highlights',
              icon: DotIcon,
              id: 'orderable-id-eventHighlights',
              S,
              context,
            }),

            orderableDocumentListDeskItem({
              type: 'testimonial',
              title: 'Testimonials',
              id: 'orderable-id-testimonial',
              icon: DotIcon,
              S,
              context,
            }),

            orderableDocumentListDeskItem({
              type: 'brandPartner',
              title: 'Brand Partner Logos',
              id: 'orderable-id-brandPartner',
              icon: DotIcon,
              S,
              context,
            }),
            S.divider(),
            S.listItem()
              .title('About Page')
              .id('aboutPage')
              .icon(DocumentIcon)
              .child(
                S.document()
                  .schemaType('aboutPage')
                  .documentId('aboutPage'),
              ),
            S.divider(),
            S.listItem()
              .title('Contact Page')
              .id('contactPage')
              .icon(FeedbackIcon)
              .child(
                S.document()
                  .schemaType('contactPage')
                  .documentId('contactPage'),
              ),
            S.listItem()
              .title('Submission Thanks Content')
              .id('thanksPage')
              .icon(HeartIcon)
              .child(
                S.document()
                  .schemaType('thanksPage')
                  .documentId('thanksPage'),
              ),
            S.divider(),
          ]);
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(
            ({ action }) => action && singletonActions.has(action),
          )
        : input,
  },
});