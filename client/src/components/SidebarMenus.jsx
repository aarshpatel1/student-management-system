import React, { useState, useRef } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Ripple } from "primereact/ripple";
import { StyleClass } from "primereact/styleclass";
import { Icon } from "@iconify-icon/react";
import LogoSVG from "./LogoSVG";

export default function SidebarMenus() {
	const [visible, setVisible] = useState(false);
	const btnRef1 = useRef(null);
	const btnRef2 = useRef(null);
	const btnRef3 = useRef(null);
	const btnRef4 = useRef(null);

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
											Admin
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

											<ul className="list-none p-0 m-0 overflow-hidden pl-3	">
												<li>
													<StyleClass
														nodeRef={btnRef2}
														selector="@next"
														enterFromClassName="hidden"
														enterActiveClassName="slidedown"
														leaveToClassName="hidden"
														leaveActiveClassName="slideup"
													>
														<a
															ref={btnRef2}
															className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
														>
															<span className="font-medium flex align-items-center gap-2">
																<Icon
																	icon="streamline-plump:class-lesson"
																	width="24"
																	height="24"
																/>
																Faculties
															</span>
															<i className="pi pi-chevron-down ml-auto mr-1"></i>
															<Ripple />
														</a>
													</StyleClass>
													<ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
														<li>
															<a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
																<span className="font-medium flex align-items-center gap-2">
																	<Icon
																		icon="fluent:table-add-20-regular"
																		width="24"
																		height="24"
																	/>
																	Add
																</span>
																<Ripple />
															</a>
														</li>
														<li>
															<a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
																<span className="font-medium flex align-items-center gap-2">
																	<Icon
																		icon="fluent:table-search-20-regular"
																		width="24"
																		height="24"
																	/>
																	View
																</span>
																<Ripple />
															</a>
														</li>
														<li>
															<a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
																<span className="font-medium flex align-items-center gap-2">
																	<Icon
																		icon="fluent:table-edit-20-regular"
																		width="24"
																		height="24"
																	/>
																	Edit
																</span>
																<Ripple />
															</a>
														</li>
													</ul>
												</li>
												<li>
													<StyleClass
														nodeRef={btnRef3}
														selector="@next"
														enterFromClassName="hidden"
														enterActiveClassName="slidedown"
														leaveToClassName="hidden"
														leaveActiveClassName="slideup"
													>
														<a
															ref={btnRef3}
															className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
														>
															<span className="font-medium flex align-items-center gap-2">
																<Icon
																	icon="ph:student"
																	width="24"
																	height="24"
																/>
																Students
															</span>
															<i className="pi pi-chevron-down ml-auto mr-1"></i>
															<Ripple />
														</a>
													</StyleClass>
													<ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
														<li>
															<a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
																<span className="font-medium flex align-items-center gap-2">
																	<Icon
																		icon="fluent:table-add-20-regular"
																		width="24"
																		height="24"
																	/>
																	Add
																</span>
																<Ripple />
															</a>
														</li>
														<li>
															<a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
																<span className="font-medium flex align-items-center gap-2">
																	<Icon
																		icon="fluent:table-search-20-regular"
																		width="24"
																		height="24"
																	/>
																	View
																</span>
																<Ripple />
															</a>
														</li>
														<li>
															<a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
																<span className="font-medium flex align-items-center gap-2">
																	<Icon
																		icon="fluent:table-edit-20-regular"
																		width="24"
																		height="24"
																	/>
																	Edit
																</span>
																<Ripple />
															</a>
														</li>
													</ul>
												</li>
											</ul>
										</li>
									</ul>
									<ul className="list-none p-3 m-0">
										<li>
											<StyleClass
												nodeRef={btnRef4}
												selector="@next"
												enterFromClassName="hidden"
												enterActiveClassName="slidedown"
												leaveToClassName="hidden"
												leaveActiveClassName="slideup"
											>
												<div
													ref={btnRef4}
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
													<a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
														<i className="pi pi-folder mr-2"></i>
														<span className="font-medium">
															Projects
														</span>
														<Ripple />
													</a>
												</li>
												<li>
													<a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
														<i className="pi pi-chart-bar mr-2"></i>
														<span className="font-medium">
															Performance
														</span>
														<Ripple />
													</a>
												</li>
												<li>
													<a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
														<i className="pi pi-comments mr-2"></i>
														<span className="font-medium">
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
													</a>
												</li>
												<li>
													<a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
														<i className="pi pi-calendar mr-2"></i>
														<span className="font-medium">
															Calendar
														</span>
														<Ripple />
													</a>
												</li>
												<li>
													<a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
														<i className="pi pi-cog mr-2"></i>
														<span className="font-medium">
															Settings
														</span>
														<Ripple />
													</a>
												</li>
											</ul>
										</li>
									</ul>
								</div>
								<div className="mt-auto">
									<hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
									<a className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
										<Avatar
											image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
											shape="circle"
										/>
										<span className="font-bold">
											Amy Elsner
										</span>
									</a>
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
