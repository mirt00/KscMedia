import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequests.js";
import { logout } from "../../actions/AuthActions";

const InfoCard = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleLogOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user, profileUserId]);

  return (
    <div className="InfoCard">
      <div className="info-header">
        <h3>Profile Info</h3>
        {user._id === profileUserId && (
          <>
            <UilPen className="edit-icon" onClick={() => setModalOpened(true)} />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </>
        )}
      </div>

      <div className="info-body">
        <div className="info-item">
          <span className="label">Status:</span>
          <span>{profileUser.relationship || "Not specified"}</span>
        </div>
        <div className="info-item">
          <span className="label">Lives in:</span>
          <span>{profileUser.livesIn || "Unknown"}</span>
        </div>
        <div className="info-item">
          <span className="label">Works at:</span>
          <span>{profileUser.worksAt || "Not mentioned"}</span>
        </div>
      </div>

      {user._id === profileUserId && (
        <button className="button logout-button" onClick={handleLogOut}>
          Log Out
        </button>
      )}
    </div>
  );
};

export default InfoCard;
