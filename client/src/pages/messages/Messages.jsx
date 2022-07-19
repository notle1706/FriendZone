import "./messages.css";
import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import {
  firestore,
  getUserEmail,
  getUserInfo,
  sendMessage,
  uploadFiles,
  getUnreadCount,
  updateUnreadCount,
} from "../../firebase";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import Moment from "react-moment";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { Gallery, Item } from "react-photoswipe-gallery";

function MsgCard(props) {
  return (
    <a
      href="#"
      className="list-group-item list-group-item-action border-0"
      onClick={props.clickUser}
    >
      <div className="badge bg-success float-end">
        {props.newMessages === 0 ? null : props.newMessages}
      </div>
      <div className="d-flex align-items-start">
        <img
          src={props.profileImg}
          className="rounded-circle me-1"
          alt="img"
          width="40"
          height="40"
        />
        <div className="flex-grow-1 ms-3">
          {props.displayName}
          <div className="small">
            <span className="fas fa-circle chat-online"></span>{" "}
            {props.onlineState}
          </div>
        </div>
      </div>
    </a>
  );
}

function UserMsg(props) {
  const [dName, setDname] = useState("");
  const [pic, setPic] = useState("");

  useEffect(() => {
    (async () => {
      const info = await getUserInfo(props.msg.from);
      const dName = info.displayName;
      const pic = info.profilePicture;
      setDname(dName);
      setPic(pic);
    })();
    return console.log("cleanup msg");
  }, []);

  return (
    <>
      {props.msg.from === props.user1 ? (
        <>
          {props.msg.media ? (
            <div className="chat-message-right py-3">
              <Gallery>
                <Item
                  original={props.msg.media}
                  thumbnail={props.msg.media}
                  width="500"
                  height="500"
                >
                  {({ ref, open }) => (
                    <img
                      type="button"
                      ref={ref}
                      onClick={open}
                      src={props.msg.media}
                      className="me-1"
                      alt="pic"
                      style={{
                        maxWidth: "500px",
                        maxHeight: "600px",
                      }}
                    />
                  )}
                </Item>
              </Gallery>
            </div>
          ) : null}
          <div className="chat-message-right pb-4">
            <div>
              <img
                src={pic}
                className="rounded-circle me-1"
                alt="pic"
                width="40"
                height="40"
              />
              <div className="text-muted small text-nowrap mt-2">
                <Moment fromNow>{props.msg.createdAt.toDate()}</Moment>
              </div>
            </div>
            <div className="flex-shrink-1 bg-light rounded py-2 px-3 me-3">
              <div className="fw-bold mb-1">You</div>
              {props.msg.text}
            </div>
          </div>
        </>
      ) : (
        <>
          {props.msg.media ? (
            <div className="chat-message-left py-3">
              <Gallery>
                <Item
                  original={props.msg.media}
                  thumbnail={props.msg.media}
                  width="500"
                  height="500"
                >
                  {({ ref, open }) => (
                    <img
                      type="button"
                      ref={ref}
                      onClick={open}
                      src={props.msg.media}
                      className="me-1"
                      alt="pic"
                      style={{ maxWidth: "500px", maxHeight: "600px" }}
                    />
                  )}
                </Item>
              </Gallery>
            </div>
          ) : null}
          <div className="chat-message-left pb-4">
            <div>
              <img
                src={pic}
                className="rounded-circle me-1"
                alt="pic"
                width="40"
                height="40"
              />
              <div className="text-muted small text-nowrap mt-2">
                <Moment fromNow>{props.msg.createdAt.toDate()}</Moment>
              </div>
            </div>
            <div className="flex-shrink-1 bg-light rounded py-2 px-3 ms-3">
              <div className="fw-bold mb-1">{dName}</div>
              {props.msg.text}
            </div>
          </div>
        </>
      )}
    </>
  );
}

