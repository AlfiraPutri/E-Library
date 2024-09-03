import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
    background-color: #f0f0f0;
    color: #333;
    line-height: 1.6;
    width: 80%;
    margin: auto;
    overflow: hidden;


`;

export const SidebarUser = styled.div`
  width: 250px;
  background-color: #f8f9fa;
  padding: 20px;
  height: 100vh;
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #fff;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const BookCollection = styled.div`
  margin-bottom: 20px;
`;

export const Books = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
`;

export const Book = styled.div`
  text-align: center;
`;

export const ViewAllBtn = styled.button`
  margin-top: 10px;
  background-color: #ffc107;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
`;

export const Categories = styled.div`
  margin-bottom: 20px;
`;

export const CategoryList = styled.div`
  display: flex;
  gap: 10px;
`;

export const CategoryItem = styled.button`
  background-color: #6c757d;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 50%;
`;

export const ProfileIcon = styled.div`
  font-size: 24px;
`;

export const Username = styled.div`
  margin-left: 10px;
  font-size: 18px;
`;

export const DiscoverSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;
`;

