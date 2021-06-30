const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const cors = require("cors")
const port = 3001;
const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))


//creating monggose schema & model
const VideoSchema = new mongoose.Schema({
    url: String,
    uploadedDate: Date
})

const Video = mongoose.model('Video', VideoSchema);

//route for upploading the url
app.post("/video", async (req, res) => {
    const { url } = req.body;

    try {
        const video = new Video({ url, uploadedDate: new Date() });
        await video.save();

        res.json({
            status: "Success",
            message: "Successfully Uploaded Video"
        })
    } catch (error) {
        console.log("Error in uploading video", error);
        res.status(501)
            .json({
                status: "Error",
                message: "Error in uploading Video"
            });
    }
})

//route for get the latest video Url
app.get("/video", async (req, res) => {
    try {
        const video = await Video.find().sort({ uploadedDate: -1 }).limit(1)
        res.json({
            status: "Success",
            video
        })
    } catch (error) {
        console.log("Error in getting latest video", error);
        res.status(501)
            .json({
                status: "Error",
                message: "Error in getting Video"
            });
    }
})

//route for getting all the videos
app.get("/allVideo", async (req, res) => {
    try {
        const videos = await Video.find();
        res.json({
            status: "Success",
            videos
        })
    } catch (error) {
        console.log("Error in getting all video", error);
        res.status(501)
            .json({
                status: "Error",
                message: "Error in getting all Video"
            });
    }
})

app.listen(port, async () => {
    console.log(`Server Started at ${port}`);
    mongoose.set("useCreateIndex", true);
    await mongoose.connect(
        "mongodb+srv://new_user:Uu44UIjokA6IE6hj@cluster0.1ejaq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        },
        (error) => {
            if (error) {
                console.log(error.message);
            } else {
                console.log("Successfully connected MongoDB");
            }
        }
    );
})