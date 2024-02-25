"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthStore } from "~/utils/AuthStore";
import UserLayout from "~/components/layout/UserLayout"

import styles from './image.module.css';

import ImageItem from "./ImageItem";

export default function Image() {
  const route = useRouter();
  const { token } = useAuthStore();
  const logOut = () => {
    localStorage.removeItem("jwt");
    setUser(null);

    route.refresh();
  };
  if (token === null) {
    var images = [
      [
        "https://cdnphoto.dantri.com.vn/FJpuDX5qcfomGihsFlzMBcwzgk8=/thumb_w/990/2021/07/10/0-1625871245984.jpg",
      "https://cdnphoto.dantri.com.vn/_UbP01oodlfhmDa8s5PhF-zQCC8=/thumb_w/990/2021/07/10/buc-anh-do-nhiep-anh-gia-anthony-sullivan-ghi-lai-cho-thay-dai-ngan-ha-tren-khu-vuc-durdle-door-mien-nam-nuoc-anh-sao-tho-va-sao-moc-1625871245959.jpg",
      "https://cdnphoto.dantri.com.vn/qlnAAbjblNNnIwKXzIDG9_3K25g=/thumb_w/990/2021/07/10/lau-dai-chambord-o-trung-tam-thuong-val-de-loire-phap-do-nhiep-anh-gia-nguoi-anh-anh-benjamin-barakat-thuc-hien-1625871245944.jpg",
      "https://cdnphoto.dantri.com.vn/x9zzyCNxE_jUOsQC2176n5N6s0o=/thumb_w/990/2021/07/10/nhiep-anh-gia-andrew-mccarthy-chup-duoc-hinh-anh-ve-mat-trang-luoi-liem-dang-tan-dan-khi-tram-vu-tru-quoc-te-iss-di-qua-truoc-mat-1625871245885.jpg",
      ],
      [
        "https://cdnphoto.dantri.com.vn/4Oz63sh8VUgBBa5idQ3-B6XlvjI=/thumb_w/990/2021/07/10/bau-troi-qua-nhung-mai-nha-nhin-ra-tu-can-ho-cua-nha-nhiep-anh-remi-leblanc-o-trung-tam-cua-paris-phap-1625871245886.jpg",
      ],
      [
        "https://cdnphoto.dantri.com.vn/blXYX9Wkrz_l8Bmd0MXreD1_DGo=/thumb_w/990/2021/07/10/nhiep-anh-gia-vitaliy-novikov-da-chup-lai-duoc-hinh-anh-borealis-aurora-tren-vinh-kola-o-murmansk-nga-sau-nhieu-no-luc-va-thoi-gian-cho-doi-1625871245883.jpg",
      "https://cdnphoto.dantri.com.vn/WVXaLt3rT4p8MSD42YaIzAQIyLI=/thumb_w/990/2021/07/10/buc-anh-co-ten-su-hai-hoa-khien-bat-cu-ai-nhin-vao-cung-cam-thay-thu-thai-buc-anh-chup-dai-ngan-ha-ben-tren-vuon-hoa-oai-huong-o-valensole-phap-1625871245913.jpg",
      "https://cdnphoto.dantri.com.vn/Fwo0MW6FxysPDe6w4cLrwKOHLz0=/thumb_w/990/2021/07/10/nhiep-anh-gia-jiajun-hua-chup-lai-khoanh-khac-mat-troi-moc-o-thanh-pho-thuong-hai-trung-quoc-1625871245853.jpg",
      "https://cdnphoto.dantri.com.vn/OWX-OZnaHawfas6UBtrAqDWmtvY=/thumb_w/990/2021/07/10/nhiep-anh-gia-nguoi-new-zealand-larryn-rae-chup-chinh-minh-tren-bang-trong-khung-canh-cuc-quan-tuyet-dep-o-iceland-1625871245825.jpg",
      ],

      ,["https://cdnphoto.dantri.com.vn/ma0QxNf3RcKaUpN2uNAVzytJTqw=/thumb_w/990/2021/07/10/nhiep-anh-gia-nguoi-anh-james-rushforth-da-chup-duoc-hinh-anh-sao-choi-neowise-sang-ruc-tren-bau-troi-ben-tren-bai-da-co-stonehenge-1625871245892.jpg",]
      ,["https://cdnphoto.dantri.com.vn/FJpuDX5qcfomGihsFlzMBcwzgk8=/thumb_w/990/2021/07/10/0-1625871245984.jpg",]
      ,["https://cdnphoto.dantri.com.vn/_UbP01oodlfhmDa8s5PhF-zQCC8=/thumb_w/990/2021/07/10/buc-anh-do-nhiep-anh-gia-anthony-sullivan-ghi-lai-cho-thay-dai-ngan-ha-tren-khu-vuc-durdle-door-mien-nam-nuoc-anh-sao-tho-va-sao-moc-1625871245959.jpg",]
      ,["https://cdnphoto.dantri.com.vn/qlnAAbjblNNnIwKXzIDG9_3K25g=/thumb_w/990/2021/07/10/lau-dai-chambord-o-trung-tam-thuong-val-de-loire-phap-do-nhiep-anh-gia-nguoi-anh-anh-benjamin-barakat-thuc-hien-1625871245944.jpg",]
      ,["https://cdnphoto.dantri.com.vn/x9zzyCNxE_jUOsQC2176n5N6s0o=/thumb_w/990/2021/07/10/nhiep-anh-gia-andrew-mccarthy-chup-duoc-hinh-anh-ve-mat-trang-luoi-liem-dang-tan-dan-khi-tram-vu-tru-quoc-te-iss-di-qua-truoc-mat-1625871245885.jpg",]
      ,["https://cdnphoto.dantri.com.vn/4Oz63sh8VUgBBa5idQ3-B6XlvjI=/thumb_w/990/2021/07/10/bau-troi-qua-nhung-mai-nha-nhin-ra-tu-can-ho-cua-nha-nhiep-anh-remi-leblanc-o-trung-tam-cua-paris-phap-1625871245886.jpg",]
      ,["https://cdnphoto.dantri.com.vn/blXYX9Wkrz_l8Bmd0MXreD1_DGo=/thumb_w/990/2021/07/10/nhiep-anh-gia-vitaliy-novikov-da-chup-lai-duoc-hinh-anh-borealis-aurora-tren-vinh-kola-o-murmansk-nga-sau-nhieu-no-luc-va-thoi-gian-cho-doi-1625871245883.jpg",]
      ,["https://cdnphoto.dantri.com.vn/WVXaLt3rT4p8MSD42YaIzAQIyLI=/thumb_w/990/2021/07/10/buc-anh-co-ten-su-hai-hoa-khien-bat-cu-ai-nhin-vao-cung-cam-thay-thu-thai-buc-anh-chup-dai-ngan-ha-ben-tren-vuon-hoa-oai-huong-o-valensole-phap-1625871245913.jpg",]
      ,["https://cdnphoto.dantri.com.vn/Fwo0MW6FxysPDe6w4cLrwKOHLz0=/thumb_w/990/2021/07/10/nhiep-anh-gia-jiajun-hua-chup-lai-khoanh-khac-mat-troi-moc-o-thanh-pho-thuong-hai-trung-quoc-1625871245853.jpg",]
      ,["https://cdnphoto.dantri.com.vn/OWX-OZnaHawfas6UBtrAqDWmtvY=/thumb_w/990/2021/07/10/nhiep-anh-gia-nguoi-new-zealand-larryn-rae-chup-chinh-minh-tren-bang-trong-khung-canh-cuc-quan-tuyet-dep-o-iceland-1625871245825.jpg",]
      ,["https://cdnphoto.dantri.com.vn/ma0QxNf3RcKaUpN2uNAVzytJTqw=/thumb_w/990/2021/07/10/nhiep-anh-gia-nguoi-anh-james-rushforth-da-chup-duoc-hinh-anh-sao-choi-neowise-sang-ruc-tren-bau-troi-ben-tren-bai-da-co-stonehenge-1625871245892.jpg",]
      ,["https://cdnphoto.dantri.com.vn/FJpuDX5qcfomGihsFlzMBcwzgk8=/thumb_w/990/2021/07/10/0-1625871245984.jpg",]
      ,["https://cdnphoto.dantri.com.vn/_UbP01oodlfhmDa8s5PhF-zQCC8=/thumb_w/990/2021/07/10/buc-anh-do-nhiep-anh-gia-anthony-sullivan-ghi-lai-cho-thay-dai-ngan-ha-tren-khu-vuc-durdle-door-mien-nam-nuoc-anh-sao-tho-va-sao-moc-1625871245959.jpg",]
      ,["https://cdnphoto.dantri.com.vn/qlnAAbjblNNnIwKXzIDG9_3K25g=/thumb_w/990/2021/07/10/lau-dai-chambord-o-trung-tam-thuong-val-de-loire-phap-do-nhiep-anh-gia-nguoi-anh-anh-benjamin-barakat-thuc-hien-1625871245944.jpg",]
      ,["https://cdnphoto.dantri.com.vn/x9zzyCNxE_jUOsQC2176n5N6s0o=/thumb_w/990/2021/07/10/nhiep-anh-gia-andrew-mccarthy-chup-duoc-hinh-anh-ve-mat-trang-luoi-liem-dang-tan-dan-khi-tram-vu-tru-quoc-te-iss-di-qua-truoc-mat-1625871245885.jpg",]
      ,["https://cdnphoto.dantri.com.vn/4Oz63sh8VUgBBa5idQ3-B6XlvjI=/thumb_w/990/2021/07/10/bau-troi-qua-nhung-mai-nha-nhin-ra-tu-can-ho-cua-nha-nhiep-anh-remi-leblanc-o-trung-tam-cua-paris-phap-1625871245886.jpg",]
      ,["https://cdnphoto.dantri.com.vn/blXYX9Wkrz_l8Bmd0MXreD1_DGo=/thumb_w/990/2021/07/10/nhiep-anh-gia-vitaliy-novikov-da-chup-lai-duoc-hinh-anh-borealis-aurora-tren-vinh-kola-o-murmansk-nga-sau-nhieu-no-luc-va-thoi-gian-cho-doi-1625871245883.jpg",]
      ,["https://cdnphoto.dantri.com.vn/WVXaLt3rT4p8MSD42YaIzAQIyLI=/thumb_w/990/2021/07/10/buc-anh-co-ten-su-hai-hoa-khien-bat-cu-ai-nhin-vao-cung-cam-thay-thu-thai-buc-anh-chup-dai-ngan-ha-ben-tren-vuon-hoa-oai-huong-o-valensole-phap-1625871245913.jpg",]
      ,["https://cdnphoto.dantri.com.vn/Fwo0MW6FxysPDe6w4cLrwKOHLz0=/thumb_w/990/2021/07/10/nhiep-anh-gia-jiajun-hua-chup-lai-khoanh-khac-mat-troi-moc-o-thanh-pho-thuong-hai-trung-quoc-1625871245853.jpg",]
      ,["https://cdnphoto.dantri.com.vn/OWX-OZnaHawfas6UBtrAqDWmtvY=/thumb_w/990/2021/07/10/nhiep-anh-gia-nguoi-new-zealand-larryn-rae-chup-chinh-minh-tren-bang-trong-khung-canh-cuc-quan-tuyet-dep-o-iceland-1625871245825.jpg",]
      ,["https://cdnphoto.dantri.com.vn/ma0QxNf3RcKaUpN2uNAVzytJTqw=/thumb_w/990/2021/07/10/nhiep-anh-gia-nguoi-anh-james-rushforth-da-chup-duoc-hinh-anh-sao-choi-neowise-sang-ruc-tren-bau-troi-ben-tren-bai-da-co-stonehenge-1625871245892.jpg",]

    ];
    

    return (
      <main>
        <UserLayout>
        <div className={styles.image}>
          {images.map((image, index) => (
            <ImageItem key={index} images={image} />
          ))}
        </div>
        </UserLayout>
      </main>
    );
  }
  return (
    <main>
      <Button className="text-sm" variant="contained" onClick={logOut}>
        Logout
      </Button>
    </main>
  );
}
