import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import axios from "axios";

const ProfilePhotoEditor = ({ rowData, users, setUsers, editing = false }) => {
	const toast = useRef(null);
	const [loading, setLoading] = useState(false);

	const uploadPhoto = async ({ files }) => {
		const file = files[0];
		const token = localStorage.getItem("token");

		const formData = new FormData();
		formData.append("profilePhoto", file);

		try {
			setLoading(true);

			const response = await axios.patch(
				`http://127.0.0.1:8000/api/user/updateUser/${rowData._id}`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "multipart/form-data",
					},
				}
			);

			const updatedUrl = response.data.user.profilePhoto.url;
			const updatedUsers = users.map((u) =>
				u._id === rowData._id
					? { ...u, profilePhoto: { url: updatedUrl } }
					: u
			);
			setUsers(updatedUsers);

			toast.current.show({
				severity: "success",
				summary: "Success",
				detail: "Profile photo updated",
				life: 3000,
			});
		} catch (error) {
			console.error("Error updating profile photo:", error);
			toast.current.show({
				severity: "error",
				summary: "Error",
				detail: "Upload failed",
				life: 3000,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-column gap-2">
			<Toast ref={toast} />
			{rowData.profilePhoto?.url && (
				<img
					src={rowData.profilePhoto.url}
					alt="Profile"
					style={{
						width: 40,
						height: 40,
						borderRadius: "50%",
						objectFit: "cover",
					}}
				/>
			)}
			{editing && (
				<FileUpload
					name="profilePhoto"
					customUpload
					auto
					uploadHandler={uploadPhoto}
					accept="image/*"
					mode="basic"
					chooseLabel="Upload"
					disabled={loading}
				/>
			)}
		</div>
	);
};

export default ProfilePhotoEditor;
