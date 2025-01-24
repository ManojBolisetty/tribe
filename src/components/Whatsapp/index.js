import React from "react";
import { WhatsAppOutlined } from "@ant-design/icons"; // Ant Design Icon (optional)
import "./index.css"; // CSS for styling the button

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "919009999471";
    const message = "Hello! I would like to know about room booking.";
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="whatsapp-button" onClick={handleWhatsAppClick}>
      <WhatsAppOutlined style={{ fontSize: 32, color: "white" }} />
    </div>
  );
};

export default WhatsAppButton;
