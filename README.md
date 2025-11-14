# Flatsix - Used Cars Selling Website

![flatsixLogo7](https://github.com/Vancelott/Flatsix/assets/129599049/1190d29a-c3cc-477d-974d-ba89931178ec)

Flatsix is a web platform designed for buying and selling used cars. Built using Next.js, Tailwind CSS, Prisma, and MongoDB, this application offers a user-friendly experience for trading pre-owned vehicles. It integrates an authentication system using NextAuth.js and implements role-based access control for both users and administrators.

## Live Preview

Check out the live demo of Flatsix at: [https://flatsix.vercel.app/](https://flatsix.vercel.app/)

## Features

- **User Registration and Authentication**: Users can sign up and log in using their email or social media accounts. This provides access to personalized features such as creating listings and managing their account.

- **Listing Creation and Editing**: Sellers can easily create, edit, and manage their car listings. They can provide detailed information about the vehicle, including its make, model, price, and specifications.

- **Role-Based Access Control**: The platform differentiates between regular users and administrators. Administrators have access to an admin dashboard for generated reports and managing listings across the platform.

- **User Dashboard**: Each user has a personalized dashboard where they can view, edit, and delete their own listings.

- **Image Upload with Cloudinary**: Users can upload listing photos through Cloudinary integration, enhancing the visual appeal of their listings.

- **Drag-and-Drop Image Ordering with dnd-kit**: Utilize drag-and-drop functionality to rearrange listing images and showcase vehicles effectively.

- **Responsive Design**: Flatsix is designed to work smoothly on various screen sizes and devices, ensuring a consistent experience for users.

## Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/flatsix-cars.git
   ```

2. Navigate to the project directory:
   ```
   cd flatsix-cars
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Configure MongoDB:
   - Create a MongoDB database and obtain the connection URI.
   - Update the connection URI in the `.env` file.

5. Configure NextAuth.js:
   - Create an OAuth application on your preferred social media platform (Google, Facebook, etc.).
   - Update the NextAuth.js configuration in the `next-auth.js` file with your OAuth credentials.

6. Start the development server:
   ```
   npm run dev
   ```

7. Open the website in your browser:
   ```
   http://localhost:3000
   ```
## Screenshots

- **Homepage**

![image](https://github.com/Vancelott/Flatsix/assets/129599049/e48af6f1-4913-48aa-a3a5-50a5fc53afb3)

Explore a wide range of used cars available on Flatsix.

- **User Dashboard**

![image](https://github.com/Vancelott/Flatsix/assets/129599049/87f5e3ae-b2e2-4dd6-ac48-66e7623ed3ac)

Manage your listings in your personalized user dashboard.

- **Admin Dashboard**

![image](https://github.com/Vancelott/Flatsix/assets/129599049/9cce7813-e185-4ad5-a567-fd7166b5de01)

Administrators can generate reports and manage listings across the platform.

- **Admin Reports**

![image](https://github.com/Vancelott/Flatsix/assets/129599049/df60dd6e-b59c-42ae-89f7-abb794093162)

Administrators can also access the reports page for comprehensive data reports. 

- **Listing Creation**

![image](https://github.com/Vancelott/Flatsix/assets/129599049/51af92e4-ef0a-4fbd-afdf-09a71272e7ca)

Create detailed listings for the cars you want to sell.

- **Listing page**

![image](https://github.com/Vancelott/Flatsix/assets/129599049/19137ee7-03f8-4a8a-8147-04f7b0daf08d)

View details and images of a specific listing, including car specifications and seller information.

## Contributing

Contributions to Flatsix are welcome! If you encounter bugs, have feature suggestions, or want to make improvements, feel free to submit a pull request. Your contributions will help enhance the platform and make it better for everyone.
