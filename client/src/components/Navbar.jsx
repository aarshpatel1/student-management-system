import React from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Link } from "react-router";

export default function Navbar() {
	const itemRenderer = (item) => (
		<a className="flex align-items-center p-menuitem-link">
			<span className={item.icon} />
			<span className="mx-2">{item.label}</span>
			{item.badge && <Badge className="ml-auto" value={item.badge} />}
			{item.shortcut && (
				<span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
					{item.shortcut}
				</span>
			)}
		</a>
	);
	const items = [
		{
			label: "Home",
			icon: "pi pi-home",
			url: "/",
		},
		{
			label: "Dashboard",
			icon: "pi pi-chart-bar",
			url: "/dashboard",
		},
	];

	const start = (
		<img
			alt="logo"
			src="https://primefaces.org/cdn/primereact/images/logo.png"
			height="40"
			className="mr-2"
		></img>
	);
	const end = (
		<div className="flex align-items-center gap-2">
			<InputText
				placeholder="Search"
				type="text"
				className="w-8rem sm:w-auto"
			/>
			<Link
				to="/signup"
				rel="noopener noreferrer"
				className="no-underline p-button text-white"
			>
				Signup
			</Link>
			<Link
				to="/login"
				rel="noopener noreferrer"
				className="no-underline p-button text-white"
			>
				Login
			</Link>
			<Avatar
				image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
				shape="circle"
				size="large"
			/>
		</div>
	);

	return (
		<div className="card">
			<Menubar model={items} start={start} end={end} />
		</div>
	);
}
