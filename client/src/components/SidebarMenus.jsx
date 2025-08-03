import React, { useState, useRef, useEffect } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Ripple } from "primereact/ripple";
import { StyleClass } from "primereact/styleclass";
import { Icon } from "@iconify-icon/react";
import LogoSVG from "./LogoSVG";
import { Link } from "react-router";
import { isAuthenticated } from "../utils/auth";
import axios from "axios";
import api from "../../config/axiosConfig";

export default function SidebarMenus() {
	const [visible, setVisible] = useState(false);
	const btnRef1 = useRef(null);
	const btnRef2 = useRef(null);

	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		// Check authentication when component mounts
		const checkAndLoadUser = () => {
			if (isAuthenticated()) {
				const token = localStorage.getItem("token");
				if (token) {
					try {
						const base64Url = token.split(".")[1];
						const base64 = base64Url
							.replace(/-/g, "+")
							.replace(/_/g, "/");
						const jsonPayload = decodeURIComponent(
							atob(base64)
								.split("")
								.map(function (c) {
									return (
										"%" +
										(
											"00" + c.charCodeAt(0).toString(16)
										).slice(-2)
									);
								})
								.join("")
						);
						const payload = JSON.parse(jsonPayload);
						const userId = payload.id;
						axios.defaults.headers.common[
							"Authorization"
						] = `Bearer ${token}`;
						fetchCurrentUser(token, userId);
					} catch (err) {
						console.error("Error decoding token:", err);
					}
				}
			} else {
				setCurrentUser({});
			}
		};

		// Initial check when component mounts
		checkAndLoadUser();
	}, []);

	const fetchCurrentUser = async (token, userId) => {
		try {
			const response = await api.get(`/user/getUser/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			// console.log("Current User:", response.data);
			setCurrentUser(response.data.user);
		} catch (error) {
			console.error("Error fetching current user:", error);
		}
	};

	const toTitleCase = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const handleNavigate = () => {
		setVisible(false);
	};

	return (
		<div className="card flex justify-content-center">
			<Sidebar
				visible={visible}
				onHide={() => setVisible(false)}
				content={({ closeIconRef, hide }) => (
					<div className="min-h-screen flex relative lg:static surface-ground">
						<div
							id="app-sidebar"
							className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 surface-border select-none"
							style={{ width: "300px" }}
						>
							<div className="flex flex-column h-full">
								<div className="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
									<span className="inline-flex align-items-center gap-2">
										<LogoSVG />
										<span className="font-semibold text-2xl text-primary">
											{toTitleCase(currentUser.role)}
										</span>
									</span>
									<span>
										<Button
											type="button"
											ref={closeIconRef}
											onClick={(e) => hide(e)}
											icon="pi pi-times"
											rounded
											outlined
											className="h-2rem w-2rem"
										></Button>
									</span>
								</div>
								<div className="overflow-y-auto">
									{currentUser.role === "admin" && (
										<ul className="list-none p-3 m-0">
											<li>
												<StyleClass
													nodeRef={btnRef1}
													selector="@next"
													enterFromClassName="hidden"
													enterActiveClassName="slidedown"
													leaveToClassName="hidden"
													leaveActiveClassName="slideup"
												>
													<div
														ref={btnRef1}
														className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer"
													>
														<span className="font-medium flex align-items-center gap-2">
															<Icon
																icon="ix:user-management-settings"
																width="24"
																height="24"
															/>
															Manage Users
														</span>
														<i className="pi pi-chevron-down"></i>
														<Ripple />
													</div>
												</StyleClass>

												<ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
													<li>
														<span className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
															<Link
																to={
																	"/admin/addUser"
																}
																className="font-medium flex align-items-center gap-2"
																onClick={
																	handleNavigate
																}
															>
																<Icon
																	icon="fluent:table-add-20-regular"
																	width="24"
																	height="24"
																/>
																Add
															</Link>
															<Ripple />
														</span>
													</li>
													<li>
														<span className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
															<Link
																to={
																	"/admin/viewUsers"
																}
																className="font-medium flex align-items-center gap-2"
																onClick={
																	handleNavigate
																}
															>
																<Icon
																	icon="fluent:table-search-20-regular"
																	width="24"
																	height="24"
																/>
																View
															</Link>
															<Ripple />
														</span>
													</li>
												</ul>
											</li>
										</ul>
									)}
									<ul className="list-none p-3 m-0">
										<li>
											<StyleClass
												nodeRef={btnRef2}
												selector="@next"
												enterFromClassName="hidden"
												enterActiveClassName="slidedown"
												leaveToClassName="hidden"
												leaveActiveClassName="slideup"
											>
												<div
													ref={btnRef2}
													className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer"
												>
													<span className="font-medium">
														APPLICATION
													</span>
													<i className="pi pi-chevron-down"></i>
													<Ripple />
												</div>
											</StyleClass>
											<ul className="list-none p-0 m-0 overflow-hidden">
												<li>
													<span className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
														<i className="pi pi-folder mr-2"></i>
														<span
															className="font-medium"
															onClick={
																handleNavigate
															}
														>
															Projects
														</span>
														<Ripple />
													</span>
												</li>
												<li>
													<span className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
														<i className="pi pi-chart-bar mr-2"></i>
														<span
															className="font-medium"
															onClick={
																handleNavigate
															}
														>
															Performance
														</span>
														<Ripple />
													</span>
												</li>
												<li>
													<span className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
														<i className="pi pi-comments mr-2"></i>
														<span
															className="font-medium"
															onClick={
																handleNavigate
															}
														>
															Messages
														</span>
														<span
															className="inline-flex align-items-center justify-content-center ml-auto bg-blue-500 text-0 border-circle"
															style={{
																minWidth:
																	"1.5rem",
																height: "1.5rem",
															}}
														>
															3
														</span>
														<Ripple />
													</span>
												</li>
												<li>
													<span className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
														<i className="pi pi-calendar mr-2"></i>
														<span
															className="font-medium"
															onClick={
																handleNavigate
															}
														>
															Calendar
														</span>
														<Ripple />
													</span>
												</li>
												<li>
													<span className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
														<i className="pi pi-cog mr-2"></i>
														<span
															className="font-medium"
															onClick={
																handleNavigate
															}
														>
															Settings
														</span>
														<Ripple />
													</span>
												</li>
											</ul>
										</li>
									</ul>
								</div>
								<div className="mt-auto">
									<hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
									<span className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
										<Avatar
											image={
												currentUser.profilePhoto &&
												currentUser.profilePhoto.url
													? currentUser.profilePhoto
															.url
													: ""
											}
											alt={`${
												currentUser.firstName
													? currentUser.firstName
													: ""
											}'s profile`}
											shape="circle"
											size="large"
											className="ml-2"
										/>
										<span className="font-bold ml-3">
											{currentUser.firstName}{" "}
											{currentUser.lastName}
										</span>
									</span>
								</div>
							</div>
						</div>
					</div>
				)}
			></Sidebar>
			<Button icon="pi pi-bars" onClick={(e) => setVisible(true)} text />
		</div>
	);
}
