# 🚀 Swipe Savvy — Freemium Landing Flow

This is a full-stack web application built as part of a 3-day technical assessment. It showcases a multi-step onboarding flow for small businesses to join the Swipe Savvy Rewards Network.

🔗 **Live Demo:** [Visit Live Site](https://swipe-savvy-pied.vercel.app/)

---

## 🧠 Overview

**Swipe Savvy** allows local businesses to:

- ✅ Claim their listing using Google Places
- 📇 Verify their business details
- 📝 Create an account
- 📜 Agree to terms of participation
- 🎉 Receive confirmation & choose to upgrade to a premium listing

---

## 💻 Tech Stack

| Layer      | Technology                                  |
|------------|----------------------------------------------|
| Frontend   | Next.js (App Router), Tailwind CSS, Framer Motion |
| Backend    | Next.js API Routes                           |
| Database   | Supabase (PostgreSQL)                        |
| Payments   | Stripe Checkout                              |
| Email      | Resend API (Transactional welcome email)     |
| Location   | Google Places Autocomplete API               |
| Hosting    | Vercel                                        |

---

## 🧭 User Flow (5 Steps)

1. **Hero Section (Business Search)**  
   - Google Places API integration  
   - Autocomplete business by name/phone  
   - Fullscreen layout with testimonial carousel  

2. **Business Verification**  
   - Match shown with name, address, photo  
   - Step indicator (Step 1 of 5)  
   - Option to confirm or try again  

3. **Create Account**  
   - Full name, email, phone, password  
   - Optional website or social link  
   - Checkbox for authorization  
   - Data saved to Supabase  

4. **Terms & Conditions**  
   - Collapsible TOS preview  
   - User must agree before continuing  
   - Sidebar highlighting listing benefits  

5. **Success + Upsell Offer**  
   - Confetti animation 🎉  
   - Free vs Premium plan comparison  
   - Stripe payment integration  
   - Merchant testimonial block  

---

## 📦 Features

- 🔍 Google Places Autocomplete for business search
- 📝 Dynamic account creation form
- 📥 Supabase integration for secure data storage
- 💌 Welcome email sent via Resend API
- 💳 Stripe Checkout flow with post-confirmation upgrade
- 📱 Fully responsive and mobile-friendly
- 🎨 Framer Motion animations for smooth transitions

---

## ⚙️ Environment Setup

Create a `.env.local` file in the root of your project with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev

STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
# 1. Clone the repo
https://github.com/DhruvalAnandkar/Swipe_Savvy.git
cd swipe-savvy

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev

Author
Dhruval Anandkar
Built with ❤️ as part of a 3-day technical challenge.

