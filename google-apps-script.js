// Google Apps Script for Campus Project Hub
// This script handles form submissions and sends data to Google Sheets

// IMPORTANT: Replace this with your actual Google Sheet ID
const SHEET_ID = '15HYkAbiYLbxduIvcBkp8XIWFkHGeelyjMFof99Ggg5I';
const NOTIFICATION_EMAIL = 'shubhamjadhav0618@gmail.com';

// Handle POST requests from contact form and review form
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const formType = data.formType;
    
    if (formType === 'contact') {
      return handleContactForm(data);
    } else if (formType === 'review') {
      return handleReviewForm(data);
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
1. Open: https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit#gid=1
2. Find this review in the "Customer Reviews" sheet
3. Change Status from "Pending" to "Approved"
4. The review will automatically appear on the website

To reject: Change Status to "Rejected"
  `;
  
  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
}