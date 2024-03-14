import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  fetchAppointment,
  fetchSingleAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../service/appointmentService";
import { useNavigate } from "react-router-dom";

export const useFetchAppointment = () => {
  return useQuery("appointment", fetchAppointment);
};

export const useFetchSingleAppointment = (id) => {
  return useQuery(
    ["single_appointment", id],
    () => fetchSingleAppointment(id),
    {
      enabled: !!id,
    }
  );
};

export const useCreateAppointment = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createAppointmentMutation = useMutation(
    (newAppointmentData) => createAppointment(newAppointmentData),
    {
      onSuccess: () => {
        queryClient.removeQueries({ queryKey: ["appointment"] });
        navigate("/appointment");
      },
    }
  );

  return createAppointmentMutation;
};

export const useUpdateAppointment = (status) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const updateAppointmentMutation = useMutation(
    (newAppointmentData) => updateAppointment(newAppointmentData),
    {
      onSuccess: () => {
        if (status) {
          queryClient.invalidateQueries("appointment");
          queryClient.removeQueries({ queryKey: ["single_appointment"] });
        } else {
          queryClient.removeQueries({ queryKey: ["appointment"] });
          queryClient.invalidateQueries("single_appointment");
        }

        navigate("/appointment");
      },
    }
  );

  return updateAppointmentMutation;
};

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation((id) => deleteAppointment(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("appointment");
    },
  });
};
