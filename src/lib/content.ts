import { getCollection } from 'astro:content';

const ordered = async <C extends 'work' | 'career' | 'services'>(name: C) =>
  (await getCollection(name)).sort((a, b) => a.data.order - b.data.order);

export const loadContent = async () => ({
  work: await ordered('work'),
  career: await ordered('career'),
  services: await ordered('services'),
});
