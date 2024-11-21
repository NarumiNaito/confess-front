import { Box } from "@mui/material";
import ProfileContent from "../../../components/myPage/profile/ProfileContent";

function Profile() {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ProfileContent />
      </Box>
    </>
  );
}
export default Profile;
