import LegacyPage from '../../components/LegacyPage';
import { pageTitle, description, pageStyles, markup, scripts } from '../../content/qaumiSahayak.js';

export const metadata = { title: pageTitle, description };

export default function Page() {
  return <LegacyPage markup={markup} pageStyles={pageStyles} scripts={scripts} bodyClass="legacy-inner" />;
}
