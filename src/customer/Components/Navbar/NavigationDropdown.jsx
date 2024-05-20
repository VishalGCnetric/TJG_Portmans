import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Skeleton } from "@mui/material"; // Import Skeleton from Material-UI
import { API_BASE_URL } from "../../../config/api";


const url = `${API_BASE_URL}childCategories?categoryId=3074457345616679204`;

/**
 * Renders a navigation dropdown component that fetches and displays data from an API.
 * The component displays a list of navigation items, and when the user hovers over an item,
 * a dropdown menu is shown with additional information related to that item.
 *
 * @returns {JSX.Element} The navigation dropdown component.
 */
const NavigationDropdown = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return (
        <MainContainer>
            <Container>
                {loading ? ( // Display Skeleton while loading
                    <Skeleton variant="rectangular" width='100%' height={40} />
                ) : (
                    data.extraData?.map((el, index) => (
                        <div
                            onMouseEnter={() => document.getElementById(`${el.name}`).style.display = 'block'}
                            onMouseLeave={() => document.getElementById(`${el.name}`).style.display = 'none'}
                            key={index}
                        >
                            <a href="" style={{ textTransform: 'uppercase', textDecoration: 'none', color: `${el.name == 'SALE' ? 'red' : '#333'}` }}>
                                {el.name}
                            </a>
                            <DropDownHover childrenData={el} />
                        </div>
                    ))
                )}
            </Container>
        </MainContainer>
    );
};

export default NavigationDropdown;

/**
 * Renders a dropdown menu with a list of child items and an optional image.
 *
 * @param {Object} childrenData - The data for the child items in the dropdown.
 * @param {string} childrenData.name - The name of the dropdown.
 * @param {Object[]} childrenData.children - The child items in the dropdown.
 * @param {string} childrenData.children[].name - The name of the child item.
 * @param {Object[]} childrenData.children[].children - The grandchild items of the child item.
 * @param {string} childrenData.children[].children[].name - The name of the grandchild item.
 * @param {string[]} childrenData.image - The URLs of the images to display in the dropdown.
 */
const DropDownHover = ({ childrenData }) => {
    return (
        <DropDown style={{ display: 'none' }} id={childrenData.name}>
            <div style={{ display: 'flex', padding: '50px', justifyContent: 'center' }}>
                <ListItem style={{ display: `${childrenData?.image?.[0] ? 'block' : 'flex'}`, gap: `${childrenData?.image?.[0] ? '0px' : '100px'}` }}>
                    {childrenData?.children?.map((el, index) => (
                        <div key={index} >
                            <ul>
                                <li style={{ cursor: 'pointer' }}>{el.name}</li>
                                <ul>
                                    {el.children?.map((child, i) => (
                                        <li style={{ cursor: 'pointer' }} key={i}>{child.name}</li>
                                    ))}
                                </ul>
                            </ul>
                        </div>
                    ))}
                </ListItem>
                {childrenData?.image && <div style={{ border: '1px solid #7c7c7c', margin: '50px', marginLeft: '150px' }}></div>}

                {childrenData?.image &&
                    <div className="imagecontainer" style={{ cursor: 'pointer' }}>
                        <img src={childrenData?.image?.[0]} alt="" />
                        <h5>{childrenData?.name}</h5>
                    </div>
                }
            </div>
        </DropDown>
    );
};


const Container = styled.div`
    padding: 15px;
    display: flex;
    justify-content: center;
    gap: 30px;
    letter-spacing: 0.5px;
    font-size: 15px;
    @media(max-width: 1024px){
        display: none;
    }
`;

const MainContainer = styled.div`
  width: 100%;
  margin: auto;
  border-bottom: 1px solid #7c7c7c;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px; 

  & > div {
    padding: 10px; 
  }

  & ul {
    list-style-type: none; 
    padding: 0; 
    margin: 0; 
  }

  & ul li {
    text-decoration: none; 
    margin-bottom: 5px; 
  }
`;

const DropDown = styled.div`
    background-color: white;
    position: absolute;
    padding: 5px 100px; 
    box-sizing: border-box;
    width: 100%;
    height: 86vh;
    left: 0;
    display: flex;
    justify-content: space-between;
    z-index: 100;
    .imagecontainer{
        width: 50%;
        height: 100%;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        img{
            width: 60%;
            height: 60%;
            object-fit: cover;
        }
    }
`;