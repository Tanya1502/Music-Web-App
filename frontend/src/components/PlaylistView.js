import React from "react";
import Card from "./Card";

const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <div className="w-full text-white mt-8">
      <div className="text-2xl font-semibold mb-5">{titleText}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
        {cardsData.map((item) => (
          <Card
            key={item.title}
            title={item.title}
            description={item.description}
            imgUrl={item.imgUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default PlaylistView;
