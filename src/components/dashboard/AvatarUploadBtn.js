import React, { useState, useRef } from "react";
import { Alert, Button, Modal } from "rsuite";
import { useModalState } from "../../misc/custom-hook";
import AvatarEditor from "react-avatar-editor";
import { database, storage } from "../../misc/firebase";
import { useProfile } from "../../context/ProfileContex";
import ProfileAvatar from "./ProfileAvatar";

const fileTypes = ".png, .jpeg , .jpg";

const acceptedFiles = ["image/png", "image/jpeg", "image/pjpeg", "image/jpg"];

const isValid = (file) => {
  return acceptedFiles.includes(file.type);
};

const getBlob = (canvas) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("File process Error"));
      }
    });
  });
};

const AvatarUploadBtn = () => {
  const { open, isOpen, close } = useModalState();

  const [img, setImg] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const { profile } = useProfile();

  const avatarEditorRef = useRef();

  const onFileInputChange = (ev) => {
    const currFiles = ev.target.files;

    if (currFiles.length === 1) {
      const file = currFiles[0];

      if (isValid(file)) {
        setImg(file);

        open();
      } else {
        Alert.warning(`Not Valid:Wrong file type ${file.type}`, 4000);
      }
    }
  };

  const onUploadClick = async () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();

    setIsLoading(true);
    try {
      const blob = await getBlob(canvas);

      const avatarFileRef = storage
        .ref(`/profile/${profile.uid}`)
        .child("avatar");

      const uploadAvatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public, mag-age${3600 * 24 * 3}`,
      });

      const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();

      const userAvatarRef = database
        .ref(`/profiles/${profile.uid}`)
        .child("avatar");

      userAvatarRef.set(downloadUrl);

      setIsLoading(false);

      Alert.info("You are looking good!", 4000);
    } catch (err) {
      setIsLoading(false);
      Alert.error(err.message, 5000);
    }
  };
  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        src={profile.avatar}
        name={profile.name}
        className="width-200 height-200 img-fullsize font-huge"
      />
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pionter padded"
        >
          Select new avatar
          <input
            type="file"
            className="d-none"
            id="avatar-upload"
            accept={fileTypes}
            onChange={onFileInputChange}
          />
        </label>
        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust and uplaod new avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center h-100">
              {img && (
                <AvatarEditor
                  ref={avatarEditorRef}
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              block
              apperance="ghost"
              onClick={onUploadClick}
              disabled={isLoading}
            >
              Upload new avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadBtn;
