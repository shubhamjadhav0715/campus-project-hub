// Google Apps Script for Campus Project Hub
// This script handles form submissions and sends data to Google Sheets

// IMPORTANT: Replace this with your actual Google Sheet ID
const SHEET_ID = '15HYkAbiYLbxduIvcBkp8XIWFkHGeelyjMFof99Ggg5I';
const NOTIFICATION_EMAIL = 'shubhamjadhav0618@gmail.com';

// Handle POST requests from all forms
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const formType = data.formType;
    
    if (formType === 'contact') {
      return handleContactForm(data);
    } else if (formType === 'review') {
      return handleReviewForm(data);
    } else if (formType === 'getReferralCode') {
      return handleGetReferralCode(data);
    } else if (formType === 'trackReferral') {
      return handleTrackReferral(data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Invalid form type'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle contact form submissions
function handleContactForm(data) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Contact Messages');
    const timestamp = new Date();
    
    // Add data to sheet
    sheet.appendRow([
      timestamp,
      data.name,
      data.email,
      data.phone,
      data.project,
      data.message
    ]);
    
    // Send email notification
    sendContactNotification(data, timestamp);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Message sent successfully!'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle review form submissions
function handleReviewForm(data) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Customer Reviews');
    const timestamp = new Date();
    
    // Add data to sheet with "Pending" status
    sheet.appendRow([
      timestamp,
      data.name,
      data.course,
      data.year,
      data.rating,
      data.review,
      'Pending'
    ]);
    
    // Send email notification
    sendReviewNotification(data, timestamp);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Review submitted successfully! It will appear after approval.'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle get referral code requests
function handleGetReferralCode(data) {
  try {
    let sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Referral Codes');
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = SpreadsheetApp.openById(SHEET_ID).insertSheet('Referral Codes');
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Course', 'Reward Type', 'Bank/UPI Details', 'Referral Code', 'Total Referrals', 'Status']);
    }
    
    const timestamp = new Date();
    
    // Generate referral code: NAME2024
    const firstName = data.name.split(' ')[0].toUpperCase();
    const year = new Date().getFullYear();
    let referralCode = firstName + year;
    
    // Check if code exists, add number if needed
    const existingCodes = sheet.getRange(2, 8, sheet.getLastRow() - 1, 1).getValues().flat();
    let counter = 1;
    let originalCode = referralCode;
    while (existingCodes.includes(referralCode)) {
      referralCode = originalCode + counter;
      counter++;
    }
    
    // Add data to sheet
    sheet.appendRow([
      timestamp,
      data.name,
      data.email,
      data.phone,
      data.course,
      data.rewardType,
      data.bankDetails || 'N/A',
      referralCode,
      0, // Total referrals
      'Active'
    ]);
    
    // Send email notification
    sendReferralCodeNotification(data, referralCode, timestamp);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Referral code request submitted! You will receive your code via email and WhatsApp within 24 hours.',
      code: referralCode
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle track referral submissions
function handleTrackReferral(data) {
  try {
    let sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Referral Tracking');
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = SpreadsheetApp.openById(SHEET_ID).insertSheet('Referral Tracking');
      sheet.appendRow(['Timestamp', 'Referrer Name', 'Referral Code', 'Referred Name', 'Referred Phone', 'Referred Email', 'Status', 'Project Completed', 'Reward Given']);
    }
    
    const timestamp = new Date();
    
    // Add data to sheet
    sheet.appendRow([
      timestamp,
      data.referrerName,
      data.referralCode,
      data.referredName,
      data.referredPhone,
      data.referredEmail || 'N/A',
      'Pending Verification',
      'No',
      'No'
    ]);
    
    // Send email notification
    sendTrackReferralNotification(data, timestamp);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Referral tracked successfully! We will verify and update your rewards.'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Get approved reviews for display on website
function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'getReviews') {
      return getApprovedReviews();
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Invalid action'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Get all approved reviews
function getApprovedReviews() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Customer Reviews');
    const data = sheet.getDataRange().getValues();
    const reviews = [];
    
    // Skip header row (index 0)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      // Only include approved reviews (Status = "Approved")
      if (row[6] === 'Approved') {
        reviews.push({
          timestamp: row[0],
          name: row[1],
          course: row[2],
          year: row[3],
          rating: row[4],
          review: row[5]
        });
      }
    }
    
    // Sort by timestamp (newest first)
    reviews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      reviews: reviews
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Send email notification for contact form
function sendContactNotification(data, timestamp) {
  const subject = '🔔 New Contact Form Submission - Campus Project Hub';
  const body = `
New contact form submission received:

📅 Date: ${timestamp.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

👤 Name: ${data.name}
📧 Email: ${data.email}
📱 Phone: ${data.phone}
📂 Project Type: ${data.project}

💬 Message:
${data.message}

---
View all submissions: https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit#gid=0
  `;
  
  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
}

// Send email notification for review submission
function sendReviewNotification(data, timestamp) {
  const subject = '⭐ New Review Submission - Campus Project Hub';
  const stars = '⭐'.repeat(data.rating);
  const body = `
New review submission received (Pending Approval):

📅 Date: ${timestamp.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

👤 Name: ${data.name}
🎓 Course: ${data.course}
📚 Year: ${data.year}
${stars} Rating: ${data.rating}/5

💬 Review:
${data.review}

---
To approve this review:
1. Open: https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit
2. Go to "Customer Reviews" sheet
3. Find this review and change Status from "Pending" to "Approved"
4. The review will automatically appear on the website

To reject: Change Status to "Rejected"
  `;
  
  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
}

// Send email notification for referral code request
function sendReferralCodeNotification(data, code, timestamp) {
  const subject = '🎁 New Referral Code Request - Campus Project Hub';
  const body = `
New referral code request received:

📅 Date: ${timestamp.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

👤 Name: ${data.name}
📧 Email: ${data.email}
📱 Phone: ${data.phone}
🎓 Course: ${data.course}
🎁 Reward Type: ${data.rewardType}
💳 Bank/UPI: ${data.bankDetails || 'N/A'}

🔖 Generated Code: ${code}

---
ACTION REQUIRED:
1. Send the referral code "${code}" to ${data.name} via WhatsApp: ${data.phone}
2. Also send via email: ${data.email}

View all referral codes: https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit
  `;
  
  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
}

// Send email notification for referral tracking
function sendTrackReferralNotification(data, timestamp) {
  const subject = '📊 New Referral Tracked - Campus Project Hub';
  const body = `
New referral tracking submission:

📅 Date: ${timestamp.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

👤 Referrer: ${data.referrerName}
🔖 Code Used: ${data.referralCode}

👥 Referred Person:
   Name: ${data.referredName}
   Phone: ${data.referredPhone}
   Email: ${data.referredEmail || 'N/A'}

---
ACTION REQUIRED:
1. Verify this referral
2. Contact the referred person: ${data.referredPhone}
3. Once project is completed, update reward status

View all referrals: https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit
  `;
  
  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
}