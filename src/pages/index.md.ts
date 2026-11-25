import type { APIRoute } from 'astro';
import { profile as p } from '../data/profile';
import { loadContent } from '../lib/content';

// The same content as the page, for readers that prefer text (and agents).
export const GET: APIRoute = async () => {
  const { work, career, services } = await loadContent();
  const md = [
    `# ${p.name}`, p.lead, p.intro,
    p.stats.map(([n, l]) => `- **${n}** ${l}`).join('\n'),
    '## Selected work', p.workIntro,
    ...work.map(({ data: w }) => [
      `### ${w.title}`,
      `**${w.catch.approx ? '~' : ''}${w.catch.value}** ${w.catch.label} · ${w.kind}`,
      w.body,
      w.sample && `Sample extraction: ${w.sample.source}, ${w.sample.field} → \`${w.sample.code}\``,
      w.link && `[${w.link.text}](${w.link.href})`,
    ].filter(Boolean).join('\n\n')),
    '## Career', p.careerIntro,
    ...career.map(({ data: j }) => `### ${j.org}, ${j.role}\n\n${j.dates}\n\n${j.body}`),
    `**${p.education[0]}**. ${p.education[1]}`,
    '## The lab', p.labIntro,
    ...services.map(({ data: s }) => `### ${s.name}\n\n${s.body}`),
    `[Read the flake](${p.lab})`,
    '## Contact', p.contact,
    `- Email: [${p.email}](mailto:${p.email})\n- [LinkedIn](${p.linkedin})\n- [GitHub](${p.github})\n- [llms.txt](${p.site}/llms.txt)`,
  ].join('\n\n') + '\n';
  return new Response(md, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
