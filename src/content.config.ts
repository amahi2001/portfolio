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
      short: z.string(),
      catch: z.object({ value: z.string(), approx: z.boolean().default(false), label: z.string() }),
      kind: z.string(),
      title: z.string(),
      body: z.string(),
      sample: z.object({ source: z.string(), field: z.string(), code: z.string() }).optional(),
      link: link.optional(),
      ledger: z.array(z.object({ who: z.string(), figures: z.string(), note: z.string(), href: z.url().optional() })).optional(),
    }),
  }),
  career: defineCollection({
    loader: file('src/data/career.yaml'),
    schema: z.object({ order: z.number(), dates: z.string(), org: z.string(), role: z.string(), body: z.string().optional(), proof: z.array(z.string()).optional() }),
  }),
  services: defineCollection({
    loader: file('src/data/services.yaml'),
    schema: z.object({ order: z.number(), name: z.string(), body: z.string() }),
  }),
};
