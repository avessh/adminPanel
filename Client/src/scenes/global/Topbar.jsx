import { Box } from "@mui/material";
import './Topbar.css';

const Topbar = () => {

  return (
    <Box className="topbox" display="flex" justifyContent="space-between" p={2} >
      {/* SEARCH BAR */}
      {/* <Box
        display="flex"
        // backgroundColor={colors.primary[200]}
        style={{backgroundColor:"#2f303b"}}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> */}

      {/* ICONS */}
      <Box display="flex">
        {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton> */}
        {/* <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton> */}
        {/* <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}
        {/* <IconButton>
          <PersonOutlinedIcon />
        </IconButton> */}
       {/* <Button variant="contained" color="success">
  Admin Name
</Button> */}
<div id="admin-btn-div">
<button className="btn">Admin Panel</button>
</div>

      </Box>
    </Box>
  );
};

export default Topbar;
