"use client";
import React, { useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import useFilterStore from "~/hooks/useFilterStore";

export default function DefaultPagination({}) {
  const [active, setActive] = useState(1);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => {
      setActive(index);
      setCurrentPage(index);
    },
  });
  const useFilter = useFilterStore();
  const { totalPages, setCurrentPage, currentPage } = useFilter;
  const next = () => {
    if (active === totalPages) return;
    setActive(active + 1);
    setCurrentPage(active + 1);
    console.log("====================================");
    console.log(currentPage);
    console.log("====================================");
  };
  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);

    setCurrentPage(active - 1);
  };

  return (
    <div className="flex items-center gap-4 justify-center">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <ChevronLeft strokeWidth={2} className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (item) => (
            <IconButton key={item} {...getItemProps(item)}>
              {item}
            </IconButton>
          )
        )}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === totalPages}
      >
        <ChevronRight strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
