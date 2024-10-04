/* eslint-disable no-unused-vars */

import Slider from "react-slick";
import { Card, Col, Media } from "reactstrap";
import companyLogo from '../../../assets/logo.png'

const LoginSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
  };
  return (
    <Col md="5" className="p-0 card-left">
      <Card className="bg-primary">
        <div className="svg-icon">
          <Media height={78} width={150} alt="" src={companyLogo} className="Img-fluid" />
        </div>
        <Slider className="single-item" {...settings}>
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div>
                <h3>Welcome to Jaisal</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy.</p>
              </div>
            </div>
          ))}
        </Slider>
      </Card>
    </Col>
  );
};

export default LoginSlider;
