import { UploadButton } from "react-uploader";
import uploader from "../../services/uploader";

// Configuration options: https://upload.io/uploader#customize
const uploaderConfig = {
  multi: false,
  editor: {
    images: {
      crop: false,
    },
  },
};

const RecipeUpload = ({ image, handleImageChange }) => {
  const imageSrc = image || "https://placehold.co/357x344?text=Upload+image";
  return (
    <UploadButton
      uploader={uploader}
      options={uploaderConfig}
      onComplete={([file]) => handleImageChange(file?.originalFile.fileUrl)}
    >
      {({ onClick }) => (
        <button onClick={onClick} style={{ border: "none", padding: 0 }}>
          <img src={imageSrc} alt="" />
        </button>
      )}
    </UploadButton>
  );
};

export default RecipeUpload;
