import { useState } from "react";
import MapModal from "./Map";
import { form } from "framer-motion/client";
import { useDispatch } from "react-redux";
import { addProvince } from "../../api/addProvince";

const AdminDashboard = () => {
    const [activities, setActivities] = useState({
        name: "",
        des: "",
        images: [],
        location: [{ lat: "", lng: "" }]
    });

    const [activityCategoryData, setActivityCategoryData] = useState({
        name: "",
        des: "",
        image: "",
        activities: []
    });

    const [provinceData, setProvinceData] = useState({
        name: "",
        desc: "",
        images: [],
        activityCategory: []
    });

    const dispatch = useDispatch();


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });


    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);



    const handleSelectLocation = (location) => {
        setLatitude(location.lat);
        setLongitude(location.lng);
        setMarkerPosition(location);
    
        setActivities(prevState => ({
            ...prevState,
            location: [{ lat: location.lat, lng: location.lng }], // Correct structure
        }));
    };

    const isValidImage = (file) => {
        const validTypes = ["image/jpeg", "image/png", "image/gif"];
        return validTypes.includes(file.type);
    };
    
    const uploadToCloudinary = async (file) => {
        // Make sure the file is valid before sending
        if (!isValidImage(file)) {
            throw new Error("Invalid file type");
        }
    
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ceylon_trails"); // Your Cloudinary preset
        formData.append("cloud_name", "dfag5yesz"); // Your Cloudinary cloud name
    
        const response = await fetch("https://api.cloudinary.com/v1_1/dfag5yesz/image/upload", {
            method: "POST",
            body: formData,
        });
    
        const data = await response.json();
    
        if (data.secure_url) {
            return data.secure_url; // Return the Cloudinary image URL
        } else {
            throw new Error(`Image upload failed: ${data.error.message}`);
        }
    };
    
    

    const handleProvinceImageUpload = async (e) => {
        const files = Array.from(e.target.files);
    
        try {
            const uploadedImages = await Promise.all(
                files.map(async (file) => await uploadToCloudinary(file))
            );
    
            // Wrap each image URL in an object with an `img` key
            const formattedImages = uploadedImages.map(url => ({ img: url }));
    
            setProvinceData(prevState => ({
                ...prevState,
                images: formattedImages, // Update with the correct structure
            }));
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };
    

    const handleActivityCategoryImageUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
    
        try {
            const uploadedImage = await uploadToCloudinary(file);
    
            setActivityCategoryData(prevState => ({
                ...prevState,
                image: uploadedImage, // Correct structure
            }));
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };
    
    const handleActivitiesImageUpload = async (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
    
        try {
            const uploadedImages = await Promise.all(
                files.map(async (file) => await uploadToCloudinary(file))
            );
    
            // Wrap each image URL in an object with an `img` key
            const formattedImages = uploadedImages.map(url => ({ img: url }));
    
            setActivities(prevState => ({
                ...prevState,
                images: formattedImages, // Update with the correct structure
            }));
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };
    
    const handleActivityCategorySubmit = (e) => {
        e.preventDefault();
    
        const formattedCategory = {
            name: activityCategoryData.name,
            desc: activityCategoryData.des,
            img: { img: activityCategoryData.image }, // Wrap the image URL in an object
            activities: [] // Initialize with an empty array
        };
    
        setProvinceData(prevState => ({
            ...prevState,
            activityCategory: [...prevState.activityCategory, formattedCategory],
        }));
    
        console.log(JSON.stringify({ province: provinceData }, null, 2));
    };

    const handleActivitiesSubmit = (e) => {
        e.preventDefault();
    
        const formattedActivity = {
            name: activities.name,
            desc: activities.des,
            images: activities.images, // Already formatted correctly
            locations: activities.location // Already formatted correctly
        };
    
        setProvinceData(prevState => {
            const updatedCategory = prevState.activityCategory.map(category => {
                if (category.name === activityCategoryData.name) {
                    return {
                        ...category,
                        activities: [...category.activities, formattedActivity],
                    };
                }
                return category;
            });
    
            return { ...prevState, activityCategory: updatedCategory };
        });
    
        console.log(JSON.stringify({ activities: activities }, null, 2));
    };


    const handleSubmit = async(e) => {
        e.preventDefault();
        await dispatch(addProvince(provinceData));
        console.log(JSON.stringify({ province: provinceData }, null, 2));
    };


    return (
        <div className="w-full flex flex-col">
            <div className="grid grid-cols-3 gap-x-5 w-full">
                <div className="flex flex-col relative col-span-1 mt-7 gap-y-3">
                    <label className="flex justify-center text-topic-200 text-2xl sm:text-5xl font-jomhuria">Province Detail</label>

                    <div className="flex justify-center mt-5">
                        <label className="form-control w-full max-w-xs">
                            <div className="label"><span className="label-text">Select Province</span></div>
                            <select value={provinceData.name} onChange={(e) => setProvinceData({ ...provinceData, name: e.target.value })} className="select select-bordered mt-2">
                                <option value="" disabled>Select Province</option>
                                <option value="Central Province">Central Province</option>
                                <option value="Western Province">Western Province</option>
                                <option value="Southern Province">Southern Province</option>
                                <option value="Eastern Province">Eastern Province</option>
                                <option value="Northern Province">Northern Province</option>
                                <option value="North Western Province">North Western Province</option>
                                <option value="Sabaragamuwa Province">Sabaragamuwa Province</option>
                                <option value="Uva Province">Uva Province</option>
                                <option value="North Central Province">North Central Province</option>
                            </select>
                        </label>
                    </div>

                    <div className="flex justify-center mt-5">
                        <label className="form-control w-full max-w-xs">
                            <div className="label"><span className="label-text">Province Description</span></div>
                            <textarea value={provinceData.desc} onChange={(e) => setProvinceData({ ...provinceData, desc: e.target.value })} className="textarea mt-2" placeholder="Description"></textarea>
                        </label>
                    </div>

                    <div className="flex justify-center mt-5">
                        <label className="form-control w-full max-w-xs">
                            <div className="label"><span className="label-text">Province Images</span></div>
                            <input onChange={handleProvinceImageUpload} type="file" className="file-input mt-2 w-full max-w-xs" multiple />
                        </label>
                    </div>

                    {/* <div className="mt-auto flex w-full justify-center">
                        <div className="btn w-full mb-2 btn-ghost bg-white text-black border-0 hover:text-white hover:bg-red-400 transition duration-200 shadow-md rounded-md">
                            Add
                        </div>
                    </div> */}
                </div>

                {/* =========================================================================== */}

                <div className={`flex flex-col relative col-span-1 mt-7 gap-y-3  `}>
                    <label className="flex justify-center text-topic-200 text-2xl sm:text-5xl font-jomhuria">Category Detail</label>

                    <div className="flex justify-center mt-5">
                        <label className="form-control w-full max-w-xs">
                            <div className="label"><span className="label-text">Select Activity Category</span></div>
                            <select value={activityCategoryData.name} onChange={(e) => setActivityCategoryData({ ...activityCategoryData, name: e.target.value })} className="select select-bordered mt-2">
                                <option value="" disabled>Select Activity Category</option>
                                <option value="Historical Sites">Historical Sites</option>
                                <option value="Adventure & Nature">Adventure & Nature</option>
                                <option value="Beaches & Water Sports">Beaches & Water Sports</option>
                                <option value="Cultural Experience">Cultural Experience</option>
                                <option value="Tea Plantation & Factory Tours">Tea Plantation & Factory Tours</option>
                                <option value="Wildlife & Bird Watching">Wildlife & Bird Watching</option>
                                <option value="Food & Culinary Tours">Food & Culinary Tours</option>
                                <option value="Hill Country & Scenic Views">Hill Country & Scenic Views</option>
                            </select>
                        </label>
                    </div>

                    <div className="flex justify-center mt-5">
                        <label className="form-control w-full max-w-xs">
                            <div className="label"><span className="label-text">Category Description</span></div>
                            <textarea value={activityCategoryData.des} onChange={(e) => setActivityCategoryData({ ...activityCategoryData, des: e.target.value })} className="textarea mt-2" placeholder="Description"></textarea>
                        </label>
                    </div>

                    <div className="flex justify-center mt-5">
                        <label className="form-control w-full max-w-xs">
                            <div className="label"><span className="label-text">Category Image</span></div>
                            <input onChange={handleActivityCategoryImageUpload} type="file" className="file-input mt-2 w-full max-w-xs" />
                        </label>
                    </div>

                    <div className="mt-auto flex w-full justify-center">
                        <div onClick={handleActivityCategorySubmit} className="btn w-full mb-2 btn-ghost bg-white text-black border-0 hover:text-white hover:bg-red-400 transition duration-200 shadow-md rounded-md">
                            Add Activity Category
                        </div>
                    </div>
                </div>

                {/* =========================================================================== */}

                <div className={`flex flex-col relative col-span-1 mt-7 gap-y-3 `}>
                    <label className="flex justify-center text-topic-200 text-2xl sm:text-5xl font-jomhuria">Activity Detail</label>

                    <div className="flex justify-center mt-5">
                        <label className="form-control w-full max-w-xs">
                            <div className="label"><span className="label-text">Activity Name</span></div>
                            <input type="text" placeholder="Type here" value={activities.name} onChange={(e) => setActivities({ ...activities, name: e.target.value })} className="input input-bordered mt-2 w-full max-w-xs" />
                        </label>
                    </div>

                    <div className="flex justify-center mt-5">
                        <label className="form-control w-full max-w-xs">
                            <div className="label"><span className="label-text">Activity Description</span></div>
                            <textarea value={activities.des} onChange={(e) => setActivities({ ...activities, des: e.target.value })} className="textarea mt-2" placeholder="Description"></textarea>
                        </label>
                    </div>

                    <div className="flex justify-center mt-5">
                        <label className="form-control w-full max-w-xs">
                            <div className="label"><span className="label-text">Activity Images</span></div>
                            <input onChange={handleActivitiesImageUpload} type="file" className="file-input mt-2 w-full max-w-xs" multiple />
                        </label>
                    </div>
                    <div className="grid grid-cols-2 gap-x-11 px-5">
                        <div className="flex col-span-1 justify-center mt-5">
                            <label className="form-control w-full max-w-xs">
                                <div className="label"><span className="label-text">Latitude</span></div>
                                <input type="text" placeholder="Type here" value={latitude} className="input input-bordered mt-2 w-full max-w-xs" onFocus={handleOpenModal} readOnly />
                            </label>
                        </div>
                        <div className="flex col-span-1 justify-center mt-5">
                            <label className="form-control w-full max-w-xs">
                                <div className="label"><span className="label-text">Longitude</span></div>
                                <input type="text" placeholder="Type here" value={longitude} className="input input-bordered mt-2 w-full max-w-xs" onFocus={handleOpenModal} readOnly />
                            </label>
                        </div>

                        <MapModal isOpen={isModalOpen} onClose={handleCloseModal} markerPosition={markerPosition} setMarkerPosition={handleSelectLocation} />
                    </div>
                    <div className="mt-auto flex w-full justify-center">
                        <div onClick={handleActivitiesSubmit} className="btn w-full mb-2 btn-ghost bg-white text-black border-0 hover:text-white hover:bg-red-400 transition duration-200 shadow-md rounded-md">
                            Add Activity
                        </div>
                    </div>
                </div>

            </div>
            <div className="mt-auto flex w-full justify-center">
                <div onClick={handleSubmit} className="btn w-full mb-2 btn-ghost bg-white text-black border-0 hover:text-white hover:bg-red-400 transition duration-200 shadow-md rounded-md">
                    Submit
                </div>
            </div>
        </div>

    );
};

export default AdminDashboard;