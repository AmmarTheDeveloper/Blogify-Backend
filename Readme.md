# Blogify

Blogify is a dynamic blogging platform designed to simplify the art of content creation and discovery. With a sleek interface and powerful features, Blogify empowers users to effortlessly share their thoughts, connect with others, and explore a world of captivating content.

Built on the robust MERN stack and styled with Tailwind CSS, Blogify prioritizes functionality without compromising on aesthetics. Whether you're a seasoned blogger or just starting out, Blogify provides the tools and community you need to thrive in the digital landscape. Join Blogify today and unleash your creativity!

## Features

### Authentication

Blogify ensures secure access to your account with robust authentication using JWT (JSON Web Tokens). This means only authorized users can log in and access the platform, providing a safe environment for sharing content.

### Password Hashing

Blogify employs password hashing to enhance security and protect user credentials. When a user creates an account or updates their password, the password is hashed and securely stored in the database. This ensures that plain-text passwords are never saved and makes it significantly harder for unauthorized parties to gain access to user accounts.

### Password Management

Forgot your password? No problem! With Blogify's password management feature, users can easily reset their passwords. An OTP (One-Time Password) is sent to the user's registered email address for verification, ensuring a seamless and secure password recovery process.

### Account Settings

Customize your profile to reflect your personality with Blogify's account settings feature. Users can update their password and display name, giving them control over their online identity and enhancing their user experience.

### Blogs Page

Explore a diverse array of content on Blogify's blogs page. Discover blogs from other users covering a wide range of topics, from travel and lifestyle to technology and fashion, allowing you to find content that resonates with your interests.

### My Blogs Section

Keep track of your own published blogs with Blogify's "My Blogs" section. Easily manage and access your content in one centralized location, making it convenient to monitor your blogging journey and engage with your audience.

### Blog Management

Create, delete, and edit your blogs effortlessly with Blogify's intuitive blog management feature. Whether you're crafting a new masterpiece or fine-tuning an existing post, Blogify provides the tools you need to bring your ideas to life.

### Comments

Engage with other users and foster meaningful discussions with Blogify's comments feature. Leave comments on other users' blogs to share your thoughts and perspectives, creating a sense of community and connection within the platform.

### Profile Customization

Personalize your profile to make it uniquely yours with Blogify's profile customization feature. Upload a profile image that reflects your personality and interests, allowing you to stand out and make a lasting impression on other users.

### Simple Categorization

Discover new content effortlessly with Blogify's simple categorization feature. Browse through intuitive categories such as "Travel," "Food," "Technology," and more, making it easy to find blogs that pique your curiosity and inspire your creativity.

## Installation

#### For Frontend code refer this reposiratory :

```
https://github.com/AmmarTheDeveloper/Blogify-Backend
```

#### For Backend code refer this reposiratory :

```
https://github.com/AmmarTheDeveloper/Blogify-Backend
```

Follow these steps to get Blogify up and running on your local machine.

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Backend Setup

1. Clone the repository:

   ```
   git clone https://github.com/AmmarTheDeveloper/Blogify-Backend.git
   cd blogify/backend
   npm install
   ```

2. run:

```
npm run dev
```

3. Get out from the backend folder.

```
cd ..
```

### Frontend Setup

1. Clone the repository:

```
   git clone https://github.com/AmmarTheDeveloper/Blogify-Frontend.git
   cd blogify/frontend
   npm install
```

2. run:

```
npm run dev
```

### Docker Setup

- Pull Image from docker hub and docker compose and other configuration are explained in detail on docker hub go and checkout

```
https://hub.docker.com/repository/docker/ammarthedeveloper/blogify
```
