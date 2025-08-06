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
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import axios from "axios";
import { MultiSelect } from "primereact/multiselect";
import autoTable from "jspdf-autotable";
import { Link } from "react-router";

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
		{ field: "gender", header: "Gender" },
		{ field: "mobileNumber", header: "Mobile Number" },
		{ field: "address", header: "Address" },
		{ field: "city", header: "City" },
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
	}, []);

	// const openNew = () => {
	// 	setUser(emptyUser);
	// 	setSubmitted(false);
	// 	setUserDialog(true);
	// };

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

	const onRowEditComplete = (e) => {
		let _users = [...users];
		let { newData, index } = e;

		// Handle splitting name field if it was edited
		if (newData.name !== undefined) {
			const nameParts = newData.name.trim().split(" ");
			newData.firstName = nameParts[0] || "";
			newData.lastName = nameParts.slice(1).join(" ") || "";
			// Remove the temporary name property as it's not in your database schema
			delete newData.name;
		}

		_users[index] = newData;

		// Send update to backend
		updateUserInDatabase(newData)
			.then(() => {
				setUsers(_users);
				toast.current.show({
					severity: "success",
					summary: "Updated",
					detail: "User info updated",
					life: 3000,
				});
			})
			.catch((error) => {
				console.error("Error updating user:", error);
				toast.current.show({
					severity: "error",
					summary: "Error",
					detail: "Failed to update user information",
					life: 3000,
				});
			});
	};

	const updateUserInDatabase = async (userData) => {
		const token = localStorage.getItem("token");
		return axios.put(
			`http://127.0.0.1:8000/api/user/updateUser/${userData._id}`,
			userData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
	};

	const textEditor = (options) => (
		<InputText
			type="text"
			value={options.value}
			onChange={(e) => options.editorCallback(e.target.value)}
		/>
	);

	const nameEditor = (options) => {
		const fullName = options.value || "";

		return (
			<InputText
				type="text"
				value={fullName}
				onChange={(e) => {
					options.editorCallback(e.target.value);
				}}
			/>
		);
	};

	const rolesOptions = [
		{ label: "Admin", value: "admin" },
		{ label: "Faculty", value: "faculty" },
		{ label: "Student", value: "student" },
	];

	const roleEditor = (options) => (
		<Dropdown
			value={options.value}
			options={rolesOptions}
			onChange={(e) => options.editorCallback(e.value)}
			placeholder="Select Role"
		/>
	);

	const statusOptions = [
		{ label: "Active", value: "active" },
		{ label: "Inactive", value: "inactive" },
	];

	const statusEditor = (options) => (
		<Dropdown
			value={options.value}
			options={statusOptions}
			onChange={(e) => options.editorCallback(e.value)}
			placeholder="Select Status"
		/>
	);

	const genderOptions = [
		{ label: "Male", value: "male" },
		{ label: "Female", value: "female" },
		{ label: "Other", value: "other" },
	];

	const genderEditor = (options) => (
		<Dropdown
			value={options.value}
			options={genderOptions}
			onChange={(e) => options.editorCallback(e.value)}
			placeholder="Select Gender"
		/>
	);

	const editUser = async (user) => {
		setUser({ ...user });
		setUserDialog(true); // Open the dialog for editing
	};

	const saveUser = async () => {
		setSubmitted(true);

		if (
			user.firstName.trim() &&
			user.lastName.trim() &&
			user.email.trim()
		) {
			try {
				const token = localStorage.getItem("token");
				const response = await axios.put(
					`http://127.0.0.1:8000/api/user/updateUser/${user.id}`,
					user,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.status === 200) {
					const updatedUser = response.data.user;
					const updatedUsers = users.map((u) =>
						u.id === updatedUser.id ? updatedUser : u
					);
					setUsers(updatedUsers);
					toast.current.show({
						severity: "success",
						summary: "Successful",
						detail: "User Updated",
						life: 3000,
					});
					setUserDialog(false);
					setUser(emptyUser);
				}
			} catch (err) {
				console.error("Error updating user:", err);
				toast.current.show({
					severity: "error",
					summary: "Error",
					detail: "Failed to update user",
					life: 3000,
				});
			}
		}
	};

	const confirmDeleteUser = (user) => {
		setUser(user);
		setDeleteUserDialog(true);
	};

	const deleteUser = async () => {
		try {
			const token = localStorage.getItem("token");
			const response = await axios.delete(
				`http://127.0.0.1:8000/api/user/deleteUser/${user.id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.status === 200) {
				const updatedUsers = users.filter((u) => u.id !== user.id);
				setUsers(updatedUsers);
				toast.current.show({
					severity: "success",
					summary: "Successful",
					detail: "User Deleted",
					life: 3000,
				});
				setDeleteUserDialog(false);
				setUser(emptyUser);
			}
		} catch (err) {
			console.error("Error deleting user:", err);
			toast.current.show({
				severity: "error",
				summary: "Error",
				detail: "Failed to delete user",
				life: 3000,
			});
		}
	};

	const deleteSelectedUsers = async () => {
		try {
			const token = localStorage.getItem("token");
			const deletePromises = selectedUsers.map((user) =>
				axios.delete(
					`http://127.0.0.1:8000/api/user/deleteUser/${user.id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
			);

			await Promise.all(deletePromises);

			const updatedUsers = users.filter(
				(u) => !selectedUsers.some((s) => s.id === u.id)
			);
			setUsers(updatedUsers);
			toast.current.show({
				severity: "success",
				summary: "Successful",
				detail: "Selected Users Deleted",
				life: 3000,
			});
			setDeleteUsersDialog(false);
			setSelectedUsers(null);
		} catch (err) {
			console.error("Error deleting selected users:", err);
			toast.current.show({
				severity: "error",
				summary: "Error",
				detail: "Failed to delete selected users",
				life: 3000,
			});
		}
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
			<Link to="/admin/addUser">
				<Button label="New" icon="pi pi-plus" severity="success" />
			</Link>
			<Button
				label="Delete"
				icon="pi pi-trash"
				severity="danger"
				onClick={() => setDeleteUsersDialog(true)}
				disabled={!selectedUsers || !selectedUsers.length}
			/>
		</div>
	);

	const exportColumns = [
		{ title: "Email", dataKey: "email" }, // Ensure email is always the first column
		...visibleColumns
			.map((col) => {
				if (col.field === "name") {
					return [
						{ title: "First Name", dataKey: "firstName" },
						{ title: "Last Name", dataKey: "lastName" },
					];
				}
				if (col.field !== "email") {
					return { title: col.header, dataKey: col.field };
				}
				return null;
			})
			.flat()
			.filter(Boolean), // Remove null values
	];

	// Ensure the email column is always included
	if (!exportColumns.some((col) => col.dataKey === "email")) {
		exportColumns.unshift({ title: "Email", dataKey: "email" });
	}

	const exportData = users.map((user) => {
		const row = {};
		row["email"] = user.email || "";
		visibleColumns.forEach((col) => {
			if (col.field === "name") {
				row["firstName"] = user.firstName || "";
				row["lastName"] = user.lastName || "";
			} else if (col.field !== "email") {
				row[col.field] = user[col.field];
			}
		});
		return row;
	});

	const exportCSV = (selectionOnly) => {
		const dataToExport = selectionOnly
			? selectedUsers.map((user) =>
					exportData.find((u) => u.id === user.id)
			  )
			: exportData;

		// Convert data to CSV format
		const csvContent = [
			exportColumns.map((col) => col.title).join(","), // Header row
			...dataToExport.map((row) =>
				exportColumns.map((col) => row[col.dataKey] || "").join(",")
			),
		].join("\n");

		// Trigger download
		const blob = new Blob([csvContent], {
			type: "text/csv;charset=utf-8;",
		});
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = "users_export.csv";
		link.click();
	};

	const exportPdf = () => {
		import("jspdf").then((jsPDF) => {
			import("jspdf-autotable").then(() => {
				const doc = new jsPDF.default(0, 0);

				// Add a header to the PDF
				doc.setFontSize(16);
				doc.text("User Management Report", 14, 20); // Title text at (x: 14, y: 20)

				// Add the table below the header
				autoTable(doc, {
					startY: 30, // Start the table below the header
					head: [exportColumns.map((col) => col.title)], // Table headers
					body: exportData.map((row) =>
						exportColumns.map((col) => row[col.dataKey] || "")
					), // Table data
				});

				// Save the PDF
				doc.save("users.pdf");
			});
		});
	};

	const exportExcel = () => {
		import("xlsx").then((xlsx) => {
			const worksheet = xlsx.utils.json_to_sheet(exportData);
			const workbook = {
				Sheets: { data: worksheet },
				SheetNames: ["data"],
			};
			const excelBuffer = xlsx.write(workbook, {
				bookType: "xlsx",
				type: "array",
			});

			saveAsExcelFile(excelBuffer, "users");
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
			{/* <Button
				icon="pi pi-pencil"
				rounded
				outlined
				className="mr-2"
				onClick={() => editUser(rowData)}
			/> */}
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
					editMode="row"
					dataKey="_id"
					onRowEditComplete={onRowEditComplete}
					selection={selectedUsers}
					onSelectionChange={(e) => setSelectedUsers(e.value)}
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
						let bodyTemplate, editorTemplate;

						if (col.field === "role") {
							bodyTemplate = (rowData) => rowData.role || "N/A";
							editorTemplate = roleEditor;
						} else if (col.field === "gender") {
							editorTemplate = genderEditor;
						} else if (col.field === "status") {
							bodyTemplate = statusBodyTemplate;
							editorTemplate = statusEditor;
						} else if (col.field === "name") {
							bodyTemplate = (rowData) => {
								const fullName = `${rowData.firstName || ""} ${
									rowData.lastName || ""
								}`.trim();
								return fullName || "N/A";
							};
							editorTemplate = nameEditor;
						} else {
							editorTemplate = textEditor;
						}

						return (
							<Column
								key={col.field}
								field={col.field}
								header={col.header}
								sortable
								filter
								body={bodyTemplate}
								editor={editorTemplate}
							/>
						);
					})}

					<Column
						header="Edit Row"
						rowEditor
						headerStyle={{ width: "10%", minWidth: "8rem" }}
						bodyStyle={{ textAlign: "center" }}
					/>
					<Column
						header="Delete"
						body={actionBodyTemplate}
						exportable={false}
						style={{ minWidth: "8rem" }}
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
