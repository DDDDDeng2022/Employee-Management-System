import * as React from "react";
import { useEffect } from "react";
import apiCall from "../../services/apiCall";
import { AppBar, Box, Typography, Toolbar, IconButton, Badge, MenuItem, Menu, Tooltip } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLogin } from "../../redux/loginStateSlice";
import { setUser, resetUser } from "../../redux/userSlice";
import { setMyProfile } from "../../redux/myProfileSlice";

// eslint-disable-next-line react/prop-types
export default function Header({ handleLeftVisible }) {
    const username = useSelector((state) => state.user.user_name);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            apiCall({
                url: "/api/auth/checkLogin",
                method: "POST",
                data: { token: storedToken },
            }).then((response) => {
                if (response) {
                    dispatch(setIsLogin(true));
                    console.log(response);
                    dispatch(
                        setUser({
                            id: response._id,
                            username: response.username,
                            role: response.role,
                            personal_info: response.personal_info?._id,
                        })
                    );
                    dispatch(setMyProfile({ ...response.personal_info, email: response.email }));
                }
            });
        }
    }, []);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        dispatch(setIsLogin(false));
        dispatch(resetUser());
        localStorage.removeItem("token");
        navigate("/login");
    };

    const renderMenu = (
        <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
            <MenuItem onClick={() => { navigate("/home/profile") }}>
                <IconButton size="large" color="inherit">
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <IconButton size="large" color="inherit">
                    <LogoutIcon />
                </IconButton>
                sign out
            </MenuItem>
        </Menu>
    );

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" color="inherit">
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={() => { navigate("/home/profile") }}>
                <IconButton size="large" color="inherit">
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <IconButton size="large" color="inherit">
                    <LogoutIcon />
                </IconButton>
                sign out
            </MenuItem>
        </Menu>
    );

    return (
        <Box position="static" sx={{ backgroundColor: "#007fd4" }}>
            <AppBar position="static">
                <Toolbar>
                    <Tooltip title="resource">
                        <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }} onClick={handleLeftVisible}>
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: "none", sm: "block" } }}
                    >
                        P2HR Management
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        {/* 可能用不着 */}
                        {/* <IconButton size="large" color="inherit">
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton> */}
                        <IconButton size="large" edge="end" onClick={handleProfileMenuOpen} color="inherit">
                            <AccountCircle />
                        </IconButton>
                        {/* todo: 改成username */}
                        <Typography sx={{ margin: "auto", paddingLeft: "20px" }}>
                            Welcome {username}!
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton size="large" onClick={handleMobileMenuOpen} color="inherit">
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
