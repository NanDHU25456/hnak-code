import React, { useCallback, useEffect, useState } from 'react'

import axios from "axios"

export default function SecondPage() {
    const [url, setUrl] = useState("")

    const getVideo = useCallback(
        async () => {
            try {
                const video = await axios.get("http://127.0.0.1:3001/video")

                if (video.data.video[0]) {
                    const urlVal = Object.keys(video.data.video[0]).length >= 1 ? video.data.video[0].url : ""
                    setUrl(urlVal)
                }
            } catch (error) {
                console.log("error", error);
            }
        },
        [],
    )

    useEffect(() => {
        getVideo()
    }, [getVideo])

    return (
        <div className="first-container">
            <div className="first-title-container">
                <h1>Second Page</h1>
            </div>

            <h4>Recently Uploaded Video</h4>

            <div className="second-url-container">
                <span>url</span>
                <span>:</span>
                <span id="url">{url}</span>
            </div>
            <iframe title={url} width="560" height="315" src={url} allowFullScreen></iframe>
        </div>
    )
}
