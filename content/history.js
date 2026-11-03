export const historyMarkup = `
  <section class="chapter heritage-story ground-paper" id="heritage" data-sc-act="flow" data-chapter="heritage" data-ground="paper">
    <div class="heritage-story__heading" data-sc-in>
      <div>
        <div class="label">Our roots</div>
        <h2 class="sc-display">The past is not distant.<br><em>It lives in us.</em></h2>
      </div>
      <p>Two moments in our community's journey. Open a chapter, discover a story, and carry it forward.</p>
    </div>

    <div class="heritage-story__chapters" aria-label="Explore our community history">
      <details class="heritage-story__chapter" name="community-history" open>
        <summary>
          <span class="heritage-story__chapter-no">Chapter 01</span>
          <span class="heritage-story__year">c. 600 years ago</span>
          <span class="heritage-story__title">A journey begins</span>
          <span class="heritage-story__toggle"><span>Explore story</span><span class="heritage-story__icon" aria-hidden="true">+</span></span>
        </summary>
        <div class="heritage-story__reveal">
          <p>Pir Sadruddin arrived in Sind around six centuries ago. Historians differ on his origins: the most widely held view describes him as a Dai (representative or emissary) of the Nizari Ismaili tradition; some accounts suggest he was a Sufi teacher from Iran.</p>
          <span class="heritage-story__footnote">A story with more than one historical account</span>
        </div>
      </details>

      <details class="heritage-story__chapter heritage-story__chapter--remember" name="community-history">
        <summary>
          <span class="heritage-story__chapter-no">Chapter 02</span>
          <span class="heritage-story__year">1901</span>
          <span class="heritage-story__title">A sacrifice remembered</span>
          <span class="heritage-story__toggle"><span>Explore story</span><span class="heritage-story__icon" aria-hidden="true">+</span></span>
        </summary>
        <div class="heritage-story__reveal">
          <p>Sheth Hirjeebhoy Allarakhia and Sheth Laljeebhoy Sajan were martyred while protecting the Khoja Masjid.</p>
          <div class="heritage-story__dua">
            <span class="heritage-story__dua-mark" aria-hidden="true">۞</span>
            <p>Kindly recite Surah Fatiha for Amar Shaheed Marhoom Sheth Hirjeebhoy Allarakhia and Marhoom Sheth Laljeebhoy Sajan.</p>
          </div>
        </div>
      </details>
    </div>
    <div class="heritage-story__ending"><span aria-hidden="true">✦</span> Remembering where we come from. Building what comes next.</div>
  </section>
`;

export function withInteractiveHistory(markup) {
  const historySection = /<section class="chapter heritage ground-paper"[^>]*>[\s\S]*?<\/section>/;
  if (!historySection.test(markup)) {
    throw new Error('Could not find the homepage history section to enhance.');
  }

  return markup.replace(historySection, historyMarkup);
}
