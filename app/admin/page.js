"use client";

import { useMemo, useState } from "react";
import { demoBookings } from "./admin-data";
import styles from "./admin.module.css";

export default function AdminPage() {
  const [bookings, setBookings] = useState(demoBookings);
  const [filter, setFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const counts = useMemo(() => ({
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "Pending").length,
    approved: bookings.filter((b) => b.status === "Approved").length,
    rejected: bookings.filter((b) => b.status === "Rejected").length,
  }), [bookings]);

  const filteredBookings = bookings.filter(
    (booking) => filter === "All" || booking.status === filter
  );

  function updateStatus(id, status) {
    setBookings((current) =>
      current.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      )
    );

    setSelectedBooking((current) =>
      current?.id === id ? { ...current, status } : current
    );
  }

  return (
    <main className={styles.dashboard}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>KSIJ MUMBAI Â· MANAGEMENT</p>
          <h1>Booking Administration</h1>
          <p className={styles.subtitle}>
            Review and manage venue booking requests.
          </p>
        </div>
        <div className={styles.adminLabel}>ADMIN PANEL</div>
      </header>

      <div className={styles.demoNotice}>
        <strong>DEMO MODE</strong>
        <span>
          These are sample bookings only. No real booking records are connected.
        </span>
      </div>

      <section className={styles.stats}>
        <article className={styles.statCard}>
          <span>Total Bookings</span>
          <strong>{counts.total.toString().padStart(2, "0")}</strong>
        </article>
        <article className={styles.statCard}>
          <span>Pending Review</span>
          <strong>{counts.pending.toString().padStart(2, "0")}</strong>
        </article>
        <article className={styles.statCard}>
          <span>Approved</span>
          <strong>{counts.approved.toString().padStart(2, "0")}</strong>
        </article>
        <article className={styles.statCard}>
          <span>Rejected</span>
          <strong>{counts.rejected.toString().padStart(2, "0")}</strong>
        </article>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h2>Booking Requests</h2>
            <p>Review the details and update request status.</p>
          </div>

          <select
            className={styles.filter}
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            aria-label="Filter bookings by status"
          >
            <option value="All">All bookings</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Applicant</th>
                <th>Venue</th>
                <th>Date</th>
                <th>Estimated Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className={styles.bookingId}>{booking.id}</td>
                  <td>
                    <strong>{booking.applicant}</strong>
                    <small>{booking.phone}</small>
                  </td>
                  <td>
                    <strong>{booking.venue}</strong>
                    <small>{booking.facility}</small>
                  </td>
                  <td>{new Date(`${booking.date}T00:00:00`).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}</td>
                  <td>â‚¹{booking.amount.toLocaleString("en-IN")}</td>
                  <td>
                    <span className={`${styles.status} ${styles[booking.status.toLowerCase()]}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className={styles.viewButton}
                      onClick={() => setSelectedBooking(booking)}
                    >
                      View details
                    </button>
                  </td>
                </tr>
              ))}

              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan="7" className={styles.empty}>
                    No bookings found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedBooking && (
        <div
          className={styles.overlay}
          onClick={() => setSelectedBooking(null)}
        >
          <section
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div>
                <p className={styles.eyebrow}>BOOKING DETAILS</p>
                <h2 id="booking-title">{selectedBooking.id}</h2>
              </div>
              <button
                className={styles.closeButton}
                onClick={() => setSelectedBooking(null)}
                aria-label="Close details"
              >
                Ã—
              </button>
            </div>

            <div className={styles.detailsGrid}>
              <div><span>Applicant</span><strong>{selectedBooking.applicant}</strong></div>
              <div><span>Phone</span><strong>{selectedBooking.phone}</strong></div>
              <div><span>Venue</span><strong>{selectedBooking.venue}</strong></div>
              <div><span>Facility</span><strong>{selectedBooking.facility}</strong></div>
              <div><span>Arrangement</span><strong>{selectedBooking.arrangement}</strong></div>
              <div><span>AC</span><strong>{selectedBooking.ac}</strong></div>
              <div><span>Date</span><strong>{selectedBooking.date}</strong></div>
              <div><span>Preferred time</span><strong>{selectedBooking.time}</strong></div>
              <div><span>Estimated amount</span><strong>â‚¹{selectedBooking.amount.toLocaleString("en-IN")}</strong></div>
              <div><span>Current status</span><strong>{selectedBooking.status}</strong></div>
            </div>

            <div className={styles.modalActions}>
              <button
                className={styles.rejectButton}
                onClick={() => updateStatus(selectedBooking.id, "Rejected")}
              >
                Reject
              </button>
              <button
                className={styles.approveButton}
                onClick={() => updateStatus(selectedBooking.id, "Approved")}
              >
                Approve
              </button>
            </div>
            <p className={styles.modalNote}>
              Demo only: status changes are temporary and are not saved to a database.
            </p>
          </section>
        </div>
      )}

      <footer className={styles.footer}>
        KSIJ Mumbai Â· Booking Administration Â· Local Preview
      </footer>
    </main>
  );
}
