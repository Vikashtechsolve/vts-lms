import { useState } from "react";
import { Pencil } from "lucide-react";

const ProfileSection = () => {
  const [form, setForm] = useState({
    name: "Prakash Rajput",
    email: "prakash2209@gmail.com",
    phone: "+91 9823478903",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  return (
    <div className="flex-1 mt-20 text-white flex flex-col items-center gap-5">
      <h2 className="text-2xl relative text-left font-semibold mt-6">Profile</h2>

      <div className="relative">
        <img
          className="w-24 h-24 rounded-full bg-gray-600"
          alt="profile"
        />
        <Pencil size={18} className="absolute right-0 bottom-0 cursor-pointer" />
      </div>

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        className="bg-transparent border p-3 w-96 rounded-md"
      />

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        className="bg-transparent border p-3 w-96 rounded-md"
      />

      <input
        type="text"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        className="bg-transparent border p-3 w-96 rounded-md"
      />
    </div>
  );
};

export default ProfileSection;
