const sendEmail = async (email) => { 
  try {
    const response = await fetch("http://localhost:4000/send-email", { // Adjust the URL based on your backend
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }), // Wrap email in an object if needed
    });
   
    const result = await response.json();
    console.log("Email sent:", result);
    
    if (result.success) {
      return result;
    } else {
      alert("Failed to send email: " + result.error);
    }
  } catch (error) {

    console.error("Error sending email:", error);
    alert("Error sending email. Please try again.");
  }
};


export default sendEmail;
