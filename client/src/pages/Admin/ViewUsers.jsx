import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import axios from "axios";
import { MultiSelect } from "primereact/multiselect";
import autoTable from "jspdf-autotable";
// import { jsPDF } from "jspdf";

export default function ManageUser() {
	let emptyUser = {
		id: null,
		name: "",
		email: "",
		role: "",
		status: "active",
	};

	const [users, setUsers] = useState([]);
	const [userDialog, setUserDialog] = useState(false);
	const [deleteUserDialog, setDeleteUserDialog] = useState(false);
	const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
	const [user, setUser] = useState(emptyUser);
	const [selectedUsers, setSelectedUsers] = useState(null);
	const [submitted, setSubmitted] = useState(false);
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		name: {
			operator: FilterOperator.AND,
			constraints: [
				{ value: null, matchMode: FilterMatchMode.STARTS_WITH },
			],
		},
		email: {
			operator: FilterOperator.AND,
			constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
		},
		role: { value: null, matchMode: FilterMatchMode.EQUALS },
		status: { value: null, matchMode: FilterMatchMode.EQUALS },
	});
	const [globalFilterValue, setGlobalFilterValue] = useState("");
	const toast = useRef(null);
	const dt = useRef(null);
	const allColumns = [
		{ field: "name", header: "Name" },
		{ field: "role", header: "Role" },
		{ field: "status", header: "Status" },
	];

	const [visibleColumns, setVisibleColumns] = useState(allColumns);

	const onColumnToggle = (event) => {
		let selectedCols = event.value;
		let orderedSelectedCols = allColumns.filter((col) =>
			selectedCols.some((sCol) => sCol.field === col.field)
		);
		setVisibleColumns(orderedSelectedCols);
	};

	const token = localStorage.getItem("token");

	useEffect(() => {
		// Simulate API call

		const fetchAllUsers = async () => {
			try {
				const response = await axios.get(
					"http://127.0.0.1:8000/api/user/allUsers",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				console.log("Fetched users:", response.data);
				setUsers(response.data.data);
			} catch (err) {
				console.error("Error fetching users:", err);
			}
		};

		fetchAllUsers();

		// setUsers([
		// 	{
		// 		id: "u1",
		// 		name: "Alice",
		// 		email: "alice@example.com",
		// 		role: "Admin",
		// 		status: "active",
		// 	},
		// 	{
		// 		id: "u2",
		// 		name: "Bob",
		// 		email: "bob@example.com",
		// 		role: "User",
		// 		status: "inactive",
		// 	},
		// ]);
	}, []);

	const openNew = () => {
		setUser(emptyUser);
		setSubmitted(false);
		setUserDialog(true);
	};

	const hideDialog = () => {
		setSubmitted(false);
		setUserDialog(false);
	};

	const hideDeleteUserDialog = () => {
		setDeleteUserDialog(false);
	};

	const hideDeleteUsersDialog = () => {
		setDeleteUsersDialog(false);
	};

	const saveUser = () => {
		setSubmitted(true);

		if (user.name.trim()) {
			let _users = [...users];
			let _user = { ...user };

			if (user.id) {
				const index = findIndexById(user.id);
				_users[index] = _user;
				toast.current.show({
					severity: "success",
					summary: "Successful",
					detail: "User Updated",
					life: 3000,
				});
			} else {
				_user.id = createId();
				_users.push(_user);
				toast.current.show({
					severity: "success",
					summary: "Successful",
					detail: "User Created",
					life: 3000,
				});
			}

			setUsers(_users);
			setUserDialog(false);
			setUser(emptyUser);
		}
	};

	const editUser = (user) => {
		setUser({ ...user });
		setUserDialog(true);
	};

	const confirmDeleteUser = (user) => {
		setUser(user);
		setDeleteUserDialog(true);
	};

	const deleteUser = () => {
		let _users = users.filter((val) => val.id !== user.id);
		setUsers(_users);
		setDeleteUserDialog(false);
		setUser(emptyUser);
		toast.current.show({
			severity: "success",
			summary: "Successful",
			detail: "User Deleted",
			life: 3000,
		});
	};

	const deleteSelectedUsers = () => {
		let _users = users.filter((val) => !selectedUsers.includes(val));
		setUsers(_users);
		setDeleteUsersDialog(false);
		setSelectedUsers(null);
		toast.current.show({
			severity: "success",
			summary: "Successful",
			detail: "Users Deleted",
			life: 3000,
		});
	};

	const findIndexById = (id) => users.findIndex((u) => u.id === id);

	const createId = () => Math.random().toString(36).substring(2, 7);

	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		let _filters = { ...filters };
		_filters["global"].value = value;
		setFilters(_filters);
		setGlobalFilterValue(value);
	};

	const leftToolbarTemplate = () => (
		<div className="flex flex-wrap gap-2">
			<Button
				label="New"
				icon="pi pi-plus"
				severity="success"
				onClick={openNew}
			/>
			<Button
				label="Delete"
				icon="pi pi-trash"
				severity="danger"
				onClick={() => setDeleteUsersDialog(true)}
				disabled={!selectedUsers || !selectedUsers.length}
			/>
		</div>
	);

	const exportColumns = allColumns.map((col) => ({
		title: col.header,
		dataKey: col.field,
	}));

	const exportCSV = (selectionOnly) => {
		dt.current.exportCSV({ selectionOnly });
	};

	const exportPdf = () => {
		import("jspdf").then((jsPDF) => {
			import("jspdf-autotable").then(() => {
				const doc = new jsPDF.default(0, 0);

				autoTable(doc, {
					columns: exportColumns,
					body: users,
				});
				doc.save("users.pdf");
			});
		});
	};

	const exportExcel = () => {
		import("xlsx").then((xlsx) => {
			const worksheet = xlsx.utils.json_to_sheet(users);
			const workbook = {
				Sheets: { data: worksheet },
				SheetNames: ["data"],
			};
			const excelBuffer = xlsx.write(workbook, {
				bookType: "xlsx",
				type: "array",
			});

			saveAsExcelFile(excelBuffer, "products");
		});
	};

	const saveAsExcelFile = (buffer, fileName) => {
		import("file-saver").then((module) => {
			if (module && module.default) {
				let EXCEL_TYPE =
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
				let EXCEL_EXTENSION = ".xlsx";
				const data = new Blob([buffer], {
					type: EXCEL_TYPE,
				});

				module.default.saveAs(
					data,
					fileName +
						"_export_" +
						new Date().getTime() +
						EXCEL_EXTENSION
				);
			}
		});
	};
	const rightToolbarTemplate = () => (
		<>
			<label className="font-bold mr-2">Export in:</label>
			<Button
				type="button"
				icon="pi pi-file"
				rounded
				onClick={() => exportCSV(false)}
				data-pr-tooltip="CSV"
				className="mr-2"
			/>
			<Button
				type="button"
				icon="pi pi-file-excel"
				severity="success"
				rounded
				onClick={exportExcel}
				data-pr-tooltip="XLS"
				className="mr-2"
			/>
			<Button
				type="button"
				icon="pi pi-file-pdf"
				severity="warning"
				rounded
				onClick={exportPdf}
				data-pr-tooltip="PDF"
			/>
		</>
	);

	const actionBodyTemplate = (rowData) => (
		<>
			<Button
				icon="pi pi-pencil"
				rounded
				outlined
				className="mr-2"
				onClick={() => editUser(rowData)}
			/>
			<Button
				icon="pi pi-trash"
				rounded
				outlined
				severity="danger"
				onClick={() => confirmDeleteUser(rowData)}
			/>
		</>
	);

	const statusBodyTemplate = (rowData) => (
		<Tag
			value={rowData.status ? "Active" : "Inactive"}
			severity={rowData.status ? "success" : "danger"}
		></Tag>
	);

	const header = (
		<div className="flex flex-wrap gap-3 align-items-center justify-content-between">
			<h4 className="m-0">Manage Users</h4>
			<div className="flex gap-2 align-items-center">
				<IconField iconPosition="left">
					<InputIcon className="pi pi-search" />
					<InputText
						value={globalFilterValue}
						onChange={onGlobalFilterChange}
						placeholder="Search..."
					/>
				</IconField>
				<MultiSelect
					value={visibleColumns}
					options={allColumns}
					optionLabel="header"
					onChange={onColumnToggle}
					display="chip"
					className="w-full md:w-20rem"
					placeholder="Select Columns"
				/>
			</div>
		</div>
	);

	const userDialogFooter = (
		<>
			<Button
				label="Cancel"
				icon="pi pi-times"
				outlined
				onClick={hideDialog}
			/>
			<Button label="Save" icon="pi pi-check" onClick={saveUser} />
		</>
	);

	const deleteUserDialogFooter = (
		<>
			<Button
				label="No"
				icon="pi pi-times"
				outlined
				onClick={hideDeleteUserDialog}
			/>
			<Button
				label="Yes"
				icon="pi pi-check"
				severity="danger"
				onClick={deleteUser}
			/>
		</>
	);

	const deleteUsersDialogFooter = (
		<>
			<Button
				label="No"
				icon="pi pi-times"
				outlined
				onClick={hideDeleteUsersDialog}
			/>
			<Button
				label="Yes"
				icon="pi pi-check"
				severity="danger"
				onClick={deleteSelectedUsers}
			/>
		</>
	);

	return (
		<div className="lg:my-4 lg:mx-6">
			<Toast ref={toast} />
			<div className="card">
				<Toolbar
					className="mb-4"
					left={leftToolbarTemplate}
					right={rightToolbarTemplate}
				/>
				<DataTable
					ref={dt}
					value={users}
					selection={selectedUsers}
					onSelectionChange={(e) => setSelectedUsers(e.value)}
					dataKey="_id"
					paginator
					rows={10}
					rowsPerPageOptions={[5, 10, 25]}
					filters={filters}
					filterDisplay="menu"
					globalFilterFields={["name", "email", "role", "status"]}
					header={header}
					emptyMessage="No users found."
					currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
				>
					<Column
						selectionMode="multiple"
						headerStyle={{ width: "3rem" }}
					/>

					<Column
						field="email"
						header="Email"
						sortable
						filter
						filterPlaceholder="Search by email"
					/>

					{visibleColumns.map((col) => {
						let bodyTemplate = undefined;
						if (col.field === "status") {
							bodyTemplate = statusBodyTemplate;
						} else if (col.field === "name") {
							bodyTemplate = (rowData) =>
								`${rowData.firstName || ""} ${
									rowData.lastName || ""
								}`.trim();
						}

						return (
							<Column
								key={col.field}
								field={col.field}
								header={col.header}
								sortable
								filter
								filterPlaceholder={`Search by ${col.field}`}
								body={bodyTemplate}
							/>
						);
					})}

					<Column
						body={actionBodyTemplate}
						exportable={false}
						style={{ minWidth: "10rem" }}
					/>
				</DataTable>
			</div>

			<Dialog
				visible={userDialog}
				style={{ width: "32rem" }}
				header="User Details"
				modal
				className="p-fluid"
				footer={userDialogFooter}
				onHide={hideDialog}
			>
				<div className="field">
					<label htmlFor="firstName" className="font-bold">
						First Name
					</label>
					<InputText
						id="firstName"
						value={user.firstName || ""}
						onChange={(e) =>
							setUser({ ...user, firstName: e.target.value })
						}
						required
						autoFocus
						className={classNames({
							"p-invalid": submitted && !user.firstName,
						})}
					/>
					{submitted && !user.firstName && (
						<small className="p-error">
							First name is required.
						</small>
					)}
				</div>
				<div className="field">
					<label htmlFor="lastName" className="font-bold">
						Last Name
					</label>
					<InputText
						id="lastName"
						value={user.lastName || ""}
						onChange={(e) =>
							setUser({ ...user, lastName: e.target.value })
						}
						required
						className={classNames({
							"p-invalid": submitted && !user.lastName,
						})}
					/>
					{submitted && !user.lastName && (
						<small className="p-error">
							Last name is required.
						</small>
					)}
				</div>
				<div className="field">
					<label htmlFor="email" className="font-bold">
						Email
					</label>
					<InputText
						id="email"
						value={user.email}
						onChange={(e) =>
							setUser({ ...user, email: e.target.value })
						}
						required
					/>
				</div>
				<div className="field">
					<label htmlFor="role" className="font-bold">
						Role
					</label>
					<InputText
						id="role"
						value={user.role}
						onChange={(e) =>
							setUser({ ...user, role: e.target.value })
						}
						required
					/>
				</div>
			</Dialog>

			<Dialog
				visible={deleteUserDialog}
				style={{ width: "32rem" }}
				header="Confirm"
				modal
				footer={deleteUserDialogFooter}
				onHide={hideDeleteUserDialog}
			>
				<div className="confirmation-content">
					<i
						className="pi pi-exclamation-triangle mr-3"
						style={{ fontSize: "2rem" }}
					/>
					{user && (
						<span>
							Are you sure you want to delete{" "}
							<b>
								{`${user.firstName || ""} ${
									user.lastName || ""
								}`.trim()}
							</b>
							?
						</span>
					)}
				</div>
			</Dialog>

			<Dialog
				visible={deleteUsersDialog}
				style={{ width: "32rem" }}
				header="Confirm"
				modal
				footer={deleteUsersDialogFooter}
				onHide={hideDeleteUsersDialog}
			>
				<div className="confirmation-content">
					<i
						className="pi pi-exclamation-triangle mr-3"
						style={{ fontSize: "2rem" }}
					/>
					<span>
						Are you sure you want to delete the selected users?
					</span>
				</div>
			</Dialog>
		</div>
	);
}
