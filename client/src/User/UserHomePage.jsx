import React from "react";
import Animation from "../Animation";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar, Stack } from "@mui/material";
import style from "./UserHomePage.module.css";
import { Link, useNavigate } from "react-router-dom";
import UserRouter from "../Routers/UserRouter";

const UserHomePage = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("uid");
    navigate("/");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div className={style.main_icon_div}>
        {sessionStorage.getItem("uid") && (
          <div>
            <Avatar
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            />
          </div>
        )}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Stack
            direction={"column"}
            sx={{ p: 2, backgroundColor: "rgba(250, 250, 253, 0.95)" }}
            gap={3}
          >
            <Link
              style={{ textDecoration: "none", color: "lightblue" }}
              to={"/user/myprofile"}
            >
              <Typography className={style.list_style}>My Profile</Typography>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "lightblue" }}
              to={"/user/changepassword"}
            >
              <Typography className={style.list_style}>
                Change Password
              </Typography>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "lightblue" }}
              to={"/user/editprofile"}
            >
              <Typography className={style.list_style}>Edit Profile</Typography>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "lightblue" }}
              to={"/user/history"}
            >
              <Typography className={style.list_style}>History</Typography>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "lightblue" }}
              to={"/user"}
            >
              <Typography className={style.list_style}>Back</Typography>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "lightblue" }}
              to={"/user/complaint"}
            >
              <Typography className={style.list_style}>Complaint</Typography>
            </Link>
            <Button
              variant="contained"
              onClick={handleLogout}
              className={style.list_style}
            >
              LogOut
            </Button>
          </Stack>
        </Popover>
      </div>
      <UserRouter />
    </div>
  );
};

export default UserHomePage;
