import "./firstPage.css"

import React, { useState } from 'react'

import { Link } from "react-router-dom"
import axios from "axios"

export default function FirstPage() {
    const [url, setUrl] = useState("")

    const validateYouTubeUrl = (urlToParse) => {
        if (urlToParse) {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                return {
                    status: true,
                    url: `https://www.youtube-nocookie.com/embed/${match[2]}`
                }
            }
        }
        return {
            status: false
        };
    }

    const onSubmit = async () => {
        //basic Validation
        if (url === "") {
            alert("Please Enter the URL")
        } else {
            //Verify the URL
            const isValid = validateYouTubeUrl(url)
            if (isValid.status) {
                //Do the API Call
                const result = await axios.post("http://127.0.0.1:3001/video", { url: isValid.url })

                alert(result.data.message)

                setUrl("")

            } else {
                alert("Please Enter the Valid youtube url")
            }
        }
    }

    return (
        <div className="first-container">
            <div className="first-title-container">
                <h1>First Page</h1>
            </div>

            <h4>Please Enter the Youtube URL and Press Submit</h4>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="first-input"
            />
            <div className="first-button-container">
                <button onClick={onSubmit} className="first-submit">
                    Submit
                </button>
                <Link to="/second">
                    <button className="first-submit">
                        Go to Second Page
                    </button>
                </Link>
            </div>
        </div>
    )
}
