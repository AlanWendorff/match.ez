import React from "react";
import { SERVICE_ID, USER_ID, TEMPLATE_ID } from "../../routes/emailkey";
import { init, send } from "emailjs-com";
import "./Contact.css";
init(USER_ID);

const Contact = () => {
    const getInfo = () => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        const subject = document.getElementById("subject").value;
        send(SERVICE_ID, TEMPLATE_ID, {
            subject: subject,
            from_name: name,
            email: email,
            message: message,
        });
    };
    return (
        <div className="background-color-4all contact-container">
            <h1 className="font-gilroy-bold">Contact</h1>
            <div className="form">
                <div>
                    <div>
                        <h3 className="font-gilroy">Full Name</h3>
                        <input id="name" type="text" placeholder="" aria-label="name" aria-describedby="name-input" />
                    </div>
                    <div>
                        <h3 className="font-gilroy">Email</h3>
                        <input
                            id="email"
                            type="text"
                            placeholder=""
                            aria-label="email"
                            aria-describedby="email-input"
                        />
                    </div>
                </div>
                <h3 className="font-gilroy">Subject</h3>
                <input className="mb-60px" id="subject" type="text" placeholder="" aria-label="subject" aria-describedby="subject-input" />
                <h3 className="font-gilroy">Message</h3>
                <textarea id="message"></textarea>
            </div>
            <div onClick={() => getInfo()} className="send-btn">
                Send
            </div>
        </div>
    );
};

export default Contact;
