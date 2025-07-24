"use client";
import React, { useEffect, useState } from "react";
import { Card, theme } from "antd";
import LayoutDashboard from "@/components/Layouts/Dashboard";
import IconNotificationRing from "@/icons/notification-ring";
import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";

const ClockAPI = () => {
  const [dateState, setDateState] = useState(new Date());

  const t = new Date();
  const c = t.getHours() - 12;
  useEffect(() => {
    setInterval(() => {
      setDateState(new Date());
    }, 1000);
  }, []);

  return (
    <>
      {dateState.toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })}
    </>
  );
};

const DashboardPage: React.FC = () => {
  const [adminLevel, setAdminLevel] = useState(0);

  const { auth } = useAuth();
  const [adminDetails, setAdminDetails] = useState<any>({});

  useEffect(() => {
    const member = localStorage.getItem("admin");
    if (member) {
      const memberJson = JSON.parse(member);
      setAdminDetails(memberJson);
    }
  }, []);

  const {
    token: { colorText, colorTextTertiary },
  } = theme.useToken();

  const getMessage = () => {
    const myDate = new Date();
    const hrs = myDate.getHours();

    if (hrs < 12) return "Good Morning";
    else if (hrs >= 12 && hrs <= 17) return "Good Afternoon";
    else if (hrs >= 17 && hrs <= 24) return "Good Evening";
  };

  const getIcon = () => {
    const myDate = new Date();
    const hrs = myDate.getHours();

    if (hrs < 5)
      return (
        <svg
          height="32px"
          width="32px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 499.6 499.6"
          xmlSpace="preserve"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {" "}
            <circle
              style={{ fill: "#063F66" }}
              cx="249.6"
              cy={250}
              r="249.6"
            />{" "}
            <path
              style={{ fill: "#022730" }}
              d="M72.8,73.2c97.6-97.6,256-97.6,353.6,0s97.6,256,0,353.6"
            />{" "}
            <g>
              {" "}
              <ellipse
                style={{ fill: "#DCF9F6" }}
                cx="133.6"
                cy="425.2"
                rx="2.4"
                ry="21.6"
              />{" "}
              <ellipse
                style={{ fill: "#DCF9F6" }}
                cx="133.6"
                cy={426}
                rx="21.6"
                ry="2.4"
              />{" "}
              <ellipse
                transform="matrix(0.7054 -0.7088 0.7088 0.7054 18.6212 346.765)"
                style={{ fill: "#DCF9F6" }}
                cx="426.474"
                cy="150.981"
                rx="21.6"
                ry="2.4"
              />{" "}
              <ellipse
                transform="matrix(0.7054 0.7088 -0.7088 0.7054 232.7671 -257.5539)"
                style={{ fill: "#DCF9F6" }}
                cx="426.225"
                cy="151.245"
                rx="21.6"
                ry="2.4"
              />{" "}
              <ellipse
                style={{ fill: "#DCF9F6" }}
                cx="366.4"
                cy="84.4"
                rx="0.8"
                ry="9.6"
              />{" "}
              <ellipse
                style={{ fill: "#DCF9F6" }}
                cx="366.4"
                cy="84.4"
                rx="9.6"
                ry="0.8"
              />{" "}
              <ellipse
                transform="matrix(-0.7107 -0.7035 0.7035 -0.7107 232.771 301.5383)"
                style={{ fill: "#DCF9F6" }}
                cx="178.387"
                cy="102.907"
                rx="10.4"
                ry="0.8"
              />{" "}
              <ellipse
                transform="matrix(0.7107 -0.7035 0.7035 0.7107 -20.6411 155.2913)"
                style={{ fill: "#DCF9F6" }}
                cx="178.491"
                cy="102.742"
                rx="10.4"
                ry="0.8"
              />{" "}
              <ellipse
                transform="matrix(-0.7089 -0.7053 0.7053 -0.7089 -92.7171 692.6153)"
                style={{ fill: "#DCF9F6" }}
                cx="96.571"
                cy="365.441"
                rx="10.4"
                ry="0.8"
              />{" "}
              <ellipse
                transform="matrix(0.7089 -0.7053 0.7053 0.7089 -229.2989 174.8202)"
                style={{ fill: "#DCF9F6" }}
                cx="97.139"
                cy="365.198"
                rx="10.4"
                ry="0.8"
              />{" "}
              <ellipse
                transform="matrix(0.6999 -0.7143 0.7143 0.6999 37.5702 239.1812)"
                style={{ fill: "#DCF9F6" }}
                cx="303.395"
                cy="74.884"
                rx="4.8"
                ry="0.8"
              />{" "}
              <ellipse
                transform="matrix(0.6999 0.7143 -0.7143 0.6999 144.8238 -194.2028)"
                style={{ fill: "#DCF9F6" }}
                cx="303.501"
                cy="75.23"
                rx="4.8"
                ry="0.8"
              />{" "}
              <ellipse
                transform="matrix(0.6998 -0.7144 0.7144 0.6998 -254.4496 288.0746)"
                style={{ fill: "#DCF9F6" }}
                cx="215.498"
                cy="446.756"
                rx="4.8"
                ry="0.8"
              />{" "}
              <ellipse
                transform="matrix(0.6998 0.7144 -0.7144 0.6998 384.246 -19.8844)"
                style={{ fill: "#DCF9F6" }}
                cx="215.78"
                cy="447.195"
                rx="4.8"
                ry="0.8"
              />{" "}
              <circle style={{ fill: "#DCF9F6" }} cx="249.6" cy={250} r={160} />{" "}
            </g>{" "}
            <path
              style={{ fill: "#95BFB9" }}
              d="M385.6,250c0,88-48,160-136,160s-160-72-160-160s72-160,160-160S385.6,162,385.6,250z"
            />{" "}
            <g>
              {" "}
              <circle
                style={{ fill: "#78A8A0" }}
                cx="138.4"
                cy="165.2"
                r="9.6"
              />{" "}
              <circle
                style={{ fill: "#78A8A0" }}
                cx="124.8"
                cy="201.2"
                r="1.6"
              />{" "}
              <circle
                style={{ fill: "#78A8A0" }}
                cx="189.6"
                cy={222}
                r="29.6"
              />{" "}
              <circle style={{ fill: "#78A8A0" }} cx="202.4" cy="157.2" r={8} />{" "}
              <circle
                style={{ fill: "#78A8A0" }}
                cx="257.6"
                cy="153.2"
                r="2.4"
              />{" "}
              <circle style={{ fill: "#78A8A0" }} cx="278.4" cy={126} r="2.4" />{" "}
              <circle style={{ fill: "#78A8A0" }} cx="201.6" cy="127.6" r={4} />{" "}
              <circle style={{ fill: "#78A8A0" }} cx="233.6" cy={114} r="1.6" />{" "}
              <circle style={{ fill: "#78A8A0" }} cx="270.4" cy={206} r="6.4" />{" "}
              <circle style={{ fill: "#78A8A0" }} cx="318.4" cy={202} r={4} />{" "}
              <circle
                style={{ fill: "#78A8A0" }}
                cx="328.8"
                cy="156.4"
                r="6.4"
              />{" "}
              <circle
                style={{ fill: "#78A8A0" }}
                cx="300.8"
                cy="285.2"
                r="17.6"
              />{" "}
              <circle style={{ fill: "#78A8A0" }} cx={156} cy="295.6" r="5.6" />{" "}
              <circle
                style={{ fill: "#78A8A0" }}
                cx="213.6"
                cy="271.6"
                r="2.4"
              />{" "}
              <circle
                style={{ fill: "#78A8A0" }}
                cx="241.6"
                cy="331.6"
                r="9.6"
              />{" "}
              <circle
                style={{ fill: "#78A8A0" }}
                cx="124.8"
                cy="254.8"
                r="6.4"
              />{" "}
              <circle
                style={{ fill: "#78A8A0" }}
                cx="267.2"
                cy="250.8"
                r="1.6"
              />{" "}
              <circle style={{ fill: "#78A8A0" }} cx={344} cy={254} r={4} />{" "}
              <circle
                style={{ fill: "#78A8A0" }}
                cx="174.4"
                cy="339.6"
                r="9.6"
              />{" "}
              <circle
                style={{ fill: "#78A8A0" }}
                cx="193.6"
                cy="305.2"
                r="3.2"
              />{" "}
              <circle
                style={{ fill: "#78A8A0" }}
                cx="292.8"
                cy="342.8"
                r="3.2"
              />{" "}
              <circle
                style={{ fill: "#78A8A0" }}
                cx="241.6"
                cy="369.2"
                r="2.4"
              />{" "}
              <circle
                style={{ fill: "#78A8A0" }}
                cx="201.6"
                cy="365.2"
                r="1.6"
              />{" "}
              <circle
                style={{ fill: "#78A8A0" }}
                cx="332.8"
                cy="328.4"
                r="6.4"
              />{" "}
              <circle style={{ fill: "#78A8A0" }} cx={284} cy="375.6" r={4} />{" "}
              <circle
                style={{ fill: "#78A8A0" }}
                cx="245.6"
                cy="289.2"
                r="3.2"
              />{" "}
              <circle
                style={{ fill: "#78A8A0" }}
                cx="353.6"
                cy="300.4"
                r="6.4"
              />{" "}
              <circle
                style={{ fill: "#78A8A0" }}
                cx="134.4"
                cy="323.6"
                r="5.6"
              />{" "}
              <circle
                style={{ fill: "#78A8A0" }}
                cx="309.6"
                cy="241.2"
                r="7.2"
              />{" "}
            </g>{" "}
          </g>
        </svg>
      );
    else if (hrs < 12)
      return (
        <svg
          height="32px"
          width="32px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 497.6 497.6"
          xmlSpace="preserve"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {" "}
            <circle
              style={{ fill: "#F2AD51" }}
              cx="248.8"
              cy="213.6"
              r="213.6"
            />{" "}
            <path
              style={{ fill: "#FFC166" }}
              d="M400,364.8c-83.2,83.2-219.2,83.2-302.4,0s-83.2-219.2,0-302.4"
            />{" "}
            <path
              style={{ fill: "#6CAD27" }}
              d="M496.8,497.6c-36.8-78.4-142.4-55.2-248-55.2s-211.2-23.2-248,55.2H496.8z"
            />{" "}
            <path
              style={{ fill: "#A0E252" }}
              d="M446.4,497.6c-31.2-78.4-108-134.4-197.6-134.4s-166.4,56-197.6,134.4H446.4z"
            />{" "}
            <path
              style={{ fill: "#7DC431" }}
              d="M446.4,497.6c-31.2-78.4-108-110.4-197.6-110.4s-166.4,32-197.6,110.4H446.4z"
            />{" "}
            <polygon
              style={{ fill: "#6FAF25" }}
              points="313.6,497.6 184,497.6 215.2,420 282.4,420 "
            />{" "}
            <g>
              {" "}
              <polygon
                style={{ fill: "#D65483" }}
                points="151.2,313.6 127.2,288.8 84.8,331.2 127.2,373.6 151.2,349.6 "
              />{" "}
              <rect
                x="65.663"
                y="301.404"
                transform="matrix(-0.7069 0.7073 -0.7073 -0.7069 397.6908 498.0117)"
                style={{ fill: "#D65483" }}
                width="59.999"
                height="59.999"
              />{" "}
              <polygon
                style={{ fill: "#D65483" }}
                points="64,288.8 39.2,313.6 39.2,348.8 64,373.6 106.4,331.2 "
              />{" "}
            </g>{" "}
            <rect
              x="88.8"
              y="373.6"
              style={{ fill: "#028952" }}
              width="13.6"
              height="101.6"
            />{" "}
            <polyline
              style={{ fill: "#036D3F" }}
              points="88.8,373.6 101.6,373.6 101.6,475.2 "
            />{" "}
            <path
              id="SVGCleanerId_0"
              style={{ fill: "#EA7D9F" }}
              d="M140.8,322.4l-15.2-15.2l-15.2,15.2l-15.2-15.2L80,322.4l-15.2-15.2l-15.2,15.2 L39.2,312v35.2c0,29.6,24,53.6,53.6,53.6h4.8c29.6,0,53.6-24,53.6-53.6V312L140.8,322.4z"
            />{" "}
            <g>
              {" "}
              <path
                id="SVGCleanerId_0_1_"
                style={{ fill: "#EA7D9F" }}
                d="M140.8,322.4l-15.2-15.2l-15.2,15.2l-15.2-15.2L80,322.4l-15.2-15.2 l-15.2,15.2L39.2,312v35.2c0,29.6,24,53.6,53.6,53.6h4.8c29.6,0,53.6-24,53.6-53.6V312L140.8,322.4z"
              />{" "}
            </g>{" "}
            <g>
              {" "}
              <rect
                x="113.937"
                y="311.78"
                transform="matrix(0.7066 -0.7076 0.7076 0.7066 -186.8231 178.5793)"
                style={{ fill: "#F4AEC7" }}
                width={16}
                height="5.6"
              />{" "}
              <rect
                x="83.234"
                y="311.917"
                transform="matrix(0.7066 -0.7076 0.7076 0.7066 -195.9281 156.8936)"
                style={{ fill: "#F4AEC7" }}
                width={16}
                height="5.6"
              />{" "}
              <polygon
                style={{ fill: "#F4AEC7" }}
                points="148.8,322.4 151.2,320 151.2,312 144.8,318.4 "
              />{" "}
              <path
                style={{ fill: "#F4AEC7" }}
                d="M47.2,347.2V320l-8-8v35.2c0,29.6,24,53.6,53.6,53.6h4.8c0.8,0,0.8,0,1.6,0 C70.4,400,47.2,376,47.2,347.2z"
              />{" "}
              <rect
                x="53.111"
                y="311.517"
                transform="matrix(0.7071 -0.7071 0.7071 0.7071 -204.3564 135.2732)"
                style={{ fill: "#F4AEC7" }}
                width={16}
                height="5.6"
              />{" "}
            </g>{" "}
            <g>
              {" "}
              <polygon
                style={{ fill: "#D65483" }}
                points="458.4,313.6 433.6,288.8 391.2,331.2 433.6,373.6 458.4,349.6 "
              />{" "}
              <rect
                x="372.814"
                y="301.3"
                transform="matrix(-0.707 0.7072 -0.7072 -0.707 921.9025 280.6584)"
                style={{ fill: "#D65483" }}
                width="59.999"
                height="59.999"
              />{" "}
              <polygon
                style={{ fill: "#D65483" }}
                points="371.2,288.8 346.4,313.6 346.4,348.8 371.2,373.6 413.6,331.2 "
              />{" "}
            </g>{" "}
            <rect
              x={396}
              y="373.6"
              style={{ fill: "#028952" }}
              width="13.6"
              height="101.6"
            />{" "}
            <polyline
              style={{ fill: "#036D3F" }}
              points="396,373.6 408.8,373.6 408.8,475.2 "
            />{" "}
            <path
              id="SVGCleanerId_1"
              style={{ fill: "#EA7D9F" }}
              d="M448,322.4l-15.2-15.2l-15.2,15.2l-15.2-15.2l-15.2,15.2L372,307.2l-15.2,15.2 L346.4,312v35.2c0,29.6,24,53.6,53.6,53.6h4.8c29.6,0,53.6-24,53.6-53.6V312L448,322.4z"
            />{" "}
            <g>
              {" "}
              <path
                id="SVGCleanerId_1_1_"
                style={{ fill: "#EA7D9F" }}
                d="M448,322.4l-15.2-15.2l-15.2,15.2l-15.2-15.2l-15.2,15.2L372,307.2 l-15.2,15.2L346.4,312v35.2c0,29.6,24,53.6,53.6,53.6h4.8c29.6,0,53.6-24,53.6-53.6V312L448,322.4z"
              />{" "}
            </g>{" "}
            <g>
              {" "}
              <rect
                x="420.973"
                y="311.895"
                transform="matrix(0.7071 -0.7071 0.7071 0.7071 -96.8799 395.5014)"
                style={{ fill: "#F4AEC7" }}
                width={16}
                height="5.6"
              />{" "}
              <rect
                x="390.836"
                y="311.429"
                transform="matrix(0.7066 -0.7076 0.7076 0.7066 -105.335 374.4117)"
                style={{ fill: "#F4AEC7" }}
                width={16}
                height="5.6"
              />{" "}
              <polygon
                style={{ fill: "#F4AEC7" }}
                points="456,322.4 458.4,320 458.4,312 452,318.4 "
              />{" "}
              <path
                style={{ fill: "#F4AEC7" }}
                d="M354.4,347.2V320l-8-8v35.2c0,29.6,24,53.6,53.6,53.6h4.8c0.8,0,0.8,0,1.6,0 C377.6,400,354.4,376,354.4,347.2z"
              />{" "}
              <rect
                x="360.028"
                y="311.563"
                transform="matrix(0.7069 -0.7074 0.7074 0.7069 -114.4816 352.4806)"
                style={{ fill: "#F4AEC7" }}
                width="16.001"
                height="5.6"
              />{" "}
            </g>{" "}
            <path
              style={{ fill: "#036D3F" }}
              d="M254.4,462.4c0,4-3.2,7.2-7.2,7.2l0,0c-4,0-7.2-3.2-7.2-7.2V148.8c0-4,3.2-7.2,7.2-7.2l0,0 c4,0,7.2,3.2,7.2,7.2V462.4z"
            />{" "}
            <path
              style={{ fill: "#F283B1" }}
              d="M276,41.6c0,36.8-12.8,76.8-28.8,76.8s-28.8-40-28.8-76.8S231.2,0,247.2,0 C263.2,0.8,276,4.8,276,41.6z"
            />{" "}
            <path
              style={{ fill: "#EF6597" }}
              d="M247.2,0.8c16,0,28.8,4.8,28.8,41.6s-12.8,76.8-28.8,76.8"
            />{" "}
            <path
              style={{ fill: "#F283B1" }}
              d="M218.4,268.8c0-36.8,12.8-76.8,28.8-76.8s28.8,40,28.8,76.8s-12.8,41.6-28.8,41.6 C231.2,310.4,218.4,305.6,218.4,268.8z"
            />{" "}
            <path
              style={{ fill: "#EF6597" }}
              d="M247.2,310.4c-16,0-28.8-4.8-28.8-41.6c0-36.8,12.8-76.8,28.8-76.8"
            />{" "}
            <path
              style={{ fill: "#F283B1" }}
              d="M360.8,184c-36.8,0-76.8-12.8-76.8-28.8s40-28.8,76.8-28.8s41.6,12.8,41.6,28.8S397.6,184,360.8,184z "
            />{" "}
            <path
              style={{ fill: "#EF6597" }}
              d="M402.4,155.2c0,16-4.8,28.8-41.6,28.8S284,171.2,284,155.2"
            />{" "}
            <path
              style={{ fill: "#F283B1" }}
              d="M133.6,127.2c36.8,0,76.8,12.8,76.8,28.8s-40,28.8-76.8,28.8S92,172,92,156 C92,140,96.8,127.2,133.6,127.2z"
            />{" "}
            <path
              style={{ fill: "#EF6597" }}
              d="M92,155.2c0-16,4.8-28.8,41.6-28.8c36.8,0,76.8,12.8,76.8,28.8"
            />{" "}
            <path
              style={{ fill: "#F283B1" }}
              d="M348,95.2c-26.4,25.6-63.2,45.6-74.4,34.4c-11.2-11.2,8-48.8,34.4-74.4c25.6-25.6,38.4-20,49.6-8.8 C368,56.8,373.6,68.8,348,95.2z"
            />{" "}
            <path
              style={{ fill: "#EF6597" }}
              d="M356.8,45.6c11.2,11.2,16.8,23.2-8.8,49.6c-26.4,25.6-63.2,45.6-74.4,34.4"
            />{" "}
            <path
              style={{ fill: "#F283B1" }}
              d="M146.4,216c26.4-25.6,63.2-45.6,74.4-34.4c11.2,11.2-8,48.8-34.4,74.4s-38.4,20-49.6,8.8 C126.4,253.6,120.8,241.6,146.4,216z"
            />{" "}
            <path
              style={{ fill: "#EF6597" }}
              d="M137.6,264.8c-11.2-11.2-16.8-23.2,8.8-49.6c26.4-25.6,63.2-45.6,74.4-34.4"
            />{" "}
            <path
              style={{ fill: "#F283B1" }}
              d="M307.2,256c-25.6-26.4-45.6-63.2-34.4-74.4s48.8,8,74.4,34.4s20,38.4,8.8,49.6 C345.6,276,333.6,282.4,307.2,256z"
            />{" "}
            <path
              style={{ fill: "#EF6597" }}
              d="M356.8,264.8c-11.2,11.2-23.2,16.8-49.6-8.8c-25.6-26.4-45.6-63.2-34.4-74.4"
            />{" "}
            <path
              style={{ fill: "#F283B1" }}
              d="M187.2,55.2c25.6,25.6,45.6,63.2,34.4,74.4c-11.2,11.2-48.8-8-74.4-34.4 c-26.4-26.4-20.8-38.4-9.6-49.6C148.8,34.4,160.8,28.8,187.2,55.2z"
            />{" "}
            <path
              style={{ fill: "#EF6597" }}
              d="M137.6,45.6c11.2-11.2,23.2-16.8,49.6,8.8c25.6,25.6,45.6,63.2,34.4,74.4"
            />{" "}
            <circle style={{ fill: "#F7C90B" }} cx="247.2" cy="155.2" r={48} />{" "}
            <path
              style={{ fill: "#F9A908" }}
              d="M281.6,121.6c18.4,19.2,18.4,49.6,0,68c-19.2,19.2-49.6,19.2-68,0"
            />{" "}
            <g>
              {" "}
              <path
                style={{ fill: "#036D3F" }}
                d="M252,401.6c0,0-12.8-52.8-46.4-64.8S176,297.6,176,297.6s-38.4,80,19.2,136.8 c45.6,44.8,52.8,24,52.8,24L252,401.6z"
              />{" "}
              <path
                style={{ fill: "#036D3F" }}
                d="M242.4,401.6c0,0,12.8-52.8,46.4-64.8s29.6-39.2,29.6-39.2s38.4,80-19.2,136.8 c-45.6,44.8-52.8,24-52.8,24L242.4,401.6z"
              />{" "}
            </g>{" "}
          </g>
        </svg>
      );
    else if (hrs >= 12 && hrs <= 17)
      return (
        <svg
          height="32px"
          width="32px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 497.6 497.6"
          xmlSpace="preserve"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              style={{ fill: "#3FCAD1" }}
              d="M492.8,497.6c-36-80-140-54.4-244-54.4s-208-25.6-244,54.4H492.8z"
            />{" "}
            <circle style={{ fill: "#FF9100" }} cx="248.8" cy={220} r="210.4" />{" "}
            <path
              style={{ fill: "#FF7900" }}
              d="M397.6,368.8c-82.4,82.4-215.2,82.4-297.6,0C17.6,287.2,17.6,153.6,100,72"
            />{" "}
            <circle style={{ fill: "#FFCE00" }} cx="84.8" cy="83.2" r="43.2" />{" "}
            <path
              style={{ fill: "#FF9D00" }}
              d="M84.8,40c24,0,43.2,19.2,43.2,43.2s-19.2,43.2-43.2,43.2"
            />{" "}
            <path
              style={{ fill: "#FFBC00" }}
              d="M128,83.2c0,24-19.2,40-43.2,40s-43.2-16-43.2-40s19.2-40,43.2-40S128,59.2,128,83.2z"
            />{" "}
            <path
              style={{ fill: "#FFB000" }}
              d="M84.8,43.2c24,0,43.2,16,43.2,40s-19.2,40-43.2,40s-43.2-16-43.2-40"
            />{" "}
            <path
              style={{ fill: "#FFBC00" }}
              d="M84.8,43.2c24,0,43.2,16,43.2,40s-19.2,40-43.2,40"
            />{" "}
            <path
              style={{ fill: "#FFCE00" }}
              d="M128,83.2c0,24-19.2,40-43.2,40"
            />{" "}
            <circle style={{ fill: "#FF9D00" }} cx="84.8" cy="25.6" r="3.2" />{" "}
            <polygon
              style={{ fill: "#FFCE00" }}
              points="88.8,15.2 84.8,16 81.6,15.2 84.8,7.2 "
            />{" "}
            <circle style={{ fill: "#FF9D00" }} cx="84.8" cy={140} r="3.2" />{" "}
            <polygon
              style={{ fill: "#FFCE00" }}
              points="81.6,151.2 84.8,149.6 88.8,151.2 84.8,158.4 "
            />{" "}
            <circle style={{ fill: "#FF9D00" }} cx="125.6" cy="42.4" r="3.2" />{" "}
            <polygon
              style={{ fill: "#FFCE00" }}
              points="136,37.6 132,36 130.4,32 138.4,29.6 "
            />{" "}
            <circle style={{ fill: "#FF9D00" }} cx="44.8" cy="123.2" r="3.2" />{" "}
            <polygon
              style={{ fill: "#FFCE00" }}
              points="34.4,128 37.6,130.4 40,133.6 32,136 "
            />{" "}
            <circle style={{ fill: "#FF9D00" }} cx="142.4" cy="83.2" r="3.2" />{" "}
            <polygon
              style={{ fill: "#FFCE00" }}
              points="152.8,87.2 152,83.2 152.8,79.2 160.8,83.2 "
            />{" "}
            <circle style={{ fill: "#FF9D00" }} cx={28} cy="83.2" r="3.2" />{" "}
            <polygon
              style={{ fill: "#FFCE00" }}
              points="16.8,79.2 18.4,83.2 16.8,87.2 9.6,83.2 "
            />{" "}
            <circle style={{ fill: "#FF9D00" }} cx="125.6" cy="123.2" r="3.2" />{" "}
            <polygon
              style={{ fill: "#FFCE00" }}
              points="130.4,133.6 132,130.4 136,128 138.4,136 "
            />{" "}
            <circle style={{ fill: "#FF9D00" }} cx="44.8" cy="42.4" r="3.2" />{" "}
            <g>
              {" "}
              <polygon
                style={{ fill: "#FFCE00" }}
                points="40,32 37.6,36 34.4,37.6 32,29.6 "
              />{" "}
              <circle
                style={{ fill: "#FFCE00" }}
                cx="107.2"
                cy="30.4"
                r="3.2"
              />{" "}
            </g>{" "}
            <polygon
              style={{ fill: "#FF9D00" }}
              points="115.2,21.6 111.2,21.6 108,19.2 114.4,13.6 "
            />{" "}
            <circle style={{ fill: "#FFCE00" }} cx="62.4" cy={136} r="3.2" />{" "}
            <polygon
              style={{ fill: "#FF9D00" }}
              points="55.2,144 59.2,144 62.4,147.2 56,152 "
            />{" "}
            <circle style={{ fill: "#FFCE00" }} cx="138.4" cy="61.6" r="3.2" />{" "}
            <polygon
              style={{ fill: "#FF9D00" }}
              points="149.6,60.8 147.2,58.4 146.4,54.4 155.2,54.4 "
            />{" "}
            <circle style={{ fill: "#FFCE00" }} cx={32} cy="104.8" r="3.2" />{" "}
            <polygon
              style={{ fill: "#FF9D00" }}
              points="20.8,104.8 23.2,108 23.2,112 15.2,111.2 "
            />{" "}
            <circle style={{ fill: "#FFCE00" }} cx="137.6" cy="105.6" r="3.2" />{" "}
            <polygon
              style={{ fill: "#FF9D00" }}
              points="146.4,112.8 146.4,108.8 148.8,106.4 154.4,112.8 "
            />{" "}
            <circle style={{ fill: "#FFCE00" }} cx={32} cy="60.8" r="3.2" />{" "}
            <polygon
              style={{ fill: "#FF9D00" }}
              points="24,52.8 24,56.8 20.8,60 16,53.6 "
            />{" "}
            <circle style={{ fill: "#FFCE00" }} cx="106.4" cy={136} r="3.2" />{" "}
            <polygon
              style={{ fill: "#FF9D00" }}
              points="107.2,147.2 110.4,144.8 114.4,144.8 113.6,152.8 "
            />{" "}
            <circle style={{ fill: "#FFCE00" }} cx={64} cy="29.6" r="3.2" />{" "}
            <polygon
              style={{ fill: "#FF9D00" }}
              points="63.2,18.4 60,20.8 56,21.6 56.8,12.8 "
            />{" "}
            <path
              style={{ fill: "#FFE000" }}
              d="M443.2,497.6c-30.4-80-106.4-132-194.4-132s-164,52-194.4,132H443.2z"
            />{" "}
            <path
              style={{ fill: "#EFC100" }}
              d="M443.2,497.6c-30.4-80-106.4-108.8-194.4-108.8s-164,28.8-194.4,108.8H443.2z"
            />{" "}
            <path
              style={{ fill: "#BC6C15" }}
              d="M284.8,375.2c0,109.6-16,68-36,68s-36,40.8-36-68c0-109.6,16-197.6,36-197.6S284.8,266.4,284.8,375.2 z"
            />{" "}
            <path
              style={{ fill: "#3CC676" }}
              d="M224.8,0c27.2,0,48.8,37.6,48.8,82.4s-24.8,82.4-48.8,82.4V1.6"
            />{" "}
            <path
              style={{ fill: "#0AA06E" }}
              d="M273.6,82.4c0,44.8-24.8,82.4-48.8,82.4V49.6"
            />{" "}
            <path
              style={{ fill: "#3CC676" }}
              d="M128,64c19.2-19.2,60-8.8,92,23.2s42.4,73.6,23.2,92L129.6,65.6"
            />{" "}
            <path
              style={{ fill: "#0AA06E" }}
              d="M220,87.2c32,32,42.4,73.6,23.2,92l-80.8-80"
            />{" "}
            <path
              style={{ fill: "#3CC676" }}
              d="M88,186.4c0-27.2,37.6-48.8,82.4-48.8s82.4,24,82.4,48h-164"
            />{" "}
            <path
              style={{ fill: "#0AA06E" }}
              d="M170.4,136.8c44.8,0,83.2,24.8,83.2,48.8H136.8"
            />{" "}
            <path
              style={{ fill: "#3CC676" }}
              d="M156,320c-22.4-14.4-21.6-56.8,2.4-95.2s62.4-57.6,84.8-43.2l-86.4,136"
            />{" "}
            <path
              style={{ fill: "#0AA06E" }}
              d="M158.4,224.8c24-38.4,62.4-57.6,84.8-43.2l-60.8,96"
            />{" "}
            <path
              style={{ fill: "#3CC676" }}
              d="M369.6,64c-19.2-19.2-60-8.8-92,23.2s-42.4,73.6-23.2,92L368,65.6"
            />{" "}
            <path
              style={{ fill: "#0AA06E" }}
              d="M277.6,87.2c-32,32-42.4,73.6-23.2,92l80.8-80.8"
            />{" "}
            <path
              style={{ fill: "#3CC676" }}
              d="M409.6,186.4c0-27.2-37.6-48.8-82.4-48.8s-82.4,24-82.4,48h164"
            />{" "}
            <path
              style={{ fill: "#0AA06E" }}
              d="M327.2,136.8c-44.8,0-83.2,24.8-83.2,48.8h116.8"
            />{" "}
            <path
              style={{ fill: "#3CC676" }}
              d="M341.6,320c22.4-14.4,21.6-56.8-2.4-95.2s-62.4-57.6-84.8-43.2l86.4,136"
            />{" "}
            <path
              style={{ fill: "#0AA06E" }}
              d="M339.2,224.8c-24-38.4-62.4-57.6-84.8-43.2l60.8,96"
            />{" "}
            <path
              style={{ fill: "#965011" }}
              d="M248.8,177.6c20,0,36,88.8,36,197.6c0,109.6-16,68-36,68"
            />{" "}
            <circle
              style={{ fill: "#FFC114" }}
              cx="218.4"
              cy="203.2"
              r="29.6"
            />{" "}
            <path
              style={{ fill: "#FF8A15" }}
              d="M240,182.4c12,12,12,30.4,0,42.4c-12,12-30.4,12-42.4,0"
            />{" "}
            <circle
              style={{ fill: "#FFC114" }}
              cx="279.2"
              cy="203.2"
              r="29.6"
            />{" "}
            <path
              style={{ fill: "#FF8A15" }}
              d="M300,182.4c12,12,12,30.4,0,42.4c-12,12-30.4,12-42.4,0"
            />{" "}
            <circle
              style={{ fill: "#FFC114" }}
              cx="248.8"
              cy="151.2"
              r="29.6"
            />{" "}
            <path
              style={{ fill: "#FF8A15" }}
              d="M248.8,121.6c16.8,0,29.6,13.6,29.6,29.6c0,16.8-13.6,29.6-29.6,29.6"
            />{" "}
            <g>
              {" "}
              <path
                style={{ fill: "#D88532" }}
                d="M270.4,245.6c0,1.6-1.6,4-4,4h-35.2c-2.4,0-4-2.4-4-4l0,0c0-1.6,1.6-4,4-4h35.2 C268.8,241.6,270.4,244,270.4,245.6L270.4,245.6z"
              />{" "}
              <path
                style={{ fill: "#D88532" }}
                d="M270.4,269.6c0,1.6-1.6,4-4,4h-35.2c-2.4,0-4-2.4-4-4l0,0c0-1.6,1.6-4,4-4h35.2 C268.8,265.6,270.4,268,270.4,269.6L270.4,269.6z"
              />{" "}
              <path
                style={{ fill: "#D88532" }}
                d="M270.4,293.6c0,1.6-1.6,4-4,4h-35.2c-2.4,0-4-2.4-4-4l0,0c0-1.6,1.6-4,4-4h35.2 C268.8,289.6,270.4,292,270.4,293.6L270.4,293.6z"
              />{" "}
              <path
                style={{ fill: "#D88532" }}
                d="M270.4,317.6c0,1.6-1.6,4-4,4h-35.2c-2.4,0-4-2.4-4-4l0,0c0-1.6,1.6-4,4-4h35.2 C268.8,313.6,270.4,316,270.4,317.6L270.4,317.6z"
              />{" "}
              <path
                style={{ fill: "#D88532" }}
                d="M270.4,341.6c0,1.6-1.6,4-4,4h-35.2c-2.4,0-4-2.4-4-4l0,0c0-1.6,1.6-4,4-4h35.2 C268.8,337.6,270.4,340,270.4,341.6L270.4,341.6z"
              />{" "}
              <path
                style={{ fill: "#D88532" }}
                d="M270.4,365.6c0,1.6-1.6,4-4,4h-35.2c-2.4,0-4-2.4-4-4l0,0c0-1.6,1.6-4,4-4h35.2 C268.8,361.6,270.4,364,270.4,365.6L270.4,365.6z"
              />{" "}
              <path
                style={{ fill: "#D88532" }}
                d="M270.4,389.6c0,1.6-1.6,4-4,4h-35.2c-2.4,0-4-2.4-4-4l0,0c0-1.6,1.6-4,4-4h35.2 C268.8,385.6,270.4,388,270.4,389.6L270.4,389.6z"
              />{" "}
            </g>{" "}
            <polygon
              style={{ fill: "#C69705" }}
              points="312.8,497.6 184.8,497.6 216,417.6 281.6,417.6 "
            />{" "}
          </g>
        </svg>
      );
    else if (hrs >= 17 && hrs <= 24)
      return (
        <svg
          height="32px"
          width="32px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 499.6 499.6"
          xmlSpace="preserve"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {" "}
            <circle
              style={{ fill: "#063F66" }}
              cx="249.6"
              cy={250}
              r="249.6"
            />{" "}
            <path
              style={{ fill: "#022730" }}
              d="M72.8,73.2c97.6-97.6,256-97.6,353.6,0s97.6,256,0,353.6"
            />{" "}
            <g>
              {" "}
              <ellipse
                style={{ fill: "#DCF9F6" }}
                cx="133.6"
                cy="425.2"
                rx="2.4"
                ry="21.6"
              />{" "}
              <ellipse
                style={{ fill: "#DCF9F6" }}
                cx="133.6"
                cy={426}
                rx="21.6"
                ry="2.4"
              />{" "}
              <ellipse
                transform="matrix(0.7054 -0.7088 0.7088 0.7054 18.6212 346.765)"
                style={{ fill: "#DCF9F6" }}
                cx="426.474"
                cy="150.981"
                rx="21.6"
                ry="2.4"
              />{" "}
              <ellipse
                transform="matrix(0.7054 0.7088 -0.7088 0.7054 232.7671 -257.5539)"
                style={{ fill: "#DCF9F6" }}
                cx="426.225"
                cy="151.245"
                rx="21.6"
                ry="2.4"
              />{" "}
              <ellipse
                style={{ fill: "#DCF9F6" }}
                cx="366.4"
                cy="84.4"
                rx="0.8"
                ry="9.6"
              />{" "}
              <ellipse
                style={{ fill: "#DCF9F6" }}
                cx="366.4"
                cy="84.4"
                rx="9.6"
                ry="0.8"
              />{" "}
              <ellipse
                transform="matrix(-0.7107 -0.7035 0.7035 -0.7107 232.771 301.5383)"
                style={{ fill: "#DCF9F6" }}
                cx="178.387"
                cy="102.907"
                rx="10.4"
                ry="0.8"
              />{" "}
              <ellipse
                transform="matrix(0.7107 -0.7035 0.7035 0.7107 -20.6411 155.2913)"
                style={{ fill: "#DCF9F6" }}
                cx="178.491"
                cy="102.742"
                rx="10.4"
                ry="0.8"
              />{" "}
              <ellipse
                transform="matrix(-0.7089 -0.7053 0.7053 -0.7089 -92.7171 692.6153)"
                style={{ fill: "#DCF9F6" }}
                cx="96.571"
                cy="365.441"
                rx="10.4"
                ry="0.8"
              />{" "}
              <ellipse
                transform="matrix(0.7089 -0.7053 0.7053 0.7089 -229.2989 174.8202)"
                style={{ fill: "#DCF9F6" }}
                cx="97.139"
                cy="365.198"
                rx="10.4"
                ry="0.8"
              />{" "}
              <ellipse
                transform="matrix(0.6999 -0.7143 0.7143 0.6999 37.5702 239.1812)"
                style={{ fill: "#DCF9F6" }}
                cx="303.395"
                cy="74.884"
                rx="4.8"
                ry="0.8"
              />{" "}
              <ellipse
                transform="matrix(0.6999 0.7143 -0.7143 0.6999 144.8238 -194.2028)"
                style={{ fill: "#DCF9F6" }}
                cx="303.501"
                cy="75.23"
                rx="4.8"
                ry="0.8"
              />{" "}
              <ellipse
                transform="matrix(0.7035 -0.7107 0.7107 0.7035 -253.5927 285.6034)"
                style={{ fill: "#DCF9F6" }}
                cx="215.49"
                cy="446.725"
                rx="4.8"
                ry="0.8"
              />{" "}
              <ellipse
                transform="matrix(0.7035 0.7107 -0.7107 0.7035 381.818 -20.7724)"
                style={{ fill: "#DCF9F6" }}
                cx="215.804"
                cy="447.211"
                rx="4.8"
                ry="0.8"
              />{" "}
              <circle style={{ fill: "#DCF9F6" }} cx="249.6" cy={250} r={160} />{" "}
            </g>{" "}
            <path
              style={{ fill: "#95BFB9" }}
              d="M249.6,410c-88,0-160-72-160-160s72-160,160-160"
            />{" "}
            <path
              style={{ fill: "#CAEDE7" }}
              d="M249.6,410c-88,0-112-72-112-160s23.2-160,112-160"
            />{" "}
            <g>
              {" "}
              <circle
                style={{ fill: "#78A8A0" }}
                cx="138.4"
                cy="165.2"
                r="9.6"
              />{" "}
              <circle
                style={{ fill: "#78A8A0" }}
                cx="124.8"
                cy="201.2"
                r="1.6"
              />{" "}
            </g>{" "}
            <g>
              {" "}
              <circle
                style={{ fill: "#DCF9F6" }}
                cx="189.6"
                cy={222}
                r="29.6"
              />{" "}
              <circle style={{ fill: "#DCF9F6" }} cx="202.4" cy="157.2" r={8} />{" "}
            </g>{" "}
            <circle style={{ fill: "#C3E5E0" }} cx="257.6" cy="153.2" r="2.4" />{" "}
            <circle style={{ fill: "#78A8A0" }} cx="278.4" cy={126} r="2.4" />{" "}
            <circle style={{ fill: "#DCF9F6" }} cx="201.6" cy="127.6" r={4} />{" "}
            <circle style={{ fill: "#95BFB9" }} cx="233.6" cy={114} r="1.6" />{" "}
            <g>
              {" "}
              <circle
                style={{ fill: "#C3E5E0" }}
                cx="270.4"
                cy={206}
                r="6.4"
              />{" "}
              <circle style={{ fill: "#C3E5E0" }} cx="318.4" cy={202} r={4} />{" "}
              <circle
                style={{ fill: "#C3E5E0" }}
                cx="328.8"
                cy="156.4"
                r="6.4"
              />{" "}
              <circle
                style={{ fill: "#C3E5E0" }}
                cx="300.8"
                cy="285.2"
                r="17.6"
              />{" "}
            </g>{" "}
            <g>
              {" "}
              <circle
                style={{ fill: "#DCF9F6" }}
                cx={156}
                cy="295.6"
                r="5.6"
              />{" "}
              <circle
                style={{ fill: "#DCF9F6" }}
                cx="213.6"
                cy="271.6"
                r="2.4"
              />{" "}
              <circle
                style={{ fill: "#DCF9F6" }}
                cx="241.6"
                cy="331.6"
                r="9.6"
              />{" "}
            </g>{" "}
            <circle style={{ fill: "#78A8A0" }} cx="124.8" cy="254.8" r="6.4" />{" "}
            <circle style={{ fill: "#C3E5E0" }} cx="267.2" cy="250.8" r="1.6" />{" "}
            <circle style={{ fill: "#95BFB9" }} cx={344} cy={254} r={4} />{" "}
            <g>
              {" "}
              <circle
                style={{ fill: "#DCF9F6" }}
                cx="174.4"
                cy="339.6"
                r="9.6"
              />{" "}
              <circle
                style={{ fill: "#DCF9F6" }}
                cx="193.6"
                cy="305.2"
                r="3.2"
              />{" "}
            </g>{" "}
            <circle style={{ fill: "#C3E5E0" }} cx="292.8" cy="342.8" r="3.2" />{" "}
            <g>
              {" "}
              <circle
                style={{ fill: "#95BFB9" }}
                cx="241.6"
                cy="369.2"
                r="2.4"
              />{" "}
              <circle
                style={{ fill: "#95BFB9" }}
                cx="201.6"
                cy="365.2"
                r="1.6"
              />{" "}
              <circle
                style={{ fill: "#95BFB9" }}
                cx="332.8"
                cy="328.4"
                r="6.4"
              />{" "}
            </g>{" "}
            <circle style={{ fill: "#C3E5E0" }} cx={284} cy="375.6" r={4} />{" "}
            <circle style={{ fill: "#DCF9F6" }} cx="245.6" cy="289.2" r="3.2" />{" "}
            <circle style={{ fill: "#95BFB9" }} cx="353.6" cy="300.4" r="6.4" />{" "}
            <circle style={{ fill: "#78A8A0" }} cx="134.4" cy="323.6" r="5.6" />{" "}
            <circle style={{ fill: "#C3E5E0" }} cx="309.6" cy="241.2" r="7.2" />{" "}
          </g>
        </svg>
      );
  };

  useEffect(() => {
    const { isLoggedIn } = auth;
    if (!isLoggedIn) {
      return redirect("/auth/sign-in");
    }

    const member = localStorage.getItem("admin");
    if (member) {
      const memberJson = JSON.parse(member);
      setAdminLevel(memberJson?.level);
    }
  }, []);

  return (
    <LayoutDashboard adminLevel={adminLevel}>
      <div
        style={{
          minHeight: "70vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <span
            style={{
              boxSizing: "border-box",
              marginRight: 12,
              padding: "0",
              color: "#fff",
              fontSize: "14px",
              fontVariant: "tabular-nums",
              lineHeight: "32px",
              listStyle: "none",
              fontFeatureSettings: '"tnum"',
              position: "relative",
              display: "inline-block",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textAlign: "center",
              verticalAlign: "middle",
              background: "#ccc",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
            }}
          >
            {getIcon()}
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                marginRight: "12px",
                marginBottom: "0",
                color: colorText,
                fontWeight: "600",
                fontSize: "20px",
                lineHeight: "32px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              title="Title"
            >
              Hi, {adminDetails?.name}!{getMessage()}
            </span>
            <span
              style={{
                marginRight: "12px",
                color: colorTextTertiary,
                fontSize: "14px",
                lineHeight: "1.5715",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              title="This is a subtitle"
            >
              <ClockAPI />
            </span>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export default DashboardPage;
