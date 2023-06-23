

import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=berlin,madrid,london"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Aerial_view_of_Berlin_%2832881394137%29.jpg/2560px-Aerial_view_of_Berlin_%2832881394137%29.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Berlin</h1>
              <h2>{data[0]} Hotels</h2>
            </div>
          </div>
          <div className="featuredIndia">
  <div className="featuredIndiaImg">
    <img
      src="https://www.kishorepradhan.com/images/phocagallery/projects/hospitality/08CidadeGoa/thumbs/phoca_thumb_m_08cidade_goa_02.jpg"
      alt=""
      className="indiaFeaturedImg"
    />
  </div>
  <div className="featuredIndiaTitle">
    <h1>India</h1>
    <h2>{data[2]} Hotels</h2>
  </div>
</div>


          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Madrid</h1>
              <h2>{data[1]} Hotels</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://www.thetrainline.com/cms/media/1376/uk-london-tower-bridge-river-thames.jpg?mode=crop&width=800&height=800&quality=70"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>London</h1>
              <h2>{data[2]} Hotels</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;

