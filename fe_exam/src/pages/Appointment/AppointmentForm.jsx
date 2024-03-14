import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { STATUS } from "../../shared/constants/STATUS";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useCreateAppointment,
  useFetchSingleAppointment,
  useUpdateAppointment,
} from "../../shared/dao/appointmentDao";

function AppointmentForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const ID = location.state?.id;
  const isEdit = !!ID;

  const createAppointmentMutation = useCreateAppointment();
  const updateAppointmentMutation = useUpdateAppointment();
  const { data: appointmentData } = useFetchSingleAppointment(ID);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (isEdit && appointmentData) {
      setName(appointmentData?.name);
      setDate(appointmentData?.date);
      setStatus(appointmentData?.status);
    }
  }, [appointmentData]);

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await updateAppointmentMutation.mutateAsync({
          id: ID,
          name,
          date,
          status,
        });
        alert("Appointment updated successfully");
      } else {
        await createAppointmentMutation.mutateAsync({ name, date, status });
        alert("Appointment created successfully");
      }
    } catch (error) {
      alert("Error creating appointment:", error);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col p-10">
      <p className="text-3xl font-bold mb-10">
        {isEdit ? "Update" : "Create"} Appointment
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="w-[100%] md:w-[60%]"
      >
        <Input label="Name" required={true} value={name} onChange={setName} />
        <Input
          label="Date"
          type="date"
          required={true}
          value={date}
          onChange={setDate}
        />
        <label className="block text-gray-600">Status</label>
        <select
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          required
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {STATUS.filter((s) => s !== "All").map((stat) => (
            <option key={stat}>{stat}</option>
          ))}
        </select>
        <div className="flex w-[50%] gap-5 mt-5">
          <Button value={isEdit ? "Update" : "Save"} type="submit" />
          <button
            className="bg-[#ff6666] hover:bg-[#fc7f7f] text-white font-semibold rounded-md py-2 px-4 w-full"
            onClick={() => navigate("/appointment")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AppointmentForm;
