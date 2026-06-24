# REST API Reference

This document provides documentation for all available endpoints inside the **Mystery Lab** FastAPI application backend.

---

## 🔑 Authentication & Headers
Protected endpoints require a valid Supabase JWT token passed in the `Authorization` header:
```http
Authorization: Bearer <JWT_TOKEN>
```

---

## 👥 Authentication & Profiles

### 1. Fetch User Profile
Returns the profile details associated with the authenticated user.
* **URL:** `/auth/profile/`
* **Method:** `GET`
* **Headers:** `Authorization: Bearer <token>`
* **Response (200 OK):**
  ```json
  {
    "id": "user-uuid-1234",
    "name": "Alex Mercer",
    "email": "alex@iiitd.ac.in",
    "avatar_url": null,
    "created_at": "2026-06-24T00:00:00Z",
    "updated_at": "2026-06-24T00:00:00Z"
  }
  ```

### 2. Create or Update User Profile
Creates or updates profile attributes for the authenticated user.
* **URL:** `/auth/profile/`
* **Method:** `POST`
* **Headers:** `Authorization: Bearer <token>`
* **Request Body:**
  ```json
  {
    "name": "Alex Mercer",
    "avatar_url": "https://images.example.com/avatar.jpg"
  }
  ```
* **Response (200 OK):**
  ```json
  {
    "status": "ok",
    "profile": {
      "id": "user-uuid-1234",
      "name": "Alex Mercer",
      "email": "alex@iiitd.ac.in",
      "avatar_url": "https://images.example.com/avatar.jpg"
    }
  }
  ```

---

## 📋 Public Forms & Queries

### 3. Submit Contact Enquiry
Stores a booking lead or message from visitors.
* **URL:** `/contact/`
* **Method:** `POST`
* **Request Body:**
  ```json
  {
    "name": "Alex Mercer",
    "email": "alex@iiitd.ac.in",
    "phone": "9999888877",
    "subject": "workshop",
    "message": "Enquiring about the next weekend lab session."
  }
  ```
* **Response (200 OK):**
  ```json
  {
    "status": "ok",
    "id": "enquiry-uuid-7777"
  }
  ```

### 4. Subscribe to Newsletter
Register email for notifications.
* **URL:** `/newsletter/`
* **Method:** `POST`
* **Request Body:**
  ```json
  {
    "email": "news@iiitd.ac.in"
  }
  ```
* **Response (200 OK):**
  ```json
  {
    "status": "ok"
  }
  ```

### 5. Fetch Science Kits Catalog
Retrieve available kits list.
* **URL:** `/kits/`
* **Method:** `GET`
* **Response (200 OK):**
  ```json
  [
    {
      "id": "starter",
      "name": "Starter Kit",
      "price": 99.0,
      "age_recommendation": "5-8 years"
    }
  ]
  ```

### 6. Fetch Experiments List
* **URL:** `/experiments/`
* **Method:** `GET`
* **Response (200 OK):**
  ```json
  [
    {
      "id": "exp-uuid-111",
      "title": "Volcanic Eruption",
      "difficulty": "Easy"
    }
  ]
  ```

---

## 🧪 User Interactions (Authenticated)

### 7. Create a Workshop Booking
* **URL:** `/booking/`
* **Method:** `POST`
* **Headers:** `Authorization: Bearer <token>`
* **Request Body:**
  ```json
  {
    "event_title": "Junior Scientist Subscription",
    "student_name": "Eleanor Jr.",
    "student_age": 9,
    "contact_phone": "9876543210",
    "preferred_date": "2026-07-01"
  }
  ```
* **Response (200 OK):**
  ```json
  {
    "status": "ok",
    "id": "booking-uuid-555"
  }
  ```

### 8. Submit Feedback/Review
* **URL:** `/feedback/`
* **Method:** `POST`
* **Headers:** `Authorization: Bearer <token>`
* **Request Body:**
  ```json
  {
    "name": "Alex Mercer",
    "rating": 5,
    "comments": "Amazing space-themed chemistry set!"
  }
  ```
* **Response (200 OK):**
  ```json
  {
    "status": "ok",
    "id": "feedback-uuid-888"
  }
  ```

### 9. Fetch Bookmarks List
* **URL:** `/bookmarks/`
* **Method:** `GET`
* **Headers:** `Authorization: Bearer <token>`
* **Response (200 OK):**
  ```json
  [
    {
      "id": "bookmark-uuid",
      "kit_id": "starter",
      "experiment_id": null
    }
  ]
  ```

### 10. Create Bookmark
* **URL:** `/bookmarks/`
* **Method:** `POST`
* **Headers:** `Authorization: Bearer <token>`
* **Request Body (Must provide kit_id OR experiment_id):**
  ```json
  {
    "kit_id": "starter"
  }
  ```
* **Response (200 OK):**
  ```json
  {
    "status": "ok",
    "id": "bookmark-uuid-999"
  }
  ```

### 11. Delete Bookmark
* **URL:** `/bookmarks/`
* **Method:** `DELETE`
* **Headers:** `Authorization: Bearer <token>`
* **Request Body:**
  ```json
  {
    "id": "bookmark-uuid-999"
  }
  ```
* **Response (200 OK):**
  ```json
  {
    "status": "ok"
  }
  ```

---

## 🛠️ Administrative Endpoints (Admin Only)
Requires a valid Bearer JWT of an admin user. Returns `403 Forbidden` for standard users.

### 12. Fetch All Bookings
* **URL:** `/admin/bookings/`
* **Method:** `GET`

### 13. Fetch All Enquiries
* **URL:** `/admin/enquiries/`
* **Method:** `GET`

### 14. Fetch All Newsletter Subscribers
* **URL:** `/admin/newsletter/`
* **Method:** `GET`

### 15. Create a New Science Kit
* **URL:** `/admin/kits/`
* **Method:** `POST`

### 16. Create a New Experiment
* **URL:** `/admin/experiments/`
* **Method:** `POST`

### 17. Fetch Administrative Activity Logs
* **URL:** `/admin/logs/`
* **Method:** `GET`
