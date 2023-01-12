import React from 'react';
import Typewriter from 'typewriter-effect';
const Banner = () => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div>
                    <h1 className="text-5xl font-bold mb-2 font-mono">
                        <Typewriter
                            options={{
                                strings: ['Sell Your laptop right here!', 'Buye your best Laptop from here!'],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </h1>
                    <p className="py-3 text-lg font-medium">One of the best place for buying and selling your laptop.</p>
                    <p className="py-3 text-lg font-medium">Get the best price for your laptop.</p>
                    <p className="py-3 text-lg font-medium">We offer you best after sales service</p>
                    <button className="btn btn-primary mt-2">Let's find a laptop for you!</button>


                </div>
            </div>
        </div>
    );
}

export default Banner;