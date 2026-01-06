# Google Apps Script Setup Guide

## 📋 Complete Setup Instructions

Follow these steps carefully to integrate Google Sheets with your website.

---

## Step 1: Open Google Apps Script

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/15HYkAbiYLbxduIvcBkp8XIWFkHGeelyjMFof99Ggg5I/edit
2. Click on **Extensions** (top menu)
3. Click on **Apps Script**
4. A new tab will open with the Apps Script editor

---

## Step 2: Copy the Script Code

1. In the Apps Script editor, you'll see a file called `Code.gs`
2. **Delete all existing code** in that file
3. Open the file `google-apps-script.js` from this repository
4. **Copy ALL the code** from that file
5. **Paste it** into the `Code.gs` file in Apps Script editor

---

## Step 3: Save the Script

1. Click the **💾 Save** icon (or press Ctrl+S / Cmd+S)
2. You might be asked to name the project
3. Name it: **"Campus Project Hub Integration"**
4. Click **OK**

---

## Step 4: Deploy as Web App

1. Click on **Deploy** button (top right)
2. Select **New deployment**
3. Click the **⚙️ gear icon** next to "Select type"
4. Choose **Web app**
5. Fill in the details:
   - **Description:** "Campus Project Hub Form Handler"
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
6. Click **Deploy**

---

## Step 5: Authorize the Script

1. A popup will appear asking for permissions
2. Click **Authorize access**
3. Choose your Google account (shubhamjadhav0618@gmail.com)
4. You'll see a warning "Google hasn't verified this app"
5. Click **Advanced** (bottom left)
6. Click **Go to Campus Project Hub Integration (unsafe)**
7. Click **Allow**

---

## Step 6: Copy the Web App URL

1. After authorization, you'll see a "Deployment" dialog
2. **IMPORTANT:** Copy the **Web app URL**
3. It will look like: `https://script.google.com/macros/s/XXXXX/exec`
4. **Save this URL** - you'll need to send it to me

---

## Step 7: Test the Deployment

1. Click **Done** to close the deployment dialog
2. The script is now live and ready to receive data!

---

## Step 8: Share the Web App URL with Me

**Paste the Web App URL here in chat**

Once you share it, I'll:
1. Update the website contact form to use this URL
2. Add the "Submit Your Review" section
3. Make reviews automatically appear after you approve them

---

## 📧 How It Works:

### Contact Form:
- When someone fills the contact form → Data goes to "Contact Messages" sheet
- You receive email notification at: shubhamjadhav0618@gmail.com

### Review Form:
- When someone submits a review → Data goes to "Customer Reviews" sheet with "Pending" status
- You receive email notification
- To approve: Open sheet → Change "Pending" to "Approved" in Status column
- Approved reviews automatically appear on website

---

## ⚠️ Important Notes:

1. Keep the Web App URL private (don't share publicly)
2. To approve reviews: Just change Status from "Pending" to "Approved" in the sheet
3. To reject reviews: Change Status to "Rejected"
4. You'll get email notifications for every submission

---

## 🆘 Troubleshooting:

**If you get stuck:**
- Make sure you completed ALL authorization steps
- Check that the sheet has correct tab names: "Contact Messages" and "Customer Reviews"
- Verify the Web App is deployed with "Anyone" access

---

**Next Step:** Share the Web App URL with me, and I'll complete the integration! 🚀