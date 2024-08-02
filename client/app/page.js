"use client";

import axios from "axios";
import { useState } from "react";

export default function Home() {
	const [selectedFile, setSelectedFile] = useState(null);
	const [url, setUrl] = useState(null);
	const [res, setRes] = useState(null);
	const [show, setShow] = useState(false);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setSelectedFile(file);

		const preview = URL.createObjectURL(file);
		setUrl(preview);
	};

	const sendPhoto = async (e) => {
		e.preventDefault();
		setShow(true);

		if (!selectedFile) {
			console.error("No file selected");
			return;
		}

		const formData = new FormData();
		formData.append("file", selectedFile);

		try {
			const response = await axios.post(
				"http://localhost:5000/upload",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			const res = response.data.res;
			setRes(+res);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<div>
				<nav class="border-gray-200 blue flex">
					<div className="p-2">
						<img src="doctor.png" alt="" className="w-20 h-20" />
					</div>
					<div class="max-w-screen-xl flex justify-center items-center  mx-auto p-4">
						<a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
							<span class="self-center text-2xl font-semibold whitespace-nowrap text-white">
								Brain Cancer Detection System
							</span>
						</a>
					</div>
				</nav>

				{!show && (
					<div className="mt-20">
						<form onSubmit={sendPhoto}>
							<div class="flex flex-col items-center justify-center mx-60">
								<label
									for="dropzone-file"
									class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer light">
									<div class="flex flex-col items-center justify-center pt-5 pb-6">
										<svg
											class="w-8 h-8 mb-4  text-black"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 20 16">
											<path
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
											/>
										</svg>
										<p class="mb-2 text-sm text-black">
											<span class="font-semibold">Click to upload</span> or drag
											and drop
										</p>
										<p class="text-xs text-black">
											SVG, PNG, JPG or GIF (MAX. 800x400px)
										</p>
									</div>
									<input
										id="dropzone-file"
										onChange={handleFileChange}
										type="file"
										class="hidden"
									/>
								</label>
								<div className="mt-5">
									<button
										type="submit"
										class="text-white but font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">
										Default
									</button>
								</div>
							</div>
						</form>
					</div>
				)}

				{show && (
					<div className="mt-20 flex mx-60   justify-center">
						<img class="max-h-60 max-w-60" src={url} alt="image description" />
					</div>
				)}

				{res != null && (
					<div className="flex justify-center mx-60">
						{res == 1 && (
							<div className="flex justify-center p-5 rounded-md light mt-5">
								<p class="text-red-600 font-bold">
									Sorry!!! You Probably have brain tumour
								</p>
							</div>
						)}
						{res == 0 && (
							<div className="flex justify-center p-5 rounded-md light mt-5">
								<p class="text-green-800 font-bold">Nice.....Your MRI looks normal</p>
							</div>
						)}
					</div>
				)}
			</div>
		</>
	);
}
