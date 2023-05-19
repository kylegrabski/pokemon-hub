// Import Libraries
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";

// Import MUI Components
import { Search, SearchIconWrapper, StyledInputBase } from "../../shared_components/mui";

// Import Store
import { updateSearch } from "../navBar/searchSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";


export function NavBar() {
  const searchPokemon = useAppSelector(searchState => searchState.search.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Pokemon - Hub
              {searchPokemon}
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) =>
                  dispatch(updateSearch(e.target.value.toLowerCase()))
                }
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
