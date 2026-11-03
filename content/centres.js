const affiliatedCentres = [
  'Khoja Masjid, Dongri',
  'Bandra Masjid',
  'H Nazarali Imambargah',
  'Arambaug Mosque, Masgaon',
  'Mehfil e Mustafa Andheri',
  'Jannat ul Hussain, Mumbra',
  'Mumbra Mehfil',
  'Suhana Mehfil',
  'Mehfile Sakka e Sakina, Mira Road',
  'Vasai Mehfil',
  'Palghar Mosque',
];

export function withAffiliatedCentres(markup) {
  const centresSection = /<section class="chapter centres-sec ground-forest"[^>]*>[\s\S]*?<\/section>/;
  if (!centresSection.test(markup)) {
    throw new Error('Could not find the homepage centres section to update.');
  }

  const cards = [
    `<article class="centre-card centre-card--office">
      <span class="centre-card__eyebrow">Jamaat Head Office</span>
      <h3>Dongri</h3>
      <p>66/70, Hazrat Abbas (a.s.) Street, Dongri, Mumbai 400 009</p>
    </article>`,
    ...affiliatedCentres.map((centre) => `<article class="centre-card"><h3>${centre}</h3></article>`),
  ].join('\n');

  return markup.replace(
    centresSection,
    `<section class="chapter centres-sec ground-forest" id="centres" data-sc-act="flow" data-chapter="centres" data-ground="forest">
      <div class="chapter__head" data-sc-in>
        <div class="label">Our Community Network</div>
        <h2 class="sc-display" style="margin-top:1rem">KSIJ Mumbai <em>Affiliated Centers.</em></h2>
      </div>
      <div class="centre-grid" data-sc-in data-sc-stagger="60" aria-label="KSIJ Mumbai affiliated centers">
        ${cards}
      </div>
    </section>`,
  );
}
