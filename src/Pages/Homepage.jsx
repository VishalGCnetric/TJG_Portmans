import React, { useEffect, useState } from "react";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
import { receiveGetContent, receiveProducts } from "../action";
import HomeProductCard from "../customer/Components/Home/HomeProductCard";


const Homepage = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    receiveProducts().then((data) => {
      console.log("this is top products", data.hits);
      setTopProducts(data.hits);
    });
  }, []);

  useEffect(() => {
    receiveGetContent()
      .then((data) => {
        console.log("this is banners", data);
        setBanners(data);
      })
      .catch((error) => {
        console.error("Error fetching banners:", error);
      });
  }, []);
  return (
    <div className="">
      <div className="flex flex-col justify-center items-center  m-1">
        <HomeCarousel images={banners} />
      </div>

      {banners && (
        <div className="flex flex-col justify-center items-center  m-1">
          <div className="p-3">
            <img src={banners[13]?.url} alt={banners[12]?.title} />
          </div>
          <div className="flex justify-center items-center space-x-10 py-5">
            <div className="text-#333 font-semibold cursor-pointer hover:text-#333">
              <span className=" text-#333 border-b-2 border-#333">SHOP TOTE</span>
              {/* <span className="mr-2 text-#333 border-b-2 border-#333">SHOP NEW IN</span>
        <span className=" mr-2 text-#333 border-b-2 border-#333">SHOP KNITWEAR &amp; COATS</span> */}
            </div>
          </div>
          <div className="p-3">
            <img src={banners[1]?.url} alt={banners[1]?.title} />
          </div>

          <div className="p-3">
            <img src={banners[8]?.url} alt={banners[8]?.title} />
          </div>
          <div className="text-#333 font-semibold cursor-pointer ">
            {/* <span className="mr-2 text-#333 border-b-2 border-#333">SHOP TOPS</span> */}
            <span className=" text-#333 border-b-2 border-#333">SHOP TOPS</span>
            {/* <span className=" mr-2 text-#333 border-b-2 border-#333">SHOP KNITWEAR &amp; COATS</span> */}
          </div>
          <div className="p-3">
            <img src={banners[11]?.url} alt={banners[11]?.title} />
          </div>
          <div className="p-3">
            <img src={banners[10]?.url} alt={banners[10]?.title} />
          </div>
          <div className="space-y-1 py-2 w-full">
            <HomeProductSection data={topProducts?.slice(0, 8)} section={"Top Products"} />
          </div>
          <div className="text-#333 font-semibold cursor-pointer text-#333">
            {/* <span className="mr-2 text-#333 border-b-2 border-#333">SHOP TOPS</span> */}
            {/* <span className=" text-#333 border-b-2 border-#333">SHOP NEW IN</span> */}
            <span className="text-#333 border-b-2 border-#333">SHOP KNITWEAR &amp; COATS</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', margin: '10px 10px' }}>
            <div className="m-2">
              <img src={banners[0]?.url} alt="" />
            </div>
            <div className="m-2">
              <img src={banners[5]?.url} alt="" />
            </div>
            <div className="m-2">
              <img src={banners[3]?.url} alt="" />
            </div>
          </div>
          <div className="p-3">
            <img src={banners[7]?.url} alt={banners[7]?.title} />
          </div>
          <div className="text-#333 font-semibold cursor-pointer text-#333 mt-3 mb-3">
            {/* <span className="mr-2 text-#333 border-b-2 border-#333">SHOP TOPS</span> */}
            <span className=" text-#333 border-b-2 border-#333">SHOP NEW IN</span>
            {/* <span className=" mr-2 text-#333 border-b-2 border-#333">SHOP KNITWEAR &amp; COATS</span> */}
          </div>
          <div className="p-3">
            <img src={banners[6]?.url} alt={banners[6]?.title} />
          </div>

          <div className="p-3">
            <img src={banners[9]?.url} alt={banners[9]?.title} />
          </div>

        </div>
      )}

    </div>
  );
};

export default Homepage;
