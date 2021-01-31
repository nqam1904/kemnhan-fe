import React, { Component } from 'react';

class ProductComponents extends Component {
    render() {
        return (
            <div class="about">
                <div class="aboutText" data-aos="fade-up" data-aos-duration="1000">
                    <h1>Why is it important that <br />   </h1>
                    <img src="img/doctor-woman-400px.png" alt="" />
                </div>
                <div class="aboutList" data-aos="fade-left" data-aos-duration="1000">
                    <ol>
                        <li>
                            <span>01</span>
                            <p>Covid-19, which is now a fast growing global pandemic. The number of confirmed cases worldwide has exceeded 25,65,000 due to rapid spreading of the virus.</p>
                        </li>
                        <li>
                            <span>02</span>
                            <p>Covid-19, spreads very easily, much easier than many other regular illnesses we deal with on a regular basis. That's what makes it so dangerous.</p>
                        </li>
                        <li>
                            <span>03</span>
                            <p>The best course of action is to stay at home prevent the spread of the disease as well as hospitals getting overwhelmed with patients who simply shoudn't be there.</p>
                        </li>
                        <li>
                            <span>04</span>
                            <p>As of today, there is no know cure and no approved vaccine for Covid-19</p>
                        </li>

                    </ol>
                </div>
            </div>
        );
    }
}

export default ProductComponents;