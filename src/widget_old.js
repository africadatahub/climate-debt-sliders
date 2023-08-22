import React from 'react';
import { useEffect, useRef } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import './app.scss';

import consumption from './consumption.csv';
import emissions from './emissions.csv';

export function WidgetOld() {
    const [standardOfLiving, setStandardOfLiving] = React.useState(50);
    const [amountRenewables, setAmountRenewables] = React.useState(50);
    const [emmissions, setEmmissions] = React.useState(20);
    const [energyUse, setEnergyUse] = React.useState(1.3);
    const [investmentRequired, setInvestmentRequired] = React.useState(12);
    const [annotationa, setAnnotationa] = React.useState([
        {
            "slider": "standardOfLiving",
            "content": "Everyone now has lights."
        }
    ]);
    const [consumptionData, setConsumptionData] = React.useState([]);
    const [emissionsData, setEmissionsData] = React.useState([]);

    useEffect(() => {
       setConsumptionData(consumption);
    }, []);

    useEffect(() => {
        function handleMouseUp() {
            isDragging = false;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        function handleMouseDown() {
            isDragging = true;
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        let isDragging = false;

        function handleMouseMove(event) {

            if (!isDragging) return;

            if(event.target == null || event.target.parentElement == null) return; 

            // get the closest ancestor with the class slider
            let currentSlider = event.target.closest('.slider');
            if (currentSlider == null) return;

            const maxHeight = currentSlider.offsetHeight - 20;
            const currentHeight = maxHeight - (event.clientY - currentSlider.getBoundingClientRect().top);

            if (currentHeight > 0 && currentHeight <= maxHeight) {
                currentSlider.querySelector('.sliderFg').style.height = `${currentHeight}px`;
                if(currentSlider.className.includes('amountRenewablesSlider')) {
                    setAmountRenewables(Math.round((currentHeight / maxHeight) * 100));
                } else {
                    setStandardOfLiving(Math.round((currentHeight / maxHeight) * 100));
                }
            } else if (currentHeight <= 0) {
                currentSlider.querySelector('.sliderFg').style.height = '0px';
                if(currentSlider.className.includes('amountRenewablesSlider')) {
                    setAmountRenewables(0);
                } else {
                    setStandardOfLiving(0);
                }
            }
        }

        const resizeHandles = document.querySelectorAll('.resizeHandle');
        resizeHandles.forEach(element => {
            element.addEventListener('mousedown', handleMouseDown);
        });

        return () => {
            resizeHandles.forEach(element => {
                element.removeEventListener('mousedown', handleMouseDown);
            });
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    useEffect(() => {

        setEnergyUse(standardOfLiving);
        setInvestmentRequired(amountRenewables);

        // emissions = standardOfLiving - amountRenewables / 4

        setEmmissions(standardOfLiving - amountRenewables);


    }, [standardOfLiving, amountRenewables]);

    return (
        <div className="app">
        <Container className="no-select mt-5">
            <Row>
                <Col>
                    <Row className="sliderContainer">
                        <Col>
                            <div className="sliderLabels">
                               
                                <>
                                {
                                    consumptionData.map((item, index) => {

                                        let percentage = (item.energy_demand_2030 / consumptionData[consumptionData.length - 1].energy_demand_2030) * 100; 


                                        return (
                                            <div key={index} className="sliderLabel" style={{ bottom: `${percentage}%` }}>{item.consumption_level} -</div>
                                        );
                                    })
                                }
                                </>

                            </div>
                        </Col>
                        <Col className="slider standardOfLivingSlider" xs="auto">
                            <div className="sliderBg">
                                <div className="sliderFg" style={{ height: "50%" }}>
                                    <div className="resizeHandle">
                                        <div className="resizeHandleArrow"></div>
                                    </div>
                                </div>
                                <div className="sliderFgFooter"></div>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row className="sliderContainer">
                        <Col>
                            <div className="sliderLabels">
                                <div className="sliderLabel" style={{ bottom: "0" }}>0% -</div>
                                <div className="sliderLabel" style={{ bottom: "50%" }}>50% -</div>
                                <div className="sliderLabel" style={{ bottom: "100%" }}>100% -</div>
                            </div>
                        </Col>
                        <Col className="slider amountRenewablesSlider" xs="auto">
                            <div className="sliderBg">
                                <div className="sliderFg" style={{ height: "50%" }}>
                                    <div className="resizeHandle">
                                        <div className="resizeHandleArrow"></div>
                                    </div>
                                </div>
                                <div className="sliderFgFooter"></div>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row className="sliderContainer">
                        <Col>
                            <div className="sliderLabels">
                                <div className="sliderLabel" style={{ bottom: "0" }}>0% -</div>
                                <div className="sliderLabel" style={{ bottom: "50%" }}>50% -</div>
                                <div className="sliderLabel" style={{ bottom: "100%" }}>100% -</div>
                            </div>
                        </Col>
                        <Col className="slider emissions" xs="auto">
                            <div className="sliderBg">
                                <div className="sliderFg" style={{ height: emmissions + '%' }}></div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    {energyUse}
                </Col>
                <Col>
                    {investmentRequired}
                </Col>
            </Row>
        </Container>
        </div>
    );
}