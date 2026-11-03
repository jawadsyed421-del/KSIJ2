import LegacyPage from '../components/LegacyPage';
import { pageTitle, description, pageStyles, markup, scripts } from '../content/home.js';
import { withAffiliatedCentres } from '../content/centres';
import { withInteractiveHistory } from '../content/history';

export const metadata = { title: pageTitle, description };

export default function Page() {
  const pageMarkup = withAffiliatedCentres(withInteractiveHistory(markup));
  return <LegacyPage markup={pageMarkup} pageStyles={pageStyles} scripts={scripts} bodyClass="legacy-home" />;
}
