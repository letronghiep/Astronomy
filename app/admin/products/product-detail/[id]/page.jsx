"use client";
import { Breadcrumbs, Typography } from "@mui/material";
import { Spinner } from "flowbite-react";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import MainLayout from "~/components/admin/MainLayout";
import Slider from "~/components/slider";
import TextTruncate from "~/components/text-truncate";
import { get_image } from "~/services/images";
import { get_product_category_by_id } from "~/services/product-category";
import { get_product_by_id } from "~/services/products";

function DetailPage({ params }) {
  const [productInfo, setProductInfo] = useState(null);
  const [imageDetails, setImageDetails] = useState([]);
  const [tagsDetails, setTagsDetails] = useState([]);

  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    async function getProduct() {
      const data = await get_product_by_id(params.id);
      if (data) setProductInfo(data);
    }
    startTransition(() => {
      getProduct();
    });
  }, [params.id]);
  console.log("====================================");
  console.log(productInfo);
  console.log("====================================");
  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        // Duyệt qua mỗi imageId trong mảng images của product
        const imageDetailsPromises = productInfo.images.map(async (imageId) => {
          const data = await get_image(imageId);
          return data;
        });
        const imageDetailsResults = await Promise.all(imageDetailsPromises);
        setImageDetails(imageDetailsResults);
      } catch (error) {
        console.error("Error fetching image details:", error);
      }
    };
    // Chỉ gọi fetchImageDetails khi product được cập nhật
    fetchImageDetails();
  }, [productInfo]);
  if (productInfo === null)
    return (
      <div className="w-full h-full justify-center flex items-center">
        <Spinner />
      </div>
    );
  return (
    <MainLayout>
      <div className="container mx-auto">
        <Breadcrumbs aria-label="breadcrumb" className="p-2">
          <Link underline="hover" color="inherit" href="/admin">
            Dashboard
          </Link>
          <Link underline="hover" color="inherit" href="/admin">
            {productInfo?.category?.name}
          </Link>
          <Typography color="text.primary">{productInfo?.name}</Typography>
        </Breadcrumbs>
        <div className="w-full">
          <div className="md:float-left md:mr-10">
            <Slider images={imageDetails} />
          </div>
          <div className="p-3 flex-1">
            <h2 className="mt-2 font-bold text-xl md:text-3xl">
              {productInfo.name}
            </h2>
            <p className="text-md md:text-base italic text-gray-400">
              {productInfo.category.name}
            </p>
            <h4 className="font-semibold text-lg md:text-xl">
              ${productInfo.price}{" "}
              <span className="text-sm text-gray-400 italic font-normal">
                x {productInfo.stockQuantity}
              </span>
            </h4>
            <h5 className="font-semibold text-lg">Description: </h5>
            <TextTruncate text={productInfo?.description} maxLength="180" />
            <div>
              Stock:{" "}
              {productInfo?.stockQuantity > 0 ? (
                <span className="text-green-500 font-bold">Available</span>
              ) : (
                <span className="text-red-600 font-bold">Sold out</span>
              )}
            </div>
          </div>
        </div>
        {/* <div className="flex gap-x-3 w-full flex-col md:flex-row">
          <div>
            <h3>Reviews</h3>
          </div>
        </div> */}
      </div>
    </MainLayout>
  );
}

export default DetailPage;
