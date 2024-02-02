"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import MainLayout from "~/components/admin/MainLayout";
import ProductForm from "~/components/admin/form/ProductForm";
import useAdminNav from "~/hooks/useAdminNav";
import useSelectedCategory from "~/hooks/useSelectedCategory";
import { get_image } from "~/services/images";
import { get_product_by_id, update_product } from "~/services/products";

function UpdatePage({ params }) {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  // const [productInfo, setProductInfo] = useState();
  const [imageUrl, setImageUrl] = useState([]);
  const [imageDetails, setImageDetails] = useState([]);

  const useSelectCategory = useSelectedCategory();

  const { selectedCategory, setSelectedCategory } = useSelectCategory;
  const setNavActive = useAdminNav((state) => state.setNavActive);
  const { data: productInfo, isLoading: loading } = useSWR("getProduct", () =>
    get_product_by_id(params.id)
  );
  useEffect(() => {
    if (productInfo) setSelectedCategory(productInfo.category);
  }, [productInfo, setSelectedCategory]);

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

  const onSubmit = async (formData) => {
    try {
      setSelectedCategory;
      setLoader(true);
      const finalData = {
        _id: params.id,
        name: formData.name,
        description: formData.description,
        price: formData.price,
        stockQuantity: formData.stockQuantity,
        image: imageUrl[0] || productInfo.image,
        images: imageUrl.length > 0 ? imageUrl : productInfo.images,
        category: selectedCategory,
      };
      const data = await update_product(params.id, finalData);
      if (data) {
        toast.success("Successfully!");
        setTimeout(() => {
          router.push("/admin");
          setNavActive("Products");
        }, 4000);
        setLoader(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      toast.error(error.message);

      console.log("====================================");
      console.log(error);
      console.log("====================================");
      setLoader(false);
    }
  };
  return (
    <MainLayout>
      <ProductForm
        title="Update Product"
        data={productInfo}
        setImageUrl={setImageUrl}
        onSubmit={onSubmit}
        loader={loading}
        imageDetails={imageDetails}
      />
    </MainLayout>
  );
}

export default UpdatePage;
