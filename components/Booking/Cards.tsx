import CardsList from "@/data/CardsList";
import Image from "next/image";
import React, { useState } from "react";

function Cards() {
  const [selectedCards, setSelectedCards] = useState<any>();
  return (
    <div>
      <h2 className="text-[14px] font-medium">Payment Method</h2>
      <div className="grid grid-cols-5 md:grid-cols-4  lg:grid-cols-5 mt-2 pl-2">
        {CardsList.map((item: any, index: number) => (
          <div
            key={index}
            className={`w-[70px] mb-1 border-[1px]
                flex items-center
                 justify-center 
                 rounded-md
                 cursor-pointer
                 hover:border-yellow-400
                 hover:scale-110 transition-all
                 ${
                   selectedCards == index
                     ? "border-yellow-400 border-[2px]"
                     : null
                 }
                `}
            onClick={() => setSelectedCards(index)}
          >
            <Image src={item.image} alt={item.name} width={30} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
