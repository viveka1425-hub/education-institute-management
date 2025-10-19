import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import './Dashboard.css';
const ImageSlider = () => {


    const images = [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=60",
        "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=1200&q=60",
        "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=60",
    ];

    return (
        <div style={{}}>

            <div className="card-container">
                <div className="dashboard-card">
                    <div className="card-title"> <strong>Total Review</strong> <span className="icon">⭐</span> </div>
                    <div className="card-title"> 1000 </div>
                </div>
                <div className="dashboard-card">
                    <div className="card-title"><strong>Total Student </strong><span className="icon">👩‍🎓</span> </div>
                    <div className="card-title">200</div>
                </div>
                <div className="dashboard-card">
                    <div  className="card-title"><strong>Total Enquiries</strong> <span className="icon">👩‍💻</span> </div>
                    <div className="card-title"> 20 </div>
                </div>

            </div>

            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={3000}
            >
                {images.map(imageURL => <div>
                    <img src={imageURL} alt="1" />
                </div>)}


            </Carousel>
        </div>
    );
};
export default ImageSlider;