import { Link } from "react-router";
import { VideoIcon, LogInIcon, CalendarIcon, Plus } from "lucide-react";

const Workplace = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap justify-center gap-36 mt-5">
        {/* New Meeting */}
        <Link to="/workplace/new-meeting" className="flex flex-col items-center">
          <div className="w-24 h-24
           rounded-2xl bg-primary flex items-center justify-center shadow-md">
            <VideoIcon className="text-white w-9 h-9" />
          </div>
          <span className="mt-2 text-md font-medium">New Meeting</span>
        </Link>

        {/* Join */}
        <Link to="/workplace/join" className="flex flex-col items-center">
          <div className="w-24
           h-24
           rounded-2xl bg-secondary flex items-center justify-center shadow-md">
            <Plus className="text-white w-9 h-9" />
          </div>
          <span className="mt-2 text-md font-medium">Join</span>
        </Link>

        {/* Calendar */}
        <Link to="/workplace/calendar" className="flex flex-col items-center">
          <div className="w-24
           h-24
           rounded-2xl bg-accent flex items-center justify-center shadow-md">
            <CalendarIcon className="text-white w-9 h-9" />
          </div>
          <span className="mt-2 text-md font-medium">Calendar</span>
        </Link>
      </div>
    </div>
  );
};

export default Workplace;
