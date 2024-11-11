import styled from "styled-components";
import { media } from "../../styles/theme/theme";

export const SidebarWrap = styled.div`
  background: ${(props) => props.theme.colors.white};
  padding: 20px 16px;
  box-shadow: 0 0.125rem 0.25rem rgba(165, 163, 174, 0.3);
  width: 260px;
  display: flex;
  flex-direction: column;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  z-index: 1000;
  transition: all 300ms ease-in-out;
  position: sticky;
  left: 0;
  top: 0;
  height: 100vh;
  overflow-y: auto;

  ${media.xxxl`
    width: 224px;
  `}

  ${media.xxl`
    width: auto;
    padding: 20px 12px;
  `}

  ${media.xl`
    width: 244px;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    transform: translateX(-100%);
  `}

  .sidebar-top {
    margin-bottom: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sidebar-body {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .sidebar-menu {
    flex: 1;
  }
    .sidebar-footer {
    margin-top: auto;
    display: flex;
    flex-direction: column;
  }

  .sidebar-brand {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 12px;
  }

  .brand-logo {
    // background: ${(props) => props.theme.colors.blue};
    // border-radius: 8px;
    // width: 40px;
    // height: 40px;
    // display: flex;
    // place-content: center;
    img {
      width: 50px;
      height: 50px;
    }
  }

  .brand-text {
   // display: grid;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    color: ${(props) => props.theme.colors.cadet};
    font-family: 'Poppins', sans-serif;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);


    ${media.xxl`
      display: inline;
    `}

    ${media.xl`

    display: inline;
//     flex-direction: column;
//     align-items: flex-start;
//     line-height: 1.2;
    `}

     ${media.lg`
    font-size: 12px;
    line-height: 1.1;
    display: inline;
  `}


  }

  .sidebar-close-btn {
    color: ${(props) => props.theme.colors.gray700};
    display: none;

    ${media.xl`
      display: inline-flex;
    `}
  }

  .menu-list {
    display: grid;
    row-gap: 6px;
  }

  .menu-link {
    height: 44px;
    display: flex;
    align-items: center;
    column-gap: 14px;
    padding: 2px 20px;
    font-weight: 500;

    ${media.xxl`
      padding: 2px 10px;
    `}

    .menu-link-icon {
      width: 20px;

      ${media.xxl`
        width: 24px;
      `}

      ${media.xl`
        width: 20px;
      `}
    }

    .menu-link-text {
      color: ${(props) => props.theme.colors.gray700};

      ${media.xxl`
        display: inline;
      `}

      ${media.xl`
        display: inline;
      `}
    }

    &.active {
      background: #FF8A08;
      border-radius: 6px;
      box-shadow: rgba(93, 95, 239, 0.3) 0px 2px 8px 0px;

      .menu-link-icon {
        filter: invert(1) brightness(100);
      }

      .menu-link-text {
        font-weight: 600;
        color: ${(props) => props.theme.colors.white};
      }
    }

    &:hover:not(.active) {
      background: rgba(0, 0, 0, 0.05);
      border-radius: 6px;
    }
  }

  &.sidebar-open {
    transform: translateX(0);
  }
`;
