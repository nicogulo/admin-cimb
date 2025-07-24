"use client"
import {theme} from "antd";
import LayoutDashboard from "@/components/Layouts/Dashboard";
import React, {useEffect, useState} from "react";

const PageColor = () => {
    const {token} = theme.useToken();
    const colors = Object.keys(token) as (keyof typeof token)[];
    const [adminLevel, setAdminLevel] = useState<number>(0);

    useEffect(() => {
        const member = localStorage.getItem("admin");
        if (member) {
            const memberJson = JSON.parse(member);
            setAdminLevel(memberJson?.level);
        }
    }, []);

    return (
        <LayoutDashboard adminLevel={adminLevel}>
            <div>
                {colors.map((value, key, a) => {
                    const color : any = token[value];
                    return (
                        <div key={key}>
                            <div style={{padding: 5, background: color, marginBottom: 1}}>
                                <h3 style={{}}>{value}  |  {color}</h3>
                            </div>
                        </div>
                    )
                })}
            </div>
        </LayoutDashboard>
    )
}

export default PageColor