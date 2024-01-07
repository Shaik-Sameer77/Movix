import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch.jsx";
import "./style.scss";
import DetailsBanner from "./detailsBanner/DetailsBanner.jsx";
import Cast from "./cast/Cast.jsx";
import VideosSection from "./videoSection/VideoSection.jsx";
import Similar from "./carousels/Similar.jsx";
import Recommendation from "./carousels/Recommendation.jsx";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data:credits, loading:creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);

  const trailerVideo = data?.results?.find(video => video.type ==="Trailer")

  return (
    <div>
      <DetailsBanner video = {trailerVideo || data?.results?.[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading}/>
      {data?.results?.length > 0 && <VideosSection data={data} loading={loading} />}
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
    </div>
  );
};

export default Details;
