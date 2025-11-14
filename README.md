# SCAM911 - Senior-Friendly Scam Prevention App

A production-ready Next.js application designed to help seniors and families detect and prevent phone scams through accessible, easy-to-use technology.

## Features

### Accessibility-First Design
- **Adjustable Text Size**: Font slider (14px-26px) with localStorage persistence
- **Text-to-Speech**: "Read aloud" button on every major content block
- **High Contrast Mode**: Enhanced visibility for users with vision impairments
- **Reduced Motion**: Respects user motion preferences
- **Keyboard Navigation**: Full keyboard accessibility with visible focus states
- **Screen Reader Support**: Semantic HTML with proper ARIA labels

### Core Functionality
- **Screenshot Analysis**: Upload suspicious messages for instant scam detection
- **Supabase Authentication**: Secure email/password signup and login
- **User Preferences**: Database-backed accessibility settings
- **Trusted Contacts**: Optional contact who can be alerted of scams
- **Responsive Design**: Mobile-first approach with desktop optimization

### Pages
- `/` - Landing page with hero, benefits, how it works, testimonials, FAQ
- `/signup` - User registration with accessibility features
- `/login` - Secure authentication
- `/api/analyze-screenshot` - Screenshot analysis endpoint (mock implementation)

## Technical Stack

- **Framework**: Next.js 13.5.1
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (modified for accessibility)
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Accessibility Standards

Built with WCAG 2.1 Level AA compliance in mind:
- Minimum 4.5:1 contrast ratio (7:1 for CTAs)
- Touch targets minimum 44x44px
- Text size minimum 18px (desktop), 16px (mobile)
- Line height 1.6, letter spacing 0.2px
- Semantic HTML throughout

## Database Schema

### user_preferences
Stores user accessibility settings:
- font_size (14-26)
- high_contrast (boolean)
- reduced_motion (boolean)
- tts_enabled (boolean)
- tts_language (default: en-IN)

### analysis_results
Stores screenshot analysis results:
- analysis_score (0-100)
- labels (JSON array)
- explanation (plain text)
- recommended_action (text)
- consented (boolean)

### trusted_contacts
Stores emergency contacts:
- contact_name
- contact_email
- contact_phone

All tables have Row Level Security (RLS) enabled with restrictive policies.

## Getting Started

1. Ensure Supabase environment variables are configured in `.env`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Architecture Notes

- **Client-side hooks**: All interactive components use `'use client'` directive
- **Accessibility context**: Global provider wraps the app in layout.tsx
- **Custom Progress**: Replaced Radix Progress component to fix Next.js build issue
- **API routes**: Uses Next.js Pages API for `/api/analyze-screenshot`
- **Type safety**: Full TypeScript coverage with Supabase types

## Future Enhancements

- Live call monitoring (requires native mobile implementation)
- Real AI/ML analysis integration (currently uses mock data)
- Dashboard for viewing analysis history
- Trusted contact SMS/email notifications
- Voice-guided onboarding tour
- Human review escalation for low-confidence results

## Security

- All data is encrypted in transit and at rest
- Row Level Security on all database tables
- Users can only access their own data
- No sensitive data exposed in client code
- Proper password strength validation

---

Built with ❤️ for seniors and families
