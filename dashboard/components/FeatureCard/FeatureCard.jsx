import React from "react";
import { Feature } from "../../assets/Svgs/Svgs";

const FeatureCard = ({ data }) => {
  return (
    <>
      <div className="d-flex flex-column gap-2">
        {data.map((item) => (
          <div className="feature-card p-16 d-flex w-100" key={item?.id}>
            <div className="flex-shrink-0 me-10">
              <Feature color="#153f68" />
            </div>
            <div className="">
              <h4 className="aa-text-sm fw-semibold mb-5">
                {item?.label}
              </h4>
              <p className="mb-0 text-black text-opacity-50 aa-text-xs fw-normal">
                {item?.text} <span className="text-decoration-underline text-primary cursor-pointer">view</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeatureCard;
