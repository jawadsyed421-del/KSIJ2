export const historyMarkup = `
  <section class="chapter heritage-story ground-paper" id="heritage" data-sc-act="flow" data-chapter="heritage" data-ground="paper">
    <div class="heritage-story__heading" data-sc-in>
      <div>
        <div class="label">Our roots</div>
        <h2 class="sc-display">The past is not distant.<br><em>It lives in us.</em></h2>
      </div>
      <p>Turn each chapter to discover a story from our community's journey.</p>
    </div>

    <div class="heritage-story__chapters" aria-label="Explore our community history">
      <article class="heritage-card">
        <div class="heritage-card__inner">
          <div class="heritage-card__face heritage-card__front">
            <span class="heritage-card__chapter">CHAPTER 01</span>
            <span class="heritage-card__ornament" aria-hidden="true">✦</span>
            <span class="heritage-card__year">c. 600</span>
            <span class="heritage-card__year-label">YEARS AGO</span>
            <h3>A journey begins</h3>
            <button type="button" class="heritage-card__flip" data-history-flip aria-expanded="false">Turn card <span aria-hidden="true">↻</span></button>
          </div>
          <div class="heritage-card__face heritage-card__back">
            <span class="heritage-card__chapter">CHAPTER 01 · THE BEGINNING</span>
            <h3>A journey begins</h3>
            <p>Pir Sadruddin arrived in Sind around six centuries ago. His origins are described differently in historical accounts.</p>
            <button type="button" class="heritage-card__read" data-history-read="#history-story-one">Read More <span aria-hidden="true">→</span></button>
            <button type="button" class="heritage-card__flip heritage-card__flip--back" data-history-flip aria-expanded="true">Turn back <span aria-hidden="true">↻</span></button>
          </div>
        </div>
      </article>

      <article class="heritage-card heritage-card--remember">
        <div class="heritage-card__inner">
          <div class="heritage-card__face heritage-card__front">
            <span class="heritage-card__chapter">CHAPTER 02</span>
            <span class="heritage-card__ornament" aria-hidden="true">✦</span>
            <span class="heritage-card__year">1901</span>
            <span class="heritage-card__year-label">A SACRIFICE REMEMBERED</span>
            <h3>A sacrifice remembered</h3>
            <button type="button" class="heritage-card__flip" data-history-flip aria-expanded="false">Turn card <span aria-hidden="true">↻</span></button>
          </div>
          <div class="heritage-card__face heritage-card__back">
            <span class="heritage-card__chapter">CHAPTER 02 · IN REMEMBRANCE</span>
            <h3>A sacrifice remembered</h3>
            <p>Sheth Hirjeebhoy Allarakhia and Sheth Laljeebhoy Sajan were martyred while protecting the Khoja Masjid.</p>
            <button type="button" class="heritage-card__read" data-history-read="#history-story-two">Read More <span aria-hidden="true">→</span></button>
            <button type="button" class="heritage-card__flip heritage-card__flip--back" data-history-flip aria-expanded="true">Turn back <span aria-hidden="true">↻</span></button>
          </div>
        </div>
      </article>
    </div>

    <div class="heritage-story__ending"><span aria-hidden="true">✦</span> Remembering where we come from. Building what comes next.</div>

    <div class="heritage-story__full-stories" hidden>
      <article id="history-story-one">
        <span class="heritage-modal__eyebrow">CHAPTER 01 · OUR ROOTS</span>
        <h2>A journey begins</h2>
        <p>Pir Sadruddin arrived in Sind around six centuries ago. Historians differ on his origins: the most widely held view describes him as a Dai (representative or emissary) of the Nizari Ismaili tradition; some accounts suggest he was a Sufi teacher from Iran.</p>
        <p class="heritage-modal__note">A story with more than one historical account.</p>
      </article>
      <article id="history-story-two">
        <span class="heritage-modal__eyebrow">CHAPTER 02 · 1901</span>
        <h2>A sacrifice remembered</h2>
        <p>Sheth Hirjeebhoy Allarakhia and Sheth Laljeebhoy Sajan were martyred while protecting the Khoja Masjid.</p>
        <div class="heritage-modal__dua">
          <p>Kindly recite Surah Fatiha for Amar Shaheed Marhoom Sheth Hirjeebhoy Allarakhia and Marhoom Sheth Laljeebhoy Sajan.</p>
        </div>
      </article>
    </div>

    <div class="heritage-modal" data-history-modal hidden role="dialog" aria-modal="true" aria-label="Community history">
      <div class="heritage-modal__card">
        <button type="button" class="heritage-modal__close" data-history-close aria-label="Close history">×</button>
        <div class="heritage-modal__content" data-history-modal-content></div>
        <div class="heritage-modal__footer">KSIJ MUMBAI · OUR SHARED HERITAGE</div>
      </div>
    </div>
  </section>
`;

export function withInteractiveHistory(markup) {
  const historySection = /<section class="chapter heritage ground-paper"[^>]*>[\s\S]*?<\/section>/;
  if (!historySection.test(markup)) {
    throw new Error('Could not find the homepage history section to enhance.');
  }

  return markup.replace(historySection, historyMarkup);
}
