import React, { useState, useEffect } from "react";
import "./Wallpaper.css";

const Wallpaper = () => {
    const [b64Logo, guardarB64Logo] = useState("");
    const [logo, setlogo] = useState("");

    const SVG_HEIGHT = 640;
    const SVG_WIDTH = 360;

    const LOGO_SIZE = 250;
    const LOGO_X = 60;
    const LOGO_Y = 180;

    const image_url =
        "https://proxy-kremowy.herokuapp.com/" + "https://cdn.pandascore.co/images/team/image/3212/FAZE_CLAN.png";

    function toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.send();
    }
    
    useEffect(() => {
        toDataURL(image_url, function (dataUrl) {
            console.log(image_url);
            guardarB64Logo(dataUrl);
        });

        setlogo(
            `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background-color:292556" width="${SVG_WIDTH}" height="${SVG_HEIGHT}"><image x="${LOGO_X}" y="${LOGO_Y}" width="${LOGO_SIZE}" xlink:href="${b64Logo}" /></svg>`
        );
    }, [b64Logo]);

    return (
        <div className="wallpaper-container">
            <img src={logo} alt="wallpaper to download" />
        </div>
    );
};

export default Wallpaper;
