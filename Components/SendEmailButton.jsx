import React from 'react';
import styles from "../styles/about.module.css";
function SendEmailButton() {
  const recipientEmail = 'feyrouzdjebbara2000@gmail.com';

  const handleEmailButtonClick = () => {
   
    const mailtoLink = `mailto:${recipientEmail}`;
    window.location.href = mailtoLink;
  };

  return (
    <button className={styles.mailbutton} onClick={handleEmailButtonClick}>
      Help Email
    </button>
  );
}

export default SendEmailButton;
