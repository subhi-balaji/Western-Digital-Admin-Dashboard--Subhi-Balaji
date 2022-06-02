import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  bg: "#ffffff54",
  fontColor: "#000",
  cc_bg: "#fafafa",
  border: "#AFB7BC",
  footer_bg: "white",
  bg_image: "url(/images/lightBG.jpg)",
  tile_image: "url(/images/lightBG.jpg)",
  tile_gradient: "linear-gradient(90deg, #00000000 0%, #A6C0FF45 100%)",
};

export const darkTheme = {
  bg: "#00000054",
  fontColor: "#fff",
  cc_bg: "#323232",
  border: "#6e6e6e",
  footer_bg: "black",
  bg_image: "url(/images/darkBG.jpg)",
  tile_image: "url(/images/darkBG.jpg)",
  tile_gradient: "linear-gradient(90deg, #00000000 0%, #05057645 100%)",
};

export const GlobalStyles = createGlobalStyle`

   .form-control
   {
      background-color: #00000000;
      color: ${(props) => props.theme.fontColor};
      border-color: ${(props) => props.theme.border}; 
   }  

   .form-control:focus
   {
      background-color: #E7EEFF;
      color: black;
      box-shadow: none;
      border-color: #050576;
   }

   .login-form > div
   {
      background-color: ${(props) => props.theme.bg};
   }

   .bg-dark,
   .navbar
   {
      background-color: black !important;
   }

   .btn
   {
      background: #E7EEFF;
      border-color: black;
      color: #020274 !important;
   }

   .btn:hover
   {
      background: black;
      border-color: #E7EEFF;
      color: #E7EEFF !important;
   }

   .btn:focus
   {
      background-color: white;
      border-color: black !important;
      color: white;
      box-shadow: 0 0 0 0.25rem black !important;
   }
   
   body {
      background-image: ${(props) => props.theme.bg_image};
   }

   .comp_container,
   .details_box
   {
      // background-image: ${(props) => props.theme.tile_image};
      background: ${(props) => props.theme.tile_gradient};
      color: ${(props) => props.theme.fontColor};
      border: 1px solid ${(props) => props.theme.border};
   }

   .comp_wrapper .generic_title,
   .comp_container__cpu footer p,
   .comp_container__cpu footer p span,
   .comp_container h1,
   .comp_container__model,
   .text-center,
   .form-label,
   .container mt-5,
   .generic_title,
   .details_container,
   .details_box h1,
   .details_box h3,
   .details_box main ul li,
   #root > div > div > div.container > div,
   .comp_container__cpu h3 {
      color: ${(props) => props.theme.fontColor};
   }

   .comp_container__cpu footer p,
   .details_box main ul li
   {
      background: ${(props) => props.theme.footer_bg};
      border: 1px solid ${(props) => props.theme.border};
   }

`;
