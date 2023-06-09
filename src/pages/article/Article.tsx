import {
  Box,
  Grid,
  Stack,
  Typography,
  CircularProgress,
  ImageList,
  ImageListItem,
  Chip,
  Rating,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { Observer } from "mobx-react-lite";
import { SyntheticEvent, useEffect, useState } from "react";
import useContainer from "../../utils/useContainer";
import { ArticleViewModelType } from "./ArticleViewModel";
import { useNavigate, useParams } from "react-router-dom";

type Params = {
  id: string;
};

function SearchResultsPage({
  setTitle,
}: {
  setTitle: (title: string) => void;
}) {
  const [loading, setLoading] = useState(true);
  const params = useParams<Params>();
  const viewModel = useContainer<ArticleViewModelType>("ARTICLE_PAGE");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const getArticle = async () => {
      if (!params.id || !Number.isInteger(+params.id)) {
        navigate("/404", { replace: true });
        return;
      }
      try {
        await viewModel.getArticle(+params.id);
        setTitle(viewModel.article.title);
      } catch (error) {
        navigate("/404", { replace: true });
        return;
      }
      setLoading(false);
    };
    getArticle();
  }, [params.id]);

  const onImageError = (
    ev: SyntheticEvent<HTMLImageElement, Event>,
    height: number,
    width: number
  ) => {
    (
      ev.target as HTMLImageElement
    ).src = `https://placehold.co/${height}x${width}`;
  };

  if (loading) {
    return (
      <Box>
        <Stack direction={"row"} justifyContent={"center"}>
          <CircularProgress />
        </Stack>
      </Box>
    );
  }

  return (
    <Observer>
      {() => (
        <Grid container spacing={2}>
          <Grid item container xs={12}>
            <Grid item container spacing={2} flexWrap={"nowrap"}>
              <Grid item xs="auto">
                <img
                  src={viewModel.article.thumbnail}
                  onError={(ev) => onImageError(ev, 45, 45)}
                  height={45}
                  width={45}
                />
              </Grid>
              <Grid item>
                <Typography data-testid="article-title" variant="h5">
                  {viewModel.article.title}
                </Typography>
                <Typography>{viewModel.article.description}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} spacing={1}>
            <Grid item>
              <Chip label={viewModel.article.brand} variant="outlined" />
            </Grid>
            <Grid item>
              <Chip label={viewModel.article.category} variant="outlined" />
            </Grid>
            {viewModel.article.stock > 0 && (
              <Grid item>
                <Chip label="In Stock" variant="outlined" color="success" />
              </Grid>
            )}
            {viewModel.article.stock === 0 && (
              <Grid item>
                <Chip label="Out of stock" variant="outlined" color="error" />
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography component="legend">Rating</Typography>
              <Rating
                name="rating"
                value={viewModel.article.rating}
                precision={0.5}
                readOnly
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <ImageList>
              {viewModel.article.images.map((image) => (
                <ImageListItem key={image}>
                  <img
                    src={image}
                    onError={(ev) => onImageError(ev, 164, 164)}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
          <Grid item xs={12}>
            <TableContainer>
              <Table>
                <TableBody>
                  {viewModel.getTableRows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">
                        {row.value}
                        {row.unit}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </Observer>
  );
}

export default SearchResultsPage;
