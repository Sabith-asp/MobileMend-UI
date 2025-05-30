import { Input } from "@/Components/ui/input";
import { Search } from "lucide-react";
import React, { useState } from "react";
import CompletedList from "./CompletedList";

const Completed = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Completed Orders</h2>
        <div className="flex items-center">
          <div className="relative w-[250px]  hidden lg:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bookings..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <CompletedList searchTerm={searchTerm} />
    </div>
  );
};

export default Completed;
