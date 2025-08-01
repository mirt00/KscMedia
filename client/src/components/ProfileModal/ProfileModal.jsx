import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "./ProfileModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/UploadAction";
import { updateUser } from "../../actions/UserAction";

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;

    const uploadAndSetImage = async (image, nameKey) => {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      UserData[nameKey] = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    };

    if (profileImage) uploadAndSetImage(profileImage, "profilePicture");
    if (coverImage) uploadAndSetImage(coverImage, "coverPicture");

    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };

  return (
    <Modal
      overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      centered
      title="Update Your Info"
    >
      <form className="profileForm" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>Works At</label>
            <input type="text" name="worksAt" value={formData.worksAt} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Lives In</label>
            <input type="text" name="livesIn" value={formData.livesIn} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input type="text" name="country" value={formData.country} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>Relationship Status</label>
            <input type="text" name="relationship" value={formData.relationship} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row upload-row">
          <div className="form-group">
            <label>Profile Image</label>
            <input type="file" name="profileImage" onChange={onImageChange} />
          </div>
          <div className="form-group">
            <label>Cover Image</label>
            <input type="file" name="coverImage" onChange={onImageChange} />
          </div>
        </div>

        <button type="submit" className="btn-update">
          Update Info
        </button>
      </form>
    </Modal>
  );
};

export default ProfileModal;
