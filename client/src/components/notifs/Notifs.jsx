import React, { useEffect, useState } from "react";
import {
  getUserEmail,
  getUserInfo,
  setUserInfo,
  removeNotifications,
} from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function Notifs({ to, from, postId, notifId, closeNotif }) {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const [ownInfo, setOwnInfo] = useState();
  const [friendInfo, setFriendInfo] = useState();
  const [friendName, setFriendName] = useState();
  const [friendPfp, setFriendPfp] = useState();
  const [post, setPost] = useState();

  useEffect(() => {
    (async () => {
      const ownInfo = await getUserInfo(to);
      setOwnInfo(ownInfo);
      const friendInfo = await getUserInfo(from);
      setFriendInfo(friendInfo);
      setFriendName(
        from === "Anonymous" ? "Anonymous" : friendInfo.displayName
      );
      setFriendPfp(
        from === "Anonymous"
          ? "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
          : friendInfo.profilePicture
      );
    })();
  }, []);

  return (
    <>
      {show ? (
        <div
          type="button"
          className="card w-100 h-auto"
          onClick={() => {
            navigate(`/dashboard/postpage/${postId}`);
            removeNotifications(to, notifId);
            closeNotif();
          }}
        >
          <div className="card-body">
            <div className="card-title">
              <img
                src={friendPfp}
                className="rounded-circle"
                width="50"
                alt="User"
              />
            </div>
            <p className="card-text">
              {friendName} has commented on your post!
            </p>
            <div></div>
          </div>
        </div>
      ) : null}
    </>
  );
}
