import React from "react";
import { Form, Input, Button, message as antMessage } from "antd";

const AdminSmsSender = () => {  
  const onFinish = async (values) => {
    const { phoneNumber, message: smsMessage } = values;
    try {
      const response = await fetch("http://localhost:5001/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, message: smsMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to send SMS");
      }

      const data = await response.json();
      antMessage.success("Message sent successfully!");
      console.log("SMS Response:", data);
    } catch (error) {
      antMessage.error(error.message);
      console.error("Error sending SMS:", error);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <h2>Send SMS</h2>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ phoneNumber: "", message: "" }}
      >
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            { required: true, message: "Please enter a phone number" },
            {
              pattern: /^\+?[0-9]{10,15}$/,
              message: "Please enter a valid phone number",
            },
          ]}
        >
          <Input placeholder="+254701458323" />
        </Form.Item>
        <Form.Item
          name="message"
          label="Message"
          rules={[{ required: true, message: "Please enter a message" }]}
        >
          <Input.TextArea placeholder="Type your message here..." rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send SMS
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminSmsSender;
