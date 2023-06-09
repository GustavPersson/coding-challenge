import { render, waitFor, screen, fireEvent } from "@testing-library/react";

import { MemoryRouter, Route, Routes } from "react-router-dom";
import AppWrapper from "./components/AppWrapper";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/home/Home";

import SearchPage from "./pages/search/Search";
import ArticlePage from "./pages/article/Article";

describe("App", () => {
  const setTitle = jest.fn();

  it("should find an article happy flow", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<AppWrapper title={"title"} />}>
            <Route index element={<Home setTitle={setTitle} />} />
            <Route path="search" element={<SearchPage setTitle={setTitle} />} />
            <Route
              path="article/:id"
              element={<ArticlePage setTitle={setTitle} />}
            />
            <Route path="*" element={<NotFound setTitle={setTitle} />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => screen.getByText("Go to the Search Page"));

    fireEvent(
      screen.getByText("Go to the Search Page"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    await waitFor(() => screen.getByText("Search"));
    expect(setTitle).toHaveBeenLastCalledWith("Search");

    fireEvent.change(screen.getByLabelText("Search for an article"), {
      target: { value: "iPhone" },
    });

    fireEvent.click(screen.getByTestId("search"));

    await waitFor(() => screen.getByText("iPhone 9"));

    fireEvent.click(screen.getAllByTestId("article-link")[0]);
    await waitFor(() => screen.getByTestId("article-title"));
    expect(setTitle).toHaveBeenLastCalledWith("iPhone 9");
  });
});
