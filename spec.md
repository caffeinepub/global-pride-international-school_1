# Global Pride International School

## Current State
- Full school website with 7 sections: Home, About, Programs, Facilities, Gallery, Admissions, Contact
- Backend has `submitEnquiry`, `getAllEnquiries`, `getEnquiryById` functions
- AdmissionEnquiry type: id, studentName, parentName, contactNumber, gradeApplying, message, timestamp
- No admin UI exists to view submitted enquiries

## Requested Changes (Diff)

### Add
- Admin login page at `/admin` route with hardcoded credentials:
  - Username: `global Pride international school`
  - Password: `gpis@12345`
- Admin dashboard page (protected, only accessible after login) showing:
  - All submitted admission enquiries in a table
  - Columns: #, Student Name, Parent Name, Contact Number, Grade, Message, Date/Time
  - Total enquiry count
  - "Admissions Open 2026-2027" header banner
  - Logout button
- Session persisted in localStorage so admin stays logged in on refresh

### Modify
- App.tsx to add `/admin` route handling (login page vs dashboard based on auth state)

### Remove
- Nothing

## Implementation Plan
1. Create `AdminLogin.tsx` component with username/password form and hardcoded credential validation
2. Create `AdminDashboard.tsx` component that calls `getAllEnquiries()` and renders a table
3. Update `App.tsx` to handle `/admin` route, show login or dashboard based on localStorage auth state
4. Auth state stored in localStorage key `gpis_admin_auth`
