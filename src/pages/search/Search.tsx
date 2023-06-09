import {
  Avatar,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { Observer } from "mobx-react-lite";
import { ChangeEventHandler, ReactElement, useEffect, useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { SearchType } from "./SearchViewModel";
import { action } from "mobx";
import { Link as ReactRouterLink, useSearchParams } from "react-router-dom";
import "./Search.css";
import useContainer from "../../utils/useContainer";

function SearchResultsPage({
  setTitle,
}: {
  setTitle: (title: string) => void;
}): ReactElement {
  const viewModel = useContainer<SearchType>("SEARCH_PAGE");
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("query") || ""
  );
  const [isSearchPristine, setIsSearchPristine] = useState(true);

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    setTitle("Search");
  }, []);

  useEffect(() => {
    if (searchParams.get("query")) {
      viewModel.search(searchValue);
      setIsSearchPristine(false);
    }
  }, []);

  return (
    <Observer>
      {() => (
        <Box>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <Stack direction="row">
                <TextField
                  id="outlined-basic"
                  label="Search for an article"
                  variant="outlined"
                  value={searchValue}
                  onChange={onChange}
                />
                <Button
                  data-testid="search"
                  className="search-button"
                  sx={{ marginLeft: 2 }}
                  variant="contained"
                  onClick={action(() => {
                    setSearchParams({ query: searchValue });
                    viewModel.search(searchValue);
                    setIsSearchPristine(false);
                  })}
                >
                  Search
                </Button>
              </Stack>
            </Grid>
            <Grid item md={8}>
              <Box alignItems="center" flexGrow={1}>
                <Typography align="center" variant="h5">
                  Search results
                </Typography>
              </Box>
              {!isSearchPristine &&
                searchValue &&
                viewModel.searchResults.length === 0 && <Box>No results</Box>}
              <List>
                {viewModel.searchResults &&
                  viewModel.searchResults.map((result) => (
                    <Link
                      data-testid="article-link"
                      component={ReactRouterLink}
                      to={`/article/${result.id}`}
                      key={result.id}
                    >
                      <ListItem
                        onClick={() => {
                          console.log(result.id);
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <ImageIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={result.title}
                          secondary={result.description}
                        />
                      </ListItem>
                    </Link>
                  ))}
              </List>
            </Grid>
          </Grid>
        </Box>
      )}
    </Observer>
  );
}

export default SearchResultsPage;
