import api from "./api";

export const updateAvailability = async (status) => {
  try {
    var response = await api.patch(`/Technician/update-availability`, {
      technicianAvailabilityStatus: status,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateServiceRequest = async (data) => {
  try {
    console.log(data);

    var response = await api.patch(`/Technician/update-service-request`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBookingsByTechnicianIdAndStatus = async (
  technicianId,
  status
) => {
  try {
    console.log(technicianId, status);

    var response = await api.get(`/Booking/get-booking`, {
      params: {
        technicianId,
        status,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateServiceStatus = async (data) => {
  try {
    console.log(data);

    var response = await api.patch(`/Technician/update-service-status`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateCurrentLocation = async (data) => {
  try {
    console.log(data);
    var response = await api.patch(`/Technician/update-current-location`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTechnicianRequests = async (data) => {
  try {
    var response = await api.get(`/Technician/get-requests`, {
      params: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getTechnicians = async (data) => {
  try {
    var response = await api.get(`/Technician/get-technicians`, {
      params: data,
    });
    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};
export const updateTechnicianRequest = async (data) => {
  try {
    console.log(data);
    var response = await api.patch(`/Technician/update-request-status`, data);

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};
export const blockTechnician = async (technicianId) => {
  try {
    var response = await api.patch(
      `/Technician/block-technician/${technicianId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteTechnician = async (technicianId) => {
  try {
    var response = await api.delete(
      `/Technician/remove-technician/${technicianId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const technicianApplication = async (data) => {
  try {
    var response = await api.post(`/Technician/technician-request`, data);
    console.log(response);

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getTechnicianDashboardData = async (data) => {
  try {
    var response = await api.get(`/Technician/dashboard-data`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};
