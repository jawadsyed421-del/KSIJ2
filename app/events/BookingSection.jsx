
'use client';

import { useMemo, useRef, useState } from 'react';

const RATES = {
  'Aaram Baug': {
    'Gents – Masjid & Shahen': {
      'Food Packet': { noAc: 1000, ac: 2000 },
      'Niyaz Serving': { noAc: 3000, ac: 4000 },
    },
    'Gents & Ladies Hall': {
      'Food Packet': { noAc: 5500, ac: 6000 },
      'Niyaz Serving': { noAc: 6500, ac: 7500 },
    },
  },
  'Jannatul Hussain': {
    'Gents Hall': {
      'Food Packet': { noAc: 750, ac: 2000 },
      'Niyaz Serving': { noAc: 1500, ac: 3000 },
    },
    'Gents & Ladies Hall': {
      'Food Packet': { noAc: 1500, ac: 4000 },
      'Niyaz Serving': { noAc: 3000, ac: 5000 },
    },
  },
};

const money = (amount) => `₹${amount.toLocaleString('en-IN')}`;

export default function BookingSection() {
  const [venue, setVenue] = useState('Aaram Baug');
  const [facility, setFacility] = useState('Gents – Masjid & Shahen');
  const [service, setService] = useState('Food Packet');
  const [ac, setAc] = useState(false);
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [extraHours, setExtraHours] = useState(0);
  const [memberConfirmed, setMemberConfirmed] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [tourZoom, setTourZoom] = useState(1);

  const panoramaDragRef = useRef(null);

  const facilities = Object.keys(RATES[venue]);
  const services = Object.keys(RATES[venue][facility]);
  const isJannatul = venue === 'Jannatul Hussain';
  const isLadiesHall = facility === 'Gents & Ladies Hall' && isJannatul;
  const acAllowed = !isLadiesHall;

  const base = RATES[venue][facility][service][ac && acAllowed ? 'ac' : 'noAc'];

  const cleaning =
    venue === 'Aaram Baug' &&
    facility === 'Gents & Ladies Hall' &&
    service === 'Niyaz Serving'
      ? 500
      : 0;

  const extension = extraHours * 500;
  const total = base + cleaning + extension;

  const slots = useMemo(() => {
    if (isJannatul) {
      return ['Timing to be confirmed by Jamaat Office'];
    }

    return [
      'Afternoon · 12 PM – 3 PM',
      'Evening · Maghribain Namaz – 10:30 PM',
    ];
  }, [isJannatul]);

  function changeVenue(value) {
    setVenue(value);
    setFacility(Object.keys(RATES[value])[0]);
    setService('Food Packet');
    setAc(false);
    setSlot('');
    setExtraHours(0);
  }

  function changeFacility(value) {
    setFacility(value);
    setService('Food Packet');
    setAc(false);
  }

  // Desktop mouse drag controls
  function handlePanStart(e) {
    if (e.pointerType !== 'mouse') return;

    panoramaDragRef.current = {
      startX: e.clientX,
      scrollLeft: e.currentTarget.scrollLeft,
      pointerId: e.pointerId,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.style.cursor = 'grabbing';
  }

  function handlePanMove(e) {
    const drag = panoramaDragRef.current;

    if (!drag || drag.pointerId !== e.pointerId) return;

    e.currentTarget.scrollLeft =
      drag.scrollLeft - (e.clientX - drag.startX);
  }

  function handlePanEnd(e) {
    panoramaDragRef.current = null;

    if (e.currentTarget) {
      e.currentTarget.style.cursor = 'grab';
    }
  }

  const tourButtonStyle = {
    border: '1px solid #98752e',
    borderRadius: 8,
    padding: '9px 16px',
    background: '#173b2a',
    color: '#fffdf8',
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    minWidth: 42,
  };

  return (
    <section
      style={{
        marginTop: 56,
        padding: '32px 0',
        borderTop: '1px solid #d8d0bf',
      }}
    >
      <div style={{ maxWidth: 850, margin: '0 auto' }}>
        <p
          style={{
            color: '#98752e',
            letterSpacing: 2,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          VENUE RESERVATIONS
        </p>

        <h2
          style={{
            fontFamily: 'Fraunces, Georgia, serif',
            fontSize: 'clamp(30px, 5vw, 44px)',
            margin: '8px 0',
          }}
        >
          Book a Venue
        </h2>

        <p style={{ color: '#62665e', marginBottom: 28 }}>
          Select your venue and requirements to calculate the Hadiya.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))',
            gap: 18,
          }}
        >
          <label style={fieldStyle}>
            Venue

            <select
              style={controlStyle}
              value={venue}
              onChange={(e) => changeVenue(e.target.value)}
            >
              <option>Aaram Baug</option>
              <option>Jannatul Hussain</option>
            </select>

            <button
              type="button"
              onClick={() => {
                setTourZoom(1);
                setShowTour(true);
              }}
              style={{
                ...buttonStyle,
                marginTop: 4,
                padding: 11,
                background: '#98752e',
              }}
            >
              View Venue Panorama
            </button>
          </label>

          <label style={fieldStyle}>
            Facility

            <select
              style={controlStyle}
              value={facility}
              onChange={(e) => changeFacility(e.target.value)}
            >
              {facilities.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label style={fieldStyle}>
            Niyaz arrangement

            <select
              style={controlStyle}
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              {services.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label style={fieldStyle}>
            Air conditioning

            <select
              style={controlStyle}
              value={ac ? 'yes' : 'no'}
              onChange={(e) => setAc(e.target.value === 'yes')}
              disabled={!acAllowed}
            >
              <option value="no">Without AC</option>
              <option value="yes" disabled={!acAllowed}>
                With AC
              </option>
            </select>

            {isLadiesHall && (
              <small style={{ color: '#8b5b28' }}>
                Ladies Hall is non-air-conditioned.
              </small>
            )}
          </label>

          <label style={fieldStyle}>
            Preferred date

            <input
              style={controlStyle}
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <label style={fieldStyle}>
            Preferred time slot

            <select
              style={controlStyle}
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
            >
              <option value="">Select a time slot</option>

              {slots.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>

        <div
          style={{
            marginTop: 24,
            padding: 22,
            borderRadius: 14,
            background: '#ebe6d9',
            color: '#15251b',
          }}
        >
          <h3
            style={{
              fontFamily: 'Fraunces, Georgia, serif',
              fontSize: 24,
              margin: '0 0 16px',
            }}
          >
            Hadiya Estimate
          </h3>

          <PriceLine label="Base Hadiya" amount={base} />

          {cleaning > 0 && (
            <PriceLine label="Additional cleaning" amount={cleaning} />
          )}

          {venue === 'Aaram Baug' && ac && (
            <label style={{ ...fieldStyle, marginTop: 16 }}>
              Additional AC hours after 10:30 PM

              <select
                style={controlStyle}
                value={extraHours}
                onChange={(e) => setExtraHours(Number(e.target.value))}
              >
                <option value={0}>No extension</option>
                <option value={1}>1 hour · ₹500</option>
              </select>

              <small>
                Extension is subject to approval and cannot go beyond 11:30 PM.
              </small>
            </label>
          )}

          {venue === 'Jannatul Hussain' && ac && (
            <p style={{ fontSize: 13, color: '#62665e' }}>
              AC beyond 2.5 hours: ₹500 per additional hour. Final amount will
              be confirmed by the Jamaat Office.
            </p>
          )}

          <div
            style={{
              borderTop: '1px solid #c9c0ad',
              marginTop: 16,
              paddingTop: 14,
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 800,
              fontSize: 20,
            }}
          >
            <span>Estimated total</span>
            <span>{money(total)}</span>
          </div>

          <small
            style={{
              display: 'block',
              marginTop: 10,
              color: '#62665e',
            }}
          >
            Final Hadiya and any applicable additional charges are subject to
            Jamaat Office confirmation.
          </small>
        </div>

        <div
          style={{
            marginTop: 22,
            padding: 20,
            border: '1px solid #d8d0bf',
            borderRadius: 14,
          }}
        >
          <label
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            <input
              type="checkbox"
              checked={memberConfirmed}
              onChange={(e) => setMemberConfirmed(e.target.checked)}
              style={{ marginTop: 4 }}
            />

            I confirm that I am a KSI Jamaat member and have read the venue
            booking terms and conditions.
          </label>

          <p
            style={{
              fontSize: 13,
              color: '#62665e',
              margin: '14px 0 0',
            }}
          >
            {isJannatul
              ? 'Jannatul Hussain booking timings and date availability must be confirmed by the Jamaat Office.'
              : 'Aaram Baug offers afternoon and evening slots. Evening bookings are subject to Maghribain Namaz timing.'}{' '}
            Mayyat bookings receive priority at both venues.
          </p>

          <button
            type="button"
            disabled={!memberConfirmed || !date || !slot}
            style={{
              ...buttonStyle,
              opacity: !memberConfirmed || !date || !slot ? 0.5 : 1,
              cursor:
                !memberConfirmed || !date || !slot
                  ? 'not-allowed'
                  : 'default',
            }}
          >
            Booking request · Coming soon
          </button>

          <small style={{ display: 'block', marginTop: 9, color: '#777' }}>
            This is currently a price estimator, not a confirmed reservation.
            Online submission will be enabled after the availability and
            booking system is connected.
          </small>
        </div>
      </div>

      {showTour && (
        <div
          onClick={() => setShowTour(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(10, 20, 14, 0.88)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 18,
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${venue} venue panorama`}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 900,
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#fffdf8',
              borderRadius: 18,
              padding: 22,
              color: '#173b2a',
              boxShadow: '0 20px 70px rgba(0,0,0,.3)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div>
                <p
                  style={{
                    color: '#98752e',
                    fontSize: 11,
                    letterSpacing: 2,
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  VIRTUAL VENUE TOUR
                </p>

                <h2
                  style={{
                    fontFamily: 'Fraunces, Georgia, serif',
                    fontSize: 28,
                    margin: '6px 0',
                  }}
                >
                  {venue}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowTour(false)}
                aria-label="Close tour"
                style={{
                  border: '1px solid #d8d0bf',
                  background: '#fff',
                  borderRadius: 8,
                  padding: '9px 14px',
                  cursor: 'pointer',
                }}
              >
                ✕ Close
              </button>
            </div>

            {venue === 'Aaram Baug' ? (
              <div style={{ marginTop: 18 }}>
                <div
                  role="region"
                  aria-label="Aaram Baug panoramic venue photograph"
                  tabIndex={0}
                  onPointerDown={handlePanStart}
                  onPointerMove={handlePanMove}
                  onPointerUp={handlePanEnd}
                  onPointerCancel={handlePanEnd}
                  style={{
                    width: '100%',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    borderRadius: 12,
                    background: '#10251b',
                    cursor: 'grab',
                    touchAction: 'pan-x',
                    userSelect: 'none',
                  }}
                >
                  <img
                    src="/images/aaram-baug-panorama.jpeg"
                    alt="Panoramic view of Aaram Baug Masjid"
                    draggable="false"
                    style={{
                      display: 'block',
                      height: `${320 * tourZoom}px`,
                      width: 'auto',
                      maxWidth: 'none',
                      objectFit: 'contain',
                      transition: 'height 180ms ease',
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 12,
                    flexWrap: 'wrap',
                    marginTop: 16,
                  }}
                >
                  <button
                    type="button"
                    aria-label="Zoom out"
                    disabled={tourZoom <= 0.75}
                    onClick={() =>
                      setTourZoom((z) =>
                        Math.max(0.75, +(z - 0.25).toFixed(2))
                      )
                    }
                    style={{
                      ...tourButtonStyle,
                      opacity: tourZoom <= 0.75 ? 0.45 : 1,
                    }}
                  >
                    −
                  </button>

                  <span
                    style={{
                      minWidth: 60,
                      textAlign: 'center',
                      fontWeight: 700,
                      color: '#173b2a',
                    }}
                  >
                    {Math.round(tourZoom * 100)}%
                  </span>

                  <button
                    type="button"
                    aria-label="Zoom in"
                    disabled={tourZoom >= 2}
                    onClick={() =>
                      setTourZoom((z) =>
                        Math.min(2, +(z + 0.25).toFixed(2))
                      )
                    }
                    style={{
                      ...tourButtonStyle,
                      opacity: tourZoom >= 2 ? 0.45 : 1,
                    }}
                  >
                    +
                  </button>

                  <button
                    type="button"
                    onClick={() => setTourZoom(1)}
                    style={{
                      ...tourButtonStyle,
                      background: '#98752e',
                    }}
                  >
                    Reset View
                  </button>
                </div>

                <p
                  style={{
                    textAlign: 'center',
                    color: '#62665e',
                    fontSize: 13,
                    lineHeight: 1.6,
                    marginTop: 12,
                  }}
                >
                  Desktop: click and drag to explore. Mobile: swipe horizontally.
                  Use + and − to zoom.
                  <br />
                  This is a panoramic photograph, not a full 360° capture.
                </p>
              </div>
            ) : (
              <div
                style={{
                  marginTop: 18,
                  minHeight: 300,
                  borderRadius: 12,
                  background: '#e9e4d7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: 24,
                }}
              >
                <div>
                  <h3 style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
                    Panorama Coming Soon
                  </h3>

                  <p>
                    Jannatul Hussain venue photography will be added soon.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function PriceLine({ label, amount }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 12,
        padding: '5px 0',
        fontSize: 14,
      }}
    >
      <span>{label}</span>
      <strong>{money(amount)}</strong>
    </div>
  );
}

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  fontSize: 14,
  fontWeight: 650,
  color: '#26352b',
};

const controlStyle = {
  width: '100%',
  minHeight: 44,
  border: '1px solid #c9c0ad',
  borderRadius: 8,
  padding: '10px 12px',
  background: '#fffdf8',
  color: '#17251c',
  font: 'inherit',
};

const buttonStyle = {
  marginTop: 18,
  width: '100%',
  border: 0,
  borderRadius: 8,
  padding: 14,
  background: '#173b2a',
  color: '#fff',
  fontWeight: 700,
};
