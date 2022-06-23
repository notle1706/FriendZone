import "./feed.css";
import AddIcon from "@mui/icons-material/Add";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

export default function Feed() {
  return (
    <div className="feed">
      <div className="discussionBox">
        <img src="src\assets\person\pfp.jpg" alt="" className="pfp" />
        <p>
          <strong></strong>{" "}
          <span class="discussionTextBox" role="textbox" contenteditable></span>
        </p>
        <div className="discussionButtons">
          <AddIcon className="discussionButton" />
          <InsertPhotoIcon className="discussionButton" />
          <VideoFileIcon className="discussionButton" />
        </div>

        <div className="checkBox">
          <input type="checkbox" id="anon" name="anon" />
          <label for="anon">Remain anonymous</label>
        </div>
        <Button className="button" variant="contained" size="small">
          Post
        </Button>
      </div>
      <div className="newsFeed">News Feed</div>
    </div>
  );
}
