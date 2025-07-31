import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { IoClose } from "react-icons/io5";
import FollowersCard from "../FollowersCard/FollowersCard";
import "./FollowersModal.css";

const FollowersModal = ({ modalOpened, setModalOpened }) => {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : "rgba(255, 255, 255, 0.3)"
      }
      overlayOpacity={0.4}
      overlayBlur={6}
      size="lg"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      withCloseButton={false}
      centered
      classNames={{ modal: "followers-modal" }}
    >
      <div className="followers-modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Your Followers</h2>
          <IoClose className="modal-close" onClick={() => setModalOpened(false)} />
        </div>

        <div className="modal-body">
          <FollowersCard location="modal" />
        </div>
      </div>
    </Modal>
  );
};

export default FollowersModal;
