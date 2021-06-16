import React from "react";
import "./Contact.css";
const Contact = () => {
    const getInfo = () => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        console.log(name, email, message);
    }
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
                        <input id="email" type="text" placeholder="" aria-label="name" aria-describedby="name-input" />
                    </div>
                </div>
                <h3 className="font-gilroy">Message</h3>
                <textarea id="message"></textarea>
            </div>
            <div onClick={() => getInfo()} className="send-btn">Send</div>
        </div>
    );
};

export default Contact;
