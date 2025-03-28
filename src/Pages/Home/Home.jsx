import React from "react";
import Hero from "../../Components/Hero/Hero";
import Table from "../../Components/Table/Tables";
import BookingForm from "@/Components/BookingForm/BookingForm";
import SelectAddress from "@/Components/Address/SelectAddress";
import Modal from "@/Components/Modal/Modal";
import AddAddress from "@/Components/Address/AddAddress";

const Home = () => {
  return (
    <div>
      <Hero />
      <BookingForm />
    </div>
  );
};

export default Home;
