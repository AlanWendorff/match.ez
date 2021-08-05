import React, { useState } from "react";
import { SERVICE_ID, USER_ID, TEMPLATE_ID } from "../../constants/EmailJs";
import { init, send } from "emailjs-com";
import "./Contact.css";
init(USER_ID);

const Contact = () => {
    const [Incorrect, setIncorrect] = useState({ name: false, email: false, message: false, subject: false });
    const [IsSended, setIsSended] = useState(false);
    const getInfo = () => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        const subject = document.getElementById("subject").value;

        setIncorrect({
            name: name === "" ? true : false,
            email: email === "" || !email.includes("@") ? true : false,
            message: message === "" ? true : false,
            subject: subject === "" ? true : false,
        });

        if (name !== "" && email !== "" && message !== "" && subject !== "" && email.includes("@")) {
            send(SERVICE_ID, TEMPLATE_ID, {
                subject: subject,
                from_name: name,
                email: email,
                message: message,
            });
            setIsSended(true);
        } else {
            document.getElementById("contact").scrollTop = 0;
        }
    };

    return (
        <div id="contact" className="height-100vh-pad-bot-90p background-color-4all contact-container animate-fade-in">
            <h1 className="font-gilroy-bold">Contact</h1>
            <div className="form">
                <div>
                    <div>
                        <h3
                            style={{ borderLeft: `3px solid ${Incorrect.name ? "red" : "#9b7849"}` }}
                            className="font-gilroy"
                        >
                            Full Name
                        </h3>
                        <input id="name" type="text" placeholder="" aria-label="name" aria-describedby="name-input" />
                    </div>
                    <div>
                        <h3
                            style={{ borderLeft: `3px solid ${Incorrect.email ? "red" : "#9b7849"}` }}
                            className="font-gilroy"
                        >
                            Email
                        </h3>
                        <input
                            id="email"
                            type="text"
                            placeholder=""
                            aria-label="email"
                            aria-describedby="email-input"
                        />
                    </div>
                </div>
                <h3
                    style={{ borderLeft: `3px solid ${Incorrect.subject ? "red" : "#9b7849"}` }}
                    className="font-gilroy"
                >
                    Subject
                </h3>
                <input
                    className="mb-60px"
                    id="subject"
                    type="text"
                    placeholder=""
                    aria-label="subject"
                    aria-describedby="subject-input"
                />
                <h3
                    style={{ borderLeft: `3px solid ${Incorrect.message ? "red" : "#9b7849"}` }}
                    className="font-gilroy"
                >
                    Message
                </h3>
                <textarea id="message"></textarea>
            </div>
            <div
                onClick={() => getInfo()}
                className="send-btn"
                style={{ backgroundColor: IsSended ? "green" : "#FABE2E" }}
            >
                {IsSended ? "Sended" : "Send"}
            </div>
        </div>
    );
};

export default Contact;
