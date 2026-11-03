import PageScripts from './PageScripts';

export default function LegacyPage({ markup, pageStyles, scripts, bodyClass = 'legacy-home' }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <div className={bodyClass} dangerouslySetInnerHTML={{ __html: markup }} />
      <PageScripts scripts={scripts} />
    </>
  );
}
