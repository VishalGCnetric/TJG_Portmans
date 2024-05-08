import React, { useEffect, useState } from "react";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
// import { sareePage1 } from "../Data/Saree/page1";
// import { dressPage1 } from "../Data/dress/page1";
// import { gounsPage1 } from "../Data/Gouns/gouns";
// import { kurtaPage1 } from "../Data/Kurta/kurta";
// import { mensShoesPage1 } from "../Data/shoes";
// import { mens_kurta } from "../Data/Men/men_kurta";
// import { lengha_page1 } from "../Data/Women/LenghaCholi";
import { receiveGetContent, receiveProducts } from "../action";

const Homepage = () => {
  const [topProducts, setTopProducts] = useState();
  const [banners,setBanners]=useState()
  const [Data,setData] = useState([]);
  useEffect(() => {
    fetchData();

    receiveProducts().then((data) => {
      setTopProducts(data.hits);
    });
  }, []);


  useEffect(() => {
    receiveGetContent().then((data) => {
      console.log("this is banners",data)
      setBanners(data);
    });
  }, []);
  const fetchData = async () => {
    try {
      const res = await fetch("http://49.206.253.146:2109/content/portmans");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setData(data);
      console.log("Data:", data);
      // return data; // Return the fetched data if needed
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Rethrow the error if needed+
    }
  }
  
  // Call fetchData function
  
  //   console.log("this is landing page", topProducts);
  return (
    <div className="">
      <HomeCarousel images={banners} />
<img src={Data[13]?.url} alt={Data[12]?.title} />
<img src={Data[4]?.url} alt={Data[4]?.title} />
<img src={Data[1]?.url} alt={Data[1]?.title} />

<img src={Data[8]?.url} alt={Data[8]?.title} />
<img src={Data[11]?.url} alt={Data[11]?.title} />
<img src={Data[10]?.url} alt={Data[10]?.title} />

      <div className="space-y-1 py-2">
        <HomeProductSection
          data={topProducts?.slice(0, 10)}
          section={"Top Products"}
        />

        <HomeProductSection
          data={topProducts?.slice(10, 21)}
          section={"Latest Products"}
        />
        {/* <HomeProductSection data={mensShoesPage1} section={"Men's Shoes"} />
        <HomeProductSection data={lengha_page1} section={"Lengha Choli"} />
        <HomeProductSection data={sareePage1} section={"Saree"} />
        <HomeProductSection data={dressPage1} section={"Dress"} />
        <HomeProductSection data={gounsPage1} section={"Women's Gouns"} />
        <HomeProductSection data={kurtaPage1} section={"Women's Kurtas"} /> */}
        {/* <HomeProductSection data={mensPantsPage1} section={"Men's Pants"} /> */}
        <img src={Data[9]?.url} alt={Data[9]?.title} />

        <img src={Data[7]?.url} alt={Data[7]?.title} />
<img src={Data[6]?.url} alt={Data[6]?.title} />
{/* {Data.map((item) => (
          <img src={item.url} alt={item.title} style = {{width:"auto" ,height:"50%"}} />
        ))} */}
      </div>
    </div>
  );
};

export default Homepage;
