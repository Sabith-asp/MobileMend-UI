import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detailsModalOpen: false,
  selectAdressModalOpen: false,
  addAddressModalOpen: false,
  bookingEstimateModalOpen: false,
  selectTechnicianModalOpen: false,
  paymentSuccessModalOpen: false,
  userBookingModalOpen: false,
  acceptServiceModalOpen: false,
  rejectServiceModalOpen: false,
  changeServiceStatusModalOpen: false,
  addSpareModalOpen: false,
  complitionSummaryModalOpen: false,
  adminBookingDetailModalOpen: false,
  serviceDeleteModalOpen: false,
  addEditServiceModalOpen: false,
  deviceManagementModalOpen: false,
  deviceDeleteModalOpen: false,
  adminCompeletedOrder: false,
  technicianRequestDetails: false,
  ratingModalOpen: false,
  serviceDetailModalOpen: false,
  deviceDetailModalOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setDetailsModalOpen: (state) => {
      state.detailsModalOpen = !state.detailsModalOpen;
    },
    setAddressModal: (state) => {
      state.selectAdressModalOpen = !state.selectAdressModalOpen;
    },
    setAddAdressModal: (state) => {
      state.addAddressModalOpen = !state.addAddressModalOpen;
    },
    setBookingEstimateModal: (state) => {
      state.bookingEstimateModalOpen = !state.bookingEstimateModalOpen;
    },
    setSelectTechnicianModalOpen: (state) => {
      state.selectTechnicianModalOpen = !state.selectTechnicianModalOpen;
    },
    setPaymentSuccessModalOpen: (state) => {
      state.paymentSuccessModalOpen = !state.paymentSuccessModalOpen;
    },
    setUserBookingModalOpen: (state) => {
      state.userBookingModalOpen = !state.userBookingModalOpen;
    },
    setAcceptServiceModalOpen: (state) => {
      state.acceptServiceModalOpen = !state.acceptServiceModalOpen;
    },
    setRejectServiceModalOpen: (state) => {
      state.rejectServiceModalOpen = !state.rejectServiceModalOpen;
    },
    setChangeServiceStatusModalOpen: (state) => {
      state.changeServiceStatusModalOpen = !state.changeServiceStatusModalOpen;
    },
    setAddSpareModalOpen: (state) => {
      state.addSpareModalOpen = !state.addSpareModalOpen;
    },
    setComplitionSummaryModalOpen: (state) => {
      state.complitionSummaryModalOpen = !state.complitionSummaryModalOpen;
    },
    setAdminBookingDetailModalOpen: (state) => {
      state.adminBookingDetailModalOpen = !state.adminBookingDetailModalOpen;
    },
    setAddEditServiceModalOpen: (state) => {
      state.addEditServiceModalOpen = !state.addEditServiceModalOpen;
    },
    setServiceDeleteModalOpen: (state) => {
      state.serviceDeleteModalOpen = !state.serviceDeleteModalOpen;
    },
    setDeviceManagementModalOpen: (state) => {
      state.deviceManagementModalOpen = !state.deviceManagementModalOpen;
    },
    setDeviceDeleteModalOpen: (state) => {
      state.deviceDeleteModalOpen = !state.deviceDeleteModalOpen;
    },
    setAdminCompeletedOrder: (state) => {
      state.adminCompeletedOrder = !state.adminCompeletedOrder;
    },
    setTechnicianRequestDetails: (state) => {
      state.technicianRequestDetails = !state.technicianRequestDetails;
    },
    setRatingModalOpen: (state) => {
      state.ratingModalOpen = !state.ratingModalOpen;
    },
    setServiceDetailModalOpen: (state) => {
      state.serviceDetailModalOpen = !state.serviceDetailModalOpen;
    },
    setDeviceDetailModalOpen: (state) => {
      state.deviceDetailModalOpen = !state.deviceDetailModalOpen;
    },
  },
});

export const {
  setDetailsModalOpen,
  setAddressModal,
  setAddAdressModal,
  setBookingEstimateModal,
  setSelectTechnicianModalOpen,
  setPaymentSuccessModalOpen,
  setUserBookingModalOpen,
  setAcceptServiceModalOpen,
  setRejectServiceModalOpen,
  setChangeServiceStatusModalOpen,
  setAddSpareModalOpen,
  setComplitionSummaryModalOpen,
  setAdminBookingDetailModalOpen,
  setAddEditServiceModalOpen,
  setServiceDeleteModalOpen,
  setDeviceManagementModalOpen,
  setDeviceDeleteModalOpen,
  setAdminCompeletedOrder,
  setTechnicianRequestDetails,
  setRatingModalOpen,
  setServiceDetailModalOpen,
  setDeviceDetailModalOpen,
} = uiSlice.actions;
export default uiSlice.reducer;