function Messages() {
  const navigate = useNavigate();
  const [img, setImg] = useState();
  const [myEmail, setMyEmail] = useState("");
  const [msgFriends, setMsgFriends] = useState([]);
  const [msgCards, setMsgCards] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    (async () => {
      const myEmail = await getUserEmail();
      setMyEmail(myEmail);
      const myInfo = await getUserInfo(myEmail);
      const myMsgFriends = await myInfo.friends;
      setMsgFriends(myMsgFriends);
      myMsgFriends.forEach((friendEmail) => {
        (async () => {
          const friendInfo = await getUserInfo(friendEmail);
          const unreadCount = await getUnreadCount(myEmail, friendEmail);
          let props = {
            profileImg: friendInfo.profilePicture,
            displayName: friendInfo.displayName,
            newMessages: unreadCount,
            clickUser: async () =>
              await clickUser([
                friendInfo.displayName,
                friendInfo.profilePicture,
                friendEmail,
              ]),
          };
          setMsgCards((arr) => [...arr, <MsgCard {...props} />]);
        })();
      });
    })();
    return () => console.log("cleanup messages function");
  }, []);

  const clickUser = async (user) => {
    const user1 = await getUserEmail();
    const user2 = user[2];
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const msgsRef = collection(firestore, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "desc"));
    const msgFunction = onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });
    await updateUnreadCount(user1, user2, 0);

    setSelectedUser(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user1 = myEmail;
    const user2 = selectedUser[2];

    let url;
    if (img) {
      url = await uploadFiles(img, `${new Date().getTime()} - ${img.name}`);
    }
    const unreadCount = await getUnreadCount(user2, user1);
    await sendMessage(text, user1, user2, url);
    await updateUnreadCount(user2, user1, unreadCount + 1);
    setText("");
  };

  if (!msgFriends) {
    return <div>Loading!</div>;
  }
  if (!msgs) {
    return <div>Loading!</div>;
  }

  console.log(msgs);
  return (
    <>
      <div className="message-container">
        <div className="container h-100 p-0">
          <h1 className="h3 mb-3">Messages</h1>

          <div className="row g-0">
            <div className="col-12 col-lg-5 col-xl-3 border-right">
              <div className="px-4 d-none d-md-block">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control my-3"
                      placeholder="Search..."
                    />
                  </div>
                </div>
              </div>
              {msgCards}

              <hr className="d-block d-lg-none mt-1 mb-0" />
            </div>
            {selectedUser ? (
              <div className="col-12 col-lg-7 col-xl-9">
                <div className="py-2 px-4 border-bottom d-none d-lg-block">
                  <div className="d-flex align-items-center py-1">
                    <div className="position-relative">
                      <img
                        type="button"
                        src={selectedUser[1]}
                        className="rounded-circle me-1"
                        alt="Sharon Lessman"
                        width="40"
                        height="40"
                        onClick={() =>
                          navigate(`/dashboard/profile/${selectedUser[2]}`)
                        }
                      />
                    </div>
                    <div className="flex-grow-1 pl-3">
                      <strong>{selectedUser[0]}</strong>
                      <div className="text-muted small"></div>
                    </div>
                    <div>
                      <button className="btn btn-light border btn-lg px-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-more-horizontal feather-lg"
                        >
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="19" cy="12" r="1"></circle>
                          <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className=" d-flex flex-column-reverse">
                  <div className="">
                    <div className="chat-messages p-4">
                      {msgs.length
                        ? msgs.map((msg, i) => (
                            <UserMsg key={i} msg={msg} user1={myEmail} />
                          ))
                        : null}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className=" flex-grow bottom-0 py-3 px-4 border-top">
                    <div className="input-group">
                      <form className="message-form" onSubmit={handleSubmit}>
                        <label
                          htmlFor="img"
                          className="btn btn-outline-secondary"
                        >
                          <InsertPhotoIcon />
                        </label>
                        <input
                          onChange={(e) => setImg(e.target.files[0])}
                          type="file"
                          id="img"
                          accept="image/*"
                          style={{ display: "none" }}
                        />

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Type your message"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                        />
                        <button className="btn btn-primary">Send</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="position-absolute bottom-50 start-50">
                Click on a user to start a conversation!
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Messages;
