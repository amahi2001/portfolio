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
      `**${w.catch.approx ? '~' : ''}${w.catch.value}**${w.catch.label ? ` ${w.catch.label}.` : ' ·'} ${w.line}`,
      w.ledger?.map(r => `- **${r.prefix ? r.prefix + ' ' : ''}${r.figure}** ${r.who} (${r.note}): ${r.href}`).join('\n'),
      w.link && `[${w.link.text}](${w.link.href})`,
    ].filter(Boolean).join('\n\n')),
    '## Career', p.careerIntro,
    ...career.map(({ data: j }) => [`### ${j.org}, ${j.role}`, j.dates, j.body,
      j.proof && `Work: ${j.proof.map(id => work.find(w => w.id === id)!.data.title).join(', ')}`].filter(Boolean).join('\n\n')),
    `**${p.education[0]}**. ${p.education[1]}`,
    '## The lab', p.labIntro,
    ...services.map(({ data: s }) => [`### ${s.figure ? `${s.figure} · ` : ''}${s.name}`, s.body, s.link && `[${s.link.text}](${s.link.href})`].filter(Boolean).join('\n\n')),
    `[Read the flake](${p.lab})`,
    '## Contact', p.contact,
    `- Email: [${p.email}](mailto:${p.email})\n- [LinkedIn](${p.linkedin})\n- [GitHub](${p.github})\n- [llms.txt](${p.site}/llms.txt)`,
  ].join('\n\n') + '\n';
  return new Response(md, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
