// import React, { useEffect, useState } from "react";
// import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
// import HomeProductSection from "../customer/Components/Home/HomeProductSection";
// import { receiveGetContent, receiveProducts } from "../action";
// // import HomeProductCard from "../customer/Components/Home/HomeProductCard";
// import {Link} from "react-router-dom";


// const Homepage = () => {
//   const [topProducts, setTopProducts] = useState([]);
//   const [banners, setBanners] = useState([]);

//   useEffect(() => {
//     receiveProducts().then((data) => {
//       // console.log("this is top products", data.hits);
//       setTopProducts(data.hits);
//     });
//   }, []);

//   useEffect(() => {
//     receiveGetContent()
//       .then((data) => {
//         // console.log("this is banners", data);
//         setBanners(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching banners:", error);
//       });
//   }, []);
//   return (
//     <div className="">
//       <div className="flex flex-col justify-center items-center  m-1">

//         <HomeCarousel images={banners} />
//       </div>

//       {banners && banners.length > 0 && (
//         <div className="flex flex-col justify-center items-center  m-1">
//         <div className="p-3">
//           <Link to="/shops">   <img src={banners[13]?.url} alt={banners[13]?.title} /></Link>
//         </div>
//         <div className="flex justify-center items-center space-x-10 py-5">
//           <div className="text-#333 font-semibold cursor-pointer hover:text-#333">
//             <span className=" text-#333 border-b-2 border-#333">  <Link to="/shop"> SHOP TOTE </Link></span>
//           </div>
//         </div>
//         <div className="p-3">
//           <Link to="/shops">   <img src={banners[1]?.url} alt={banners[1]?.title} /></Link>
//         </div>

//         <div className="p-3">
//           <Link to="/shops">   <img src={banners[8]?.url} alt={banners[8]?.title} /></Link>
//         </div>
//         <div className="text-#333 font-semibold cursor-pointer ">
//           <span className=" text-#333 border-b-2 border-#333">  <Link to="/shop"> SHOP TOPS</Link></span>
//         </div>
//         <div className="p-3">
//           <Link to="/shops">  <img src={banners[11]?.url} alt={banners[11]?.title} /></Link>
//         </div>
//         <div className="p-3">
//           <Link to="/shops">   <img src={banners[10]?.url} alt={banners[10]?.title} /> </Link>
//         </div>
//         <div className="space-y-1 py-2 w-full">
//           <HomeProductSection data={topProducts?.slice(0, 8)} section={"Top Products"} />
//         </div>
//         <div className="text-#333 font-semibold cursor-pointer text-#333">
//           <span className="text-#333 border-b-2 border-#333">  <Link to="/shop"> SHOP KNITWEAR &amp; COATS</Link></span>
//         </div>
//           {/* big day sell */}

//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', margin: '10px 10px' }}>
//           <div className="m-2">
//             <Link to="/shops">   <img src={banners[0]?.url} alt={banners[0]?.title} /></Link>
//           </div>
//           <div className="m-2">
//             <Link to="/shops">   <img src={banners[5]?.url} alt={banners[5]?.title} />  </Link>
//             </div>
//             <div className="m-2">
//               <Link to="/shops">  <img src={banners[3]?.url} alt={banners[3]?.title} /></Link>
//             </div>
//             </div>
//           <div className="p-3">
//             <Link to="/shops">   <img src={banners[7]?.url} alt={banners[7]?.title} /></Link>
//           </div>
         
//           {/* SHOP NEW IN */}
//           <div className="text-#333 font-semibold cursor-pointer text-#333 mt-3 mb-3">
//             <span className=" text-#333 border-b-2 border-#333">  <Link to="/shop"> SHOP NEW IN</Link></span>
//           </div>
//           <div className="p-3">
//             <Link to="/shops">   <img src={banners[6]?.url} alt={banners[6]?.title} /></Link>
//           </div>
//           {/* big day sell */}
//           <div className="text-#333 font-semibold cursor-pointer text-#333 mt-3 mb-3">
//             <span className=" text-#333 border-b-2 border-#333">  <Link to="/shop"> BIG DAY SELL</Link></span>
//           </div>
//           <div className="p-3">
//             <Link to="/shops">   <img src={banners[9]?.url} alt={banners[9]?.title} /></Link>
//           </div>

//         </div>
//       )}

//         </div>

//       )
// };

