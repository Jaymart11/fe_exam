import { useState } from "react";
import { STATUS } from "../../shared/constants/STATUS";
import { useFetchAppointment } from "../../shared/dao/appointmentDao";
import AppoinmentCard from "./AppoinmentCard";
import { useNavigate } from "react-router-dom";

const AppointmentList = () => {
  const navigate = useNavigate();
  const { data } = useFetchAppointment();

  const [filter, setFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [search, setsearch] = useState("");
  const [open, setOpen] = useState(false);

  const filterAppointment = (appointment, filter) => {
    if (filter === "All") {
      return appointment; // Return all apps if filter is "All"
    } else {
      return appointment?.filter((app) => app.status === filter);
    }
  };

  function sortAppointments(appointments, order) {
    if (order === "ASC") {
      return appointments?.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (order === "DESC") {
      return appointments?.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return appointments?.sort((a, b) => b.id - a.id);
  }

  return (
    <div className="h-[100vh] bg-slate-200 text-center">
      <p className="text-4xl pt-5 pb-5 font-bold">Calendar App</p>
      <div className="flex w-full justify-center mb-3 items-center gap-5">
        <div>
          <div
            onClick={() => setOpen(!open)}
            className={`bg-white p-2 flex items-center justify-between rounded w-52 cursor-pointer   ${
              !filter && "text-gray-700"
            }`}
          >
            Status: {filter}
          </div>
          <ul
            className={`bg-gray-200 mt-2 w-52 overflow-y-auto absolute cursor-pointer z-50 ${
              open ? "max-h-60" : "max-h-0"
            } `}
          >
            {STATUS?.map((status) => (
              <li
                key={status}
                className={`p-2 text-sm hover:bg-[#667fff] hover:text-white
            ${status === filter && "bg-[#667fff] text-white"}`}
                onClick={() => {
                  if (status !== filter) {
                    setFilter(status);
                    setOpen(false);
                  }
                }}
              >
                {status}
              </li>
            ))}
          </ul>
        </div>
        <select
          className="w-[100px] border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="None">None</option>
          <option value="DESC">DESC</option>
          <option value="ASC">ASC</option>
        </select>
        <input
          type="text"
          className="w-[150px] border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          onChange={(e) => setsearch(e.target.value)}
          placeholder={"Search for Name"}
          value={search}
        />
      </div>
      <button
        className="bg-[#667fff] hover:bg-[#8ea0f8] text-white font-semibold rounded-md py-2 px-4 mb-3"
        onClick={() => navigate("/appointment/create")}
      >
        Add Appointment
      </button>

      <div className="h-[80%] overflow-y-scroll overflow-x-hidden">
        {sortAppointments(filterAppointment(data, filter), dateFilter)
          ?.filter((s) => s.name.includes(search))
          .map((appointmentData) => {
            return (
              <>
                <AppoinmentCard
                  key={appointmentData.id}
                  appointmentData={appointmentData}
                />
              </>
            );
          })}
      </div>
    </div>
  );
};

export default AppointmentList;
