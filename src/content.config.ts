import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const link = z.object({ href: z.url(), text: z.string() });

// Each file is an ordered list; `order` keeps the page order stable.
export const collections = {
  work: defineCollection({
    loader: file('src/data/work.yaml'),
    schema: z.object({
      order: z.number(),
      catch: z.object({ value: z.string(), approx: z.boolean().default(false), label: z.string() }),
      kind: z.string(),
      title: z.string(),
      body: z.string(),
      sample: z.object({ source: z.string(), field: z.string(), code: z.string() }).optional(),
      link: link.optional(),
    }),
  }),
  career: defineCollection({
    loader: file('src/data/career.yaml'),
    schema: z.object({ order: z.number(), dates: z.string(), org: z.string(), role: z.string(), body: z.string() }),
  }),
  services: defineCollection({
    loader: file('src/data/services.yaml'),
    schema: z.object({ order: z.number(), name: z.string(), body: z.string() }),
  }),
};
