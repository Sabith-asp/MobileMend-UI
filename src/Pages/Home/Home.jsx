import React from "react";
import Hero from "../../Components/Hero/Hero";
import Table from "../../Components/Table/Tables";
import BookingForm from "@/Components/BookingForm/BookingForm";
import SelectAddress from "@/Components/Address/SelectAddress";
import Modal from "@/Components/Modal/Modal";

const Home = () => {
  return (
    <div>
      <Hero />
      <BookingForm />
      <Modal isOpen={false} head={`Select Address`}>
        <SelectAddress />
      </Modal>
    </div>
  );
};

export default Home;
