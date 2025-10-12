const fs = require("fs");
const path = require("path");

async function syncUsers(User) {
    try {
        const filePath = path.join(__dirname, "data", "users.json");
        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

        for (const user of data.results) {
            user.title = user.name.title;
            user.first = user.name.first;
            user.last = user.name.last;
            await User.upsert(user);
        }

        console.log("Users syncing successfully!");
    } catch (err) {
        console.error("Error syncing users:", err.message);
    }
}

async function syncVideos(Video) {
    try {

        const filePath = path.join(__dirname, "data", "videos.json");
        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

        for (const video of data.results) {
            video.videoid = video.id
            await Video.upsert(video);
        }

        console.log("Video data synced successfully!");
    } catch (err) {
        console.error("Error syncing videos:", err.message);
    }
}

module.exports = {
    syncVideos,
    syncUsers

}
