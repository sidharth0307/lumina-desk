# Technical Decisions & Architecture

## Architecture Choices
- **MERN Stack:** Chosen for its unified JavaScript ecosystem, allowing rapid development within the 48-hour timeframe.
- **Context API over Redux:** For a project of this scope, Redux introduces unnecessary boilerplate. The Context API provided a clean, lightweight solution for managing global `Auth` and `Cart` states.
- **Tailwind CSS:** Enabled rapid implementation of the strict, premium design system and dark-mode aesthetic without context-switching to CSS files.

## Authentication Design
- Implemented **JSON Web Tokens (JWT)** for stateless authentication. 
- Passwords are securely hashed using `bcryptjs` before hitting the database.
- Used Axios Interceptors on the frontend to automatically attach the `Bearer` token to headers for protected routes, ensuring a seamless user experience.

## Performance & Security Optimizations (Mandatory Requirements)
1. **Debounced Search (Frontend):** Implemented a custom `useDebounce` hook. It waits 500ms after the user stops typing before firing the API request. This prevents the backend from being spammed with requests on every keystroke.
2. **Lean Queries (Backend):** Used Mongoose's `.lean()` method on the public `GET /products` route. This bypasses the instantiation of full Mongoose documents, returning plain JavaScript objects instead. It significantly reduces memory overhead and speeds up response times for the product catalog.
3. **Database-Level Filtering:** Pagination, sorting, and category filtering are executed directly in the MongoDB query rather than fetching all products and filtering them in memory on the server or client.
4. **Rate Limiting:** Implemented `express-rate-limit` on the backend API to prevent brute-force attacks and API abuse.

## Tradeoffs Made
- **Image Hosting:** Due to time constraints, I opted to use direct image URLs (e.g., Unsplash) rather than implementing a full AWS S3 or Cloudinary image upload pipeline.
- **Webhook Robustness:** While the webhook deducts stock accurately, a production app would need a background worker (like Redis/Bull) to handle webhook retries or race conditions if traffic spikes.

## Future Improvements
If given more time, I would implement:
1. Forgotten password / Email reset flow via SendGrid.
2. A user profile page to view past order history.
3. Product reviews and rating system.