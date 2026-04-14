import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const singletonType = 'portfolioPage'
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: "tauyn's portfolio",

  projectId: 'samzbux6',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Portfolio Page')
              .id(singletonType)
              .child(S.document().schemaType(singletonType).documentId(singletonType)),
            ...S.documentTypeListItems().filter((listItem) => listItem.getId() !== singletonType),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => schemaType !== singletonType),
  },

  document: {
    actions: (prev, {schemaType}) =>
      schemaType === singletonType
        ? prev.filter(({action}) => typeof action === 'string' && singletonActions.has(action))
        : prev,
  },
})
