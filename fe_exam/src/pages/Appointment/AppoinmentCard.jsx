import React, { useState } from "react";
import Confirmation from "../../components/Confirmation";
import {
  useDeleteAppointment,
  useUpdateAppointment,
} from "../../shared/dao/appointmentDao";
import { useNavigate } from "react-router-dom";

const AppoinmentCard = ({ appointmentData }) => {
  const navigate = useNavigate();
  const deleteAppointmentMutation = useDeleteAppointment();
  const updateAppointmentMutation = useUpdateAppointment(true);

  const formattedDate = new Date(appointmentData?.date).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  );
  const [show, setShow] = useState(false);

  const handleUpdateStatus = (status) => {
    try {
      if (status !== appointmentData?.status) {
        updateAppointmentMutation.mutateAsync({
          id: appointmentData?.id,
          name: appointmentData?.name,
          status,
          date: appointmentData?.date,
        });

        alert("Appointment updated successfully");
      }
    } catch (err) {
      alert("Error updating appointment", err);
    }
  };
  const handleDelete = async () => {
    await deleteAppointmentMutation.mutateAsync(appointmentData.id);
    alert("Appointment deleted");
  };
  return (
    <>
      <Confirmation show={show} setShow={setShow} handleDelete={handleDelete} />
      <div
        className={`max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl border-l-8 ${
          appointmentData.status === "Pending"
            ? "border-orange-400"
            : "border-green-500"
        } relative group mb-3`}
      >
        <div className="p-4">
          <div className=" bg-[#667fff] p-2 rounded-lg">
            <p className="text-md font-bold text-white">{formattedDate}</p>
          </div>
          <div className="ml-4">
            <div className="uppercase tracking-wide text-lg text-indigo-500 font-semibold inline-block p-5">
              {appointmentData.name}
            </div>
            <div className="flex w-[50%]">
              <button
                className={`flex-1 py-2 px-4 rounded-l-md ${
                  appointmentData.status === "Pending"
                    ? "bg-orange-400 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleUpdateStatus("Pending")}
              >
                Pending
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-r-md ${
                  appointmentData.status === "Completed"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleUpdateStatus("Completed")}
              >
                Completed
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 bg-gray-100 h-full w-[20%] md:w-[15%] hidden group-hover:flex flex-col justify-around">
          <button
            className="text-green-500 hover:bg-green-200 h-full font-bold"
            onClick={() => {
              navigate("/appointment/update", {
                state: { id: appointmentData.id },
              });
            }}
          >
            Update
          </button>
          <button
            className="text-red-500 h-full hover:bg-red-200 font-bold"
            onClick={() => {
              setShow(true);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default AppoinmentCard;
