import Sidebar from "./ProfileSidebar";
import { FileBadge, Download } from "lucide-react";

// Import images
import cert1 from "../../assets/cert1.png";
import cert2 from "../../assets/cert2.png";
import cert3 from "../../assets/cert3.png";

export default function ProfileCertificates() {
  const certificates = [
    { id: 1, img: cert1 },
    { id: 2, img: cert2 },
    { id: 3, img: cert3 },
  ];

  return (
    <div className="flex bg-[#0B0B0B] text-white min-h-screen">

      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 px-12 py-10">
        <h1 className="text-[40px] font-semibold mb-10 text-left">Profile</h1>

        {/* Sub heading */}
        <div className="flex items-center gap-2 mb-4">
          <FileBadge size={22} />
          <h2 className="text-xl font-medium">My Certificates</h2>
        </div>

        <p className="text-gray-400 mb-10 text-left">
          Your earned certificates from completed courses and masterclasses.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
          {certificates.map((c) => (
            <div
              key={c.id}
              className="bg-[#151515] rounded-xl border border-[#262626] hover:border-[#3A3A3A] transition"
            >
              {/* TOP CERTIFICATE IMAGE */}
              <img
                src={c.img}
                alt="certificate"
                className="rounded-t-xl w-full h-[200px] object-cover border-b border-[#262626]"
              />

              {/* BOTTOM BAR — Figma style */}
              <div className="flex justify-between text-sm px-4 py-3">

                {/* VIEW CERTIFICATE */}
                <div className="flex items-center gap-2 text-gray-200 hover:text-white cursor-pointer transition">
                  
                 <span className="underline cursor-pointer">View Certificate</span>

                </div>

                {/* DOWNLOAD PDF */}
                <div className="flex items-center gap-2 text-gray-200 hover:text-white cursor-pointer transition">
                  <Download size={16} />
                  <span>Download PDF</span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

