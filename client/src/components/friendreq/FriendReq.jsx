import React, { useEffect, useState } from "react";
import { getUserEmail, getUserInfo, setUserInfo } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function FriendReq(props) {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const [ownInfo, setOwnInfo] = useState();
  const [friendInfo, setFriendInfo] = useState();
  const [friendName, setFriendName] = useState();
  const [friendPfp, setFriendPfp] = useState();

  useEffect(() => {
    (async () => {
      const ownInfo = await getUserInfo(props.ownEmail);
      setOwnInfo(ownInfo);
      const friendInfo = await getUserInfo(props.friendEmail);
      setFriendInfo(friendInfo);
      setFriendName(friendInfo.displayName);
      setFriendPfp(friendInfo.profilePicture);
    })();
  }, []);

  const acceptRequest = async () => {
    await setUserInfo(props.ownEmail, "friends", [
      ...ownInfo.friends,
      props.friendEmail,
    ]);
    await setUserInfo(props.friendEmail, "friends", [
      ...friendInfo.friends,
      props.ownEmail,
    ]);
    await setUserInfo(
      props.ownEmail,
      "incFriendReq",
      ownInfo.incFriendReq.filter((data) => data !== props.friendEmail)
    );
    await setUserInfo(
      props.friendEmail,
      "friendReq",
      friendInfo.friendReq.filter((data) => data !== props.ownEmail)
    );
  };

  const declineRequest = async () => {
    await setUserInfo(
      props.ownEmail,
      "incFriendReq",
      ownInfo.incFriendReq.filter((data) => data !== props.friendEmail)
    );
    await setUserInfo(
      props.friendEmail,
      "friendReq",
      friendInfo.friendReq.filter((data) => data !== props.ownEmail)
    );
  };
  return (
    <>
      {show ? (
        <div className="card w-100 h-auto">
          <div className="card-body">
            <div className="card-title">
              <img
                type="button"
                src={friendPfp}
                className="rounded-circle"
                width="50"
                alt="User"
                onClick={() =>
                  navigate(`/dashboard/profile/${props.friendEmail}`)
                }
              />
            </div>
            <p className="card-text">
              {friendName} would like to be your friend! Accept the request?
            </p>
            <div>
              <span>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    acceptRequest();
                    setShow(false);
                  }}
                >
                  Yes
                </button>
              </span>
              <span>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  onClick={() => {
                    declineRequest();
                    setShow(false);
                  }}
                >
                  No
                </button>
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
