import React from "react";
import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import AllLessons from "../pages/AllLessons";
import CompletedLessons from "../pages/CompletedLessons";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/all-lessons" element={<AllLessons />} />
      <Route path="/completed-lessons" element={<CompletedLessons />} />
    </Routes>
  );
};

export default MyRoutes;
