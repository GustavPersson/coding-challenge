import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppWrapper from "../components/AppWrapper";
import Home from "../pages/home/Home";
import SearchPage from "../pages/search/Search";
import ArticlePage from "../pages/article/Article";
import { useState } from "react";
import NotFound from "../pages/NotFound/NotFound";

export default function RoutesProvider() {
  const [title, setTitle] = useState<string | undefined>();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppWrapper title={title} />}>
          <Route index element={<Home setTitle={setTitle} />} />
          <Route path="search" element={<SearchPage setTitle={setTitle} />} />
          <Route
            path="article/:id"
            element={<ArticlePage setTitle={setTitle} />}
          />
          <Route path="*" element={<NotFound setTitle={setTitle} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
