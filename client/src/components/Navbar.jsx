import React, { useState, useRef } from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Link } from "react-router";
import { Menu } from "primereact/menu";
import SidebarMenus from "./SidebarMenus";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
	const menuRight = useRef(null);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	// Use the auth context instead of local state
	const { currentUser, isAuth, logout } = useAuth();

	// Track window width for responsive logic
	React.useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const isSmallScreen = windowWidth < 768;

	const itemRenderer = (item) => (
		<div className="p-menuitem-content">
			<a
				className="flex align-items-center p-menuitem-link"
				onClick={item.command}
			>
				<span className={item.icon} />
				<span className="mx-2">{item.label}</span>
				{item.badge && <Badge className="ml-auto" value={item.badge} />}
				{item.shortcut && (
					<span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
						{item.shortcut}
					</span>
				)}
			</a>
		</div>
	);

	const profileMenuItems = [
		{
			label: "Profile",
			items: [
				{
					label: "Settings",
					icon: "pi pi-cog",
					shortcut: "⌘+O",
					template: itemRenderer,
				},
				{
					label: "Messages",
					icon: "pi pi-inbox",
					badge: 2,
					template: itemRenderer,
				},
				{
					label: "Logout",
					icon: "pi pi-sign-out",
					shortcut: "⌘+Q",
					template: itemRenderer,
					command: logout, // Use the logout function from context
				},
			],
		},
		{
			separator: true,
		},
		{
			template: () => {
				return (
					<button className="w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround">
						<Avatar
							image={
								currentUser.profilePhoto &&
								currentUser.profilePhoto.url
									? currentUser.profilePhoto.url
									: ""
							}
							alt={`${
								currentUser.firstName
									? currentUser.firstName
									: ""
							}'s profile`}
							className="mr-2"
							shape="circle"
						/>
						<div className="flex flex-column align">
							<span className="font-bold">
								{currentUser.firstName} {currentUser.lastName}
							</span>
							<span className="text-sm">{currentUser.role}</span>
						</div>
					</button>
				);
			},
		},
	];

	const items = [
		{
			label: "Home",
			icon: "pi pi-home",
			url: "/",
		},
		{
			label: "Dashboard",
			icon: "pi pi-chart-bar",
			url: "/admin/dashboard",
		},
	];

	const start = (
		<div className="flex align-items-center gap-2">
			{isAuth && <SidebarMenus />}
			<img
				alt="logo"
				src="https://primefaces.org/cdn/primereact/images/logo.png"
				height="40"
				className="mr-2"
			></img>
		</div>
	);
	const end = (
		<div className="flex align-items-center gap-2">
			<InputText
				type="text"
				id="globalSearch"
				name="globalSearch"
				placeholder="Search"
				className="w-8rem sm:w-auto"
			/>
			{!isAuth ? (
				<>
					<Link
						to="/login"
						rel="noopener noreferrer"
						className="no-underline p-button text-white"
					>
						Login
					</Link>
				</>
			) : (
				<>
					<Menu
						model={profileMenuItems}
						popup
						ref={menuRight}
						id="popup_menu_right"
						popupAlignment="right"
					/>
					<Avatar
						image={
							currentUser.profilePhoto &&
							currentUser.profilePhoto.url
								? currentUser.profilePhoto.url
								: ""
						}
						alt={`${
							currentUser.firstName ? currentUser.firstName : ""
						}'s profile`}
						shape="circle"
						size="large"
						className="ml-2"
						onClick={(event) => menuRight.current.toggle(event)}
						aria-controls="popup_menu_right"
						aria-haspopup
					/>
				</>
			)}
		</div>
	);

	return (
		<div className="card sticky top-0 z-3">
			<Menubar
				model={items}
				start={start}
				end={end}
				className="blur shadow-1"
			/>
		</div>
	);
}
