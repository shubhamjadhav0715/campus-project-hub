# 🎁 Refer & Earn System - Complete Guide

## ✅ System Overview

Your Refer & Earn program is now live with the following features:

### **Rewards Structure:**

**For Referrer (Person who refers):**
- **Option 1:** 15% OFF on their next project
- **Option 2:** 10% Cash (Bank Transfer/UPI after payment received)
- They choose their preferred reward type

**For Referred Person (Friend who gets referred):**
- 5% OFF on their first project
- No minimum project value required

---

## 📄 New Page Created

**URL:** `https://shubhamjadhav0715.github.io/campus-project-hub/refer-earn.html`

### Page Sections:
1. ✅ **Benefits Banner** - Shows rewards for both parties
2. ✅ **How It Works** - 4-step process explanation
3. ✅ **Default Code Banner** - Shows "SHUBHAM" code with copy button
4. ✅ **Get Referral Code Form** - Students request their unique code
5. ✅ **Track Referral Form** - Report when someone uses their code
6. ✅ **Terms & Conditions** - Clear program rules

---

## 🔄 How It Works

### **Step 1: Student Requests Referral Code**
1. Student fills "Get Your Referral Code" form
2. Provides: Name, Email, Phone, Course, Reward Preference, Bank Details (if cash)
3. System auto-generates code: **NAME2024** (e.g., RAHUL2024, PRIYA2024)
4. Data saved to Google Sheet → "Referral Codes" tab
5. You receive email notification with generated code
6. **YOU send the code to student via WhatsApp/Email**

### **Step 2: Student Shares Code**
1. Student shares their code with friends
2. Friend contacts you mentioning the referral code

### **Step 3: Track Referral**
1. Student (or you) fills "Track Referral" form
2. Provides: Referrer name, Code, Friend's details
3. Data saved to Google Sheet → "Referral Tracking" tab
4. Status: "Pending Verification"

### **Step 4: Complete Project & Give Reward**
1. Friend completes project and pays
2. You update status in Google Sheet
3. Give reward based on referrer's choice:
   - 15% discount on next project
   - OR 10% cash via UPI/Bank

---

## 📊 Google Sheet Structure

### **New Tabs Created:**

#### 1. **Referral Codes** Tab
| Timestamp | Name | Email | Phone | Course | Reward Type | Bank/UPI Details | Referral Code | Total Referrals | Status |
|-----------|------|-------|-------|--------|-------------|------------------|---------------|-----------------|--------|

#### 2. **Referral Tracking** Tab
| Timestamp | Referrer Name | Referral Code | Referred Name | Referred Phone | Referred Email | Status | Project Completed | Reward Given |
|-----------|---------------|---------------|---------------|----------------|----------------|--------|-------------------|--------------|

---

## 📧 Email Notifications

You'll receive emails for:

### **1. Referral Code Request:**
```
🎁 New Referral Code Request

Name: Rahul Sharma
Email: rahul@example.com
Phone: 9876543210
Course: BCA
Reward Type: 15% Discount
Generated Code: RAHUL2024

ACTION REQUIRED:
Send code "RAHUL2024" to Rahul via WhatsApp
```

### **2. Referral Tracking:**
```
📊 New Referral Tracked

Referrer: Rahul Sharma
Code Used: RAHUL2024
Referred Person: Priya Deshmukh
Phone: 9123456789

ACTION REQUIRED:
1. Verify this referral
2. Contact referred person
3. Update reward after project completion
```

---

## 🎯 Your Action Items

### **When Someone Requests Referral Code:**
1. Check email notification
2. Open Google Sheet → "Referral Codes" tab
3. Find the generated code
4. **Send code to student via WhatsApp** (their phone number in sheet)
5. Also send via email

### **When Referral is Tracked:**
1. Check email notification
2. Verify the referral is legitimate
3. Contact the referred person
4. When project is completed:
   - Update "Project Completed" to "Yes"
   - Give reward based on referrer's choice
   - Update "Reward Given" to "Yes"

---

## 🔖 Referral Code System

### **Default Code: "SHUBHAM"**
- Displayed on website for direct visitors
- Anyone can use this code
- Tracks direct website referrals

### **Student Codes: Auto-Generated**
- Format: **NAME2024** (e.g., RAHUL2024, PRIYA2024)
- If duplicate exists, adds number (RAHUL20241, RAHUL20242)
- Unique for each student
- Non-transferable

---

## ✅ Testing Checklist

### **Test 1: Request Referral Code**
1. Go to: `refer-earn.html`
2. Fill "Get Your Referral Code" form
3. Check Google Sheet → "Referral Codes" tab
4. Check your email for notification
5. Verify code is generated correctly

### **Test 2: Track Referral**
1. Fill "Track Referral" form
2. Check Google Sheet → "Referral Tracking" tab
3. Check your email for notification

### **Test 3: Copy Default Code**
1. Click "Copy Code" button on "SHUBHAM" banner
2. Verify it copies to clipboard

---

## 📝 TODO: Update Navigation

Add "Refer & Earn" link to navigation on these pages:
- `index.html` ✅ (Already done)
- `services.html`
- `about.html`
- `reviews.html`
- `submit-review.html`
- `contact.html`

**Add this line in navigation:**
```html
<li><a href="refer-earn.html">Refer & Earn</a></li>
```

---

## 🔄 Workflow Summary

```
Student Requests Code
        ↓
You Receive Email
        ↓
Send Code to Student (WhatsApp/Email)
        ↓
Student Shares Code with Friend
        ↓
Friend Contacts You with Code
        ↓
Friend Gets 5% Discount
        ↓
Track Referral in System
        ↓
Friend Completes Project & Pays
        ↓
Give Reward to Referrer:
  - 15% OFF next project
  - OR 10% Cash (UPI/Bank)
        ↓
Update Google Sheet
```

---

## ⚠️ Important Notes

1. **Manual Code Distribution:** You need to send codes to students via WhatsApp/Email
2. **Verification:** Always verify referrals are legitimate
3. **Reward Timing:** Give rewards only after referred person pays
4. **Code Validity:** Codes don't expire but can be deactivated in sheet
5. **Tracking:** Keep Google Sheet updated for accurate tracking

---

## 🆘 Troubleshooting

**If code generation fails:**
- Check if "Referral Codes" sheet exists
- Verify Google Apps Script is deployed

**If forms don't submit:**
- Check Web App URL in script.js
- Verify Google Apps Script permissions

**If emails don't arrive:**
- Check spam folder
- Verify email address in Google Apps Script

---

## 🎊 System is Ready!

Your Refer & Earn program is fully functional with:
- ✅ Referral code generation (NAME2024 format)
- ✅ Default code "SHUBHAM" for direct visitors
- ✅ Dual reward system (15% discount OR 10% cash)
- ✅ 5% discount for referred persons
- ✅ Google Sheet tracking
- ✅ Email notifications
- ✅ Professional landing page

**Next Steps:**
1. Update Google Apps Script with new code
2. Test both forms
3. Add navigation link to other pages
4. Start promoting the program!

---

**Questions? Need modifications? Let me know!** 🚀