//       export default Homepage;
import React, { useEffect, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { receiveGetContent, receiveProducts } from "../action";
import Skeleton from "@mui/material/Skeleton";

// Lazy load components
const LazyHomeCarousel = lazy(() => import("../customer/Components/Carousel/HomeCarousel"));
const LazyHomeProductSection = lazy(() => import("../customer/Components/Home/HomeProductSection"));

const Homepage = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [banners, setBanners] = useState([]);

  // Fetch top products on component mount
  useEffect(() => {
    receiveProducts()
      .then((data) => {
        setTopProducts(data.hits);
      })
      .catch((error) => {
        console.error("Error fetching top products:", error);
      });
  }, []);

  // Fetch banners on component mount
  useEffect(() => {
    receiveGetContent()
      .then((data) => {
        setBanners(data);
      })
      .catch((error) => {
        console.error("Error fetching banners:", error);
      });
  }, []);

  return (
    <div className="">
      {/* Display HomeCarousel */}
      <div className="flex flex-col justify-center items-center m-1">
        <Suspense fallback={<Skeleton animation="wave" variant="rectangular" width="100%" height={400} />}>
          <LazyHomeCarousel images={banners} />
        </Suspense>
      </div>

      {/* Display content if banners are available */}
      {banners && banners.length > 0 && (
        <div className="flex flex-col justify-center items-center m-1">
          {/* Display banner image with link */}
          <div className="p-3">
            <Link to="/shops">
              <img src={banners[13]?.url} alt={banners[13]?.title} />
            </Link>
          </div>
          {/* Display section with link */}
          <div className="flex justify-center items-center space-x-10 py-5">
            <div className="text-#333 font-semibold cursor-pointer hover:text-#333">
              <span className=" text-#333 border-b-2 border-#333">
                <Link to="/shop">SHOP TOTE</Link>
              </span>
            </div>
          </div>
          {/* Display more banner images with links */}
          <div className="p-3">
            <Link to="/shops">
              <img src={banners[1]?.url} alt={banners[1]?.title} />
            </Link>
          </div>
          <div className="p-3">
            <Link to="/shops">
              <img src={banners[8]?.url} alt={banners[8]?.title} />
            </Link>
          </div>
          <div className="text-#333 font-semibold cursor-pointer">
            <span className=" text-#333 border-b-2 border-#333">
              <Link to="/shop">SHOP TOPS</Link>
            </span>
          </div>
          <div className="p-3">
            <Link to="/shops">
              <img src={banners[11]?.url} alt={banners[11]?.title} />
            </Link>
          </div>
          <div className="p-3">
            <Link to="/shops">
              <img src={banners[10]?.url} alt={banners[10]?.title} />
            </Link>
          </div>
          {/* Display HomeProductSection */}
          <div className="space-y-1 py-2 w-full">
            <Suspense fallback={<Skeleton animation="wave" variant="rectangular" width="100%" height={400} />}>
              <LazyHomeProductSection data={topProducts?.slice(0, 8)} section={"Top Products"} />
            </Suspense>
          </div>
          <div className="text-#333 font-semibold cursor-pointer text-#333">
            <span className=" text-#333 border-b-2 border-#333">
              <Link to="/shop">SHOP KNITWEAR &amp; COATS</Link>
            </span>
          </div>
          {/* Display more banner images */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', margin: '10px 10px' }}>
            <div className="m-2">
              <Link to="/shops">
                <img src={banners[0]?.url} alt={banners[0]?.title} />
              </Link>
            </div>
            <div className="m-2">
              <Link to="/shops">
                <img src={banners[5]?.url} alt={banners[5]?.title} />
              </Link>
            </div>
            <div className="m-2">
              <Link to="/shops">
                <img src={banners[3]?.url} alt={banners[3]?.title} />
              </Link>
            </div>
          </div>
          <div className="p-3">
            <Link to="/shops">
              <img src={banners[7]?.url} alt={banners[7]?.title} />
            </Link>
          </div>
          {/* SHOP NEW IN */}
          <div className="text-#333 font-semibold cursor-pointer text-#333 mt-3 mb-3">
            <span className=" text-#333 border-b-2 border-#333">
              <Link to="/shop">SHOP NEW IN</Link>
            </span>
          </div>
          <div className="p-3">
            <Link to="/shops">
              <img src={banners[6]?.url} alt={banners[6]?.title} />
            </Link>
          </div>
          {/* BIG DAY SELL */}
          <div className="text-#333 font-semibold cursor-pointer text-#333 mt-3 mb-3">
            <span className=" text-#333 border-b-2 border-#333 ">
              <Link to="/shop">BIG DAY SELL</Link>
            </span>
          </div>
          <div className="p-3">
            <Link to="/shops">
              <img src={banners[9]?.url} alt={banners[9]?.title} />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};

export default Homepage;
