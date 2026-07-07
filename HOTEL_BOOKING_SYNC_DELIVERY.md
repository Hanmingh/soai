# Hotel Booking External Sheet Sync Delivery Note

## Background

The hotel team needs real-time visibility into paid hotel bookings so they can arrange rooms accordingly.

The confirmed data flow is one-way:

```text
SoAI Database / soai-admin -> External Sheet for Hotel Team
```

There is no requirement for Google Forms, Microsoft Forms, Google Sheets, or Excel to write data back into the SoAI database.

## What Has Been Implemented

The SoAI backend now supports pushing paid hotel booking records to an external sheet endpoint.

Implemented behavior:

- When a hotel booking payment succeeds through Stripe, the backend writes the paid booking into `hotel_bookings`.
- After the database write succeeds, the backend pushes that booking to the configured external sheet endpoint.
- In soai-admin, hotel booking records can be manually backfilled to the external sheet with a `Sync to hotel sheet` button.
- If a hotel booking is deleted in soai-admin, the backend sends a delete sync event to the external sheet endpoint.

The external sheet remains a read-only operational view for the hotel team. The SoAI database remains the source of truth.

## Why Admin Access Helps Development

Access to the live admin data is useful because it allows us to:

- Verify the exact hotel booking records currently stored in production.
- Confirm field names and values such as guest name, email, room type, check-in/check-out dates, nights, amount, payment status, and Stripe session ID.
- Test the manual sync workflow against real data.
- Reconcile whether the external sheet has the same data as soai-admin.

However, admin access alone is not enough to complete the external sheet integration. The system still needs a destination endpoint to push data into.

## What Is Still Needed

We need the hotel/external-sheet side to provide one receiving URL:

```text
HOTEL_SHEET_SYNC_URL
```

This URL can be one of the following:

- A Google Apps Script Web App URL connected to a Google Sheet.
- A Microsoft Power Automate HTTP trigger connected to an Excel/OneDrive/SharePoint sheet.
- A custom webhook endpoint that writes received rows into any external sheet system.

Optional but recommended:

```text
HOTEL_SHEET_SYNC_SECRET
```

This is a shared secret used to verify that requests are coming from SoAI.

## Important Clarification

The current implementation does not automatically create a Google Sheet or Excel file.

The SoAI side now knows how to send hotel booking data out, but the receiving sheet or webhook must be created/provided by the hotel team or whoever owns the external sheet.

Once the receiving URL is provided, we can configure it in the Cloudflare Worker environment and run the first manual sync from soai-admin.

## Data Sent to the External Sheet

Each sync payload contains:

- Booking ID
- Email
- First name
- Last name
- Full name
- Room type
- Check-in date
- Check-out date
- Number of nights
- Arrival flight details
- Departure flight details
- Remarks
- Amount paid
- Currency
- Payment status
- Stripe session ID
- Stripe payment intent ID
- Paid timestamp
- Created timestamp
- Updated timestamp

## Sync Modes

The backend sends one of three sync modes:

```text
upsert
```

Sent automatically after a successful hotel booking payment. The external sheet should insert or update that booking row.

```text
full
```

Sent when an admin clicks `Sync to hotel sheet` in soai-admin. The external sheet should replace or reconcile all paid hotel booking rows.

```text
delete
```

Sent when an admin deletes a hotel booking in soai-admin. The external sheet should remove that row if present.

## Deployment Requirements

Before production use, configure these Cloudflare Worker variables/secrets:

```text
HOTEL_SHEET_SYNC_URL=<external receiving endpoint>
HOTEL_SHEET_SYNC_SECRET=<optional shared secret>
```

After configuration:

1. Deploy the backend Worker.
2. Open soai-admin.
3. Go to Events.
4. Open the Hotel Booking event.
5. Click `Sync to hotel sheet` to backfill existing paid bookings.
6. Confirm the external sheet contains the same booking records as soai-admin.

## Message to Request From the Hotel/Sheet Owner

Please provide the external sheet receiving endpoint for SoAI hotel booking synchronization.

The endpoint should accept a JSON `POST` request from the SoAI backend and write the received booking rows into the hotel team's Google Sheet, Excel sheet, or equivalent external table.

The sync direction is:

```text
SoAI Database -> External Sheet
```

No data needs to be written back into the SoAI database.

If using Google Sheets, please provide a deployed Google Apps Script Web App URL.
If using Microsoft Excel, please provide a Power Automate HTTP trigger URL.

Optionally, we can also configure a shared secret for request verification.
