import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";

function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">FriendZone</span>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search for friend, post, or module"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <span className="topbarLink">
          Profile
          <div className="topbarIconItem">
            <PersonIcon />
          </div>
        </span>
      </div>
      <div className="topbarIcons">
        <div className="topbarIconItem">
          <PersonIcon />
          <span className="topbarIconBadge">1</span>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
