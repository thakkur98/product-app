import styled from "styled-components";

const Footer = () => {
  return (
    <FooterStyle>
      <div className="footer-content">
        <div className="copyright">
          © {new Date().getFullYear()} ShopEasy. All rights reserved.
        </div>
      </div>
    </FooterStyle>
  );
};

export default Footer;

export const FooterStyle = styled.footer`
  width: 100%;
  background: #aaa;
  color: #000;
  padding: 30px 20px;
  border-top: 1px solid transparent;
  text-align: center;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
  }


  .copyright {
    font-size: 18px;
    font-weight: 600;
    color: #000;
  }

  @media (max-width: 600px) {
    .links {
      flex-direction: column;
      gap: 10px;
    }
  }
`;
