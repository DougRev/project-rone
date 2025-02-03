# Project-Rone

Project-Rone is a Windows 95–inspired website built with [Next.js](https://nextjs.org/) using the App Router and styled with [Tailwind CSS](https://tailwindcss.com/). It features a desktop-like homepage with clickable icons that navigate to different sections of the site, and an authentic Windows 95 Start Bar used as a footer that includes social media links.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Windows 95 Theme:** Emulates the classic Windows 95 desktop and Start Bar.
- **Desktop Navigation:** The homepage displays icons that serve as navigation links to various pages.
- **Footer with Socials:** A Start Bar–styled footer with an inset box for social media links (Instagram, TikTok, X, and one additional placeholder).
- **Responsive Design:** Basic responsiveness is handled via Tailwind CSS.
- **Placeholder Pages:** Includes placeholder pages for future content expansion.

## Project Structure

project-rone/ ├── package.json ├── next.config.js ├── postcss.config.js ├── tailwind.config.js ├── README.md ├── public/ │ └── icons/ │ ├── barstool.png │ ├── trash.png │ ├── placeholder.png │ ├── instagram.png │ ├── tiktok.png │ ├── x.png │ └── other.png └── src/ └── app/ ├── globals.css ├── layout.tsx ├── page.tsx ├── components/ │ └── Footer.tsx ├── barstool-things/ │ └── page.tsx ├── trash-bin/ │ └── page.tsx └── placeholder/ └── page.tsx

markdown
Copy code

- **`public/icons/`**: Place your Windows 95–style icons and social media icons here.
- **`src/app/globals.css`**: Global styles and Tailwind CSS imports.
- **`src/app/layout.tsx`**: Root layout that wraps every page. Includes the Start Bar footer.
- **`src/app/page.tsx`**: The homepage that mimics a Windows 95 desktop with navigation icons.
- **`src/app/components/Footer.tsx`**: The Start Bar–styled footer with a Start button and social media links.
- **Individual page folders**: Each route (like `/barstool-things`, `/trash-bin`, `/placeholder`) has its own folder and a `page.tsx`.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/project-rone.git
   cd project-rone
Install Dependencies:

Make sure you have Node.js installed. Then run:

bash
Copy code
npm install
Usage
Run the Development Server:

Start the development server with:

bash
Copy code
npm run dev
Open the Site:

Open your browser and navigate to http://localhost:3000 to view the site.

Build for Production:

To build the project for production, run:

bash
Copy code
npm run build
npm run start
Customization
Tailwind CSS:
Modify tailwind.config.js to adjust the color palette, fonts, or other theme settings to further enhance the Windows 95 aesthetic.

Icons & Images:
Replace the placeholder icons in the public/icons/ folder with your own images to personalize the navigation and social media icons.

Pages:
Update or add new pages by creating additional folders inside src/app/ with a page.tsx file.

Footer:
Customize the footer component in src/app/components/Footer.tsx if you wish to change the layout or add more social media links.

Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request if you have suggestions or improvements.

Fork the repository.
Create a new branch for your feature or bug fix.
Commit your changes and open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for more details.

yaml
Copy code

---

This `README.md` includes all necessary information regarding project setup, structure, usage, and customization. You can further modify it to better fit any changes you make as you continue developing your Windows 95–themed website.





