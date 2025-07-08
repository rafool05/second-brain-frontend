// import { useLocation, useNavigate } from "react-router-dom";
import { AllIcon } from "../icons/AllIcon";
import { BrainIcon } from "../icons/BrainIcon"
import { DocIcon } from "../icons/DocIcon";
import { XIcon } from "../icons/XIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
// import { Input } from "./Input";
import { useSearchParams } from "react-router-dom";

export const Sidebar = () => {

    const [_, setSearchParams] = useSearchParams("all");

    function handleFilter(type: string) {
        if (type === "all") {
            setSearchParams({});
        } else {
            setSearchParams({ type });
        }
    }

  return (
    <div className="fixed z-5 shadow-xl shadow-neutral-200 bg-white w-48 h-full flex flex-col justify-start py-4">
        <div className = "px-4 ">
            <BrainIcon size = "xl" variant="title"/>
        </div>
        <div className="flex flex-col p-4 gap-2 font-semibold">
        <div className="font-bold text-lg mb-4">Filters</div>
        <div
            onClick={() => handleFilter("all")}
            className="text-left px-2 py-1 hover:bg-slate-100 rounded flex items-center gap-4"
        >
            <AllIcon size = "sm" variant = "secondary"/>
            All
        </div>
        <div
            onClick={() => handleFilter("twitter")}
            className="text-left px-2 py-1 hover:bg-slate-100 rounded flex items-center gap-4"

        >
            <XIcon size = "sm" variant = "secondary"/>
            Twitter / X
        </div>
        <div
            onClick={() => handleFilter("youtube")}
            className="text-left px-2 py-1 hover:bg-slate-100 rounded flex items-center gap-4"
            
            >
            <YoutubeIcon size = "sm" variant = "secondary"/>
            YouTube
        </div>
        <div
            onClick={() => handleFilter("other")}
            className="text-left px-2 py-1 hover:bg-slate-100 rounded flex items-center gap-4"
        >
            <DocIcon size = "sm" variant = "secondary"/>
            Other
        </div>
        {/* <div className="mt-4">
            
            <Input placeHolder="Search..."></Input>
        </div> */}
        {/* <div className="mt-4 font-bold text-sm">Tags</div> */}
            {/* <div className="flex flex-col gap-1">
                <div className="text-left px-2 py-1 hover:bg-slate-100 rounded">Work</div>
                <div className="text-left px-2 py-1 hover:bg-slate-100 rounded">Learning</div>
                <div className="text-left px-2 py-1 hover:bg-slate-100 rounded">Ideas</div>
            </div> */}
        </div>
        {/* <div className="p-4 text-sm text-neutral-500">© Your App 2025</div> */}
    </div>
  );
};
