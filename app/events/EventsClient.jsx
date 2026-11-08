
'use client';

import { useMemo, useState } from 'react';
import styles from './events.module.css';
import BookingSection from './BookingSection';

const VENUES = [
  {
    name: 'Aaram Baug',
    address: '52, Mount Road, Byculla East, Rambhau Bhogle Marg, Mumbai - 400010',
    mapQuery: '52 Mount Road, Byculla East, Mumbai 400010',
    image: 'aaram-baug.jpeg',
  },
  {
    name: 'Jannatul Hussain',
    address: 'Vista Valley, Daulat Nagar, Near New Sunni Kabrastan, Moulana Azad Road, Kausa, Mumbra, Thane, Maharashtra - 400612',
    mapQuery: 'Vista Valley, Daulat Nagar, Near New Sunni Kabrastan, Moulana Azad Road, Kausa, Mumbra, Thane, Maharashtra 400612',
    image: 'jannatul-hussain.jpeg',
  },
];

const SAMPLE_EVENTS = [];

export default function EventsClient() {
  const [search, setSearch] = useState('');
  const [venue, setVenue] = useState('All');
  const [category, setCategory] = useState('All');
  const [activeVenue, setActiveVenue] = useState(null);

  const events = useMemo(() => SAMPLE_EVENTS.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
    const matchesVenue = venue === 'All' || event.venue === venue;
    const matchesCategory = category === 'All' || event.category === category;

    return matchesSearch && matchesVenue && matchesCategory;
  }), [search, venue, category]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>KSIJ MUMBAI</p>
        <h1>Community Events</h1>
        <p>Gather together. Celebrate faith. Strengthen our community.</p>
      </section>

      <section className={styles.content}>
        <section className={styles.venuesSection}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>OUR LOCATIONS</p>
            <h2>Our Venues</h2>
            <p>Explore our community venues and their locations.</p>
          </div>

          <div className={styles.venueGrid}>
            {VENUES.map((item) => (
              <button
                type="button"
                className={styles.venueCard}
                key={item.name}
                onClick={() => setActiveVenue(item)}
                style={{
                  backgroundImage: `
                    linear-gradient(
                      rgba(8, 30, 19, 0.55),
                      rgba(8, 30, 19, 0.78)
                    ),
                    url('/images/${item.image}')
                  `,
                }}
              >
                <span className={styles.venueLabel}>KSIJ VENUE</span>
                <span className={styles.venueName}>{item.name}</span>
                <span className={styles.venueAction}>
                  View address & map ↗
                </span>
              </button>
            ))}
          </div>
        </section>

        <div className={styles.eventsHeading}>
          <p className={styles.eyebrow}>WHAT'S HAPPENING</p>
          <h2>Upcoming Events</h2>
        </div>

        <div className={styles.filters}>
          <input
            type="search"
            placeholder="Search events..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={venue}
            onChange={(event) => setVenue(event.target.value)}
          >
            <option value="All">All Venues</option>
            {VENUES.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="All">All Categories</option>
            {[
              'Majlis',
              'Matam',
              'Azadari',
              'Mehfil',
              'Education',
              'Charity',
              'Community',
            ].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.eventGrid}>
          {events.length === 0 ? (
            <div className={styles.empty}>
              <h2>Events coming soon</h2>
              <p>Upcoming community events will appear here.</p>
            </div>
          ) : (
            events.map((event) => (
              <article className={styles.eventCard} key={event.id}>
                <p>{event.category}</p>
                <h2>{event.title}</h2>
                <p>{event.date} · {event.time}</p>
                <p>{event.venue}</p>
              </article>
            ))
          )}
        </div>
      </section>

      <BookingSection />

      {activeVenue && (
        <div
          className={styles.modalOverlay}
          onClick={() => setActiveVenue(null)}
        >
          <section
            className={styles.venueModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="venue-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setActiveVenue(null)}
              aria-label="Close venue details"
            >
              ×
            </button>

            <p className={styles.eyebrow}>KSIJ VENUE</p>

            <h2 id="venue-modal-title">{activeVenue.name}</h2>

            <p className={styles.addressLabel}>FULL ADDRESS</p>

            <p className={styles.venueAddress}>
              {activeVenue.address}
            </p>

            {activeVenue.mapQuery ? (
              <iframe
                className={styles.mapFrame}
                title={`${activeVenue.name} map`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(activeVenue.mapQuery)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className={styles.mapPending}>
                Map preview will appear once the exact location is confirmed.
              </div>
            )}

            {activeVenue.mapQuery && (
              <a
                className={styles.directionsLink}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeVenue.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
              >
                Get Directions ↗
              </a>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
