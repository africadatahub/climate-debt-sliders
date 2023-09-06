import React from 'react';
import { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Icon from '@mdi/react';
import { mdiLock, mdiLockOpenVariant } from '@mdi/js';

import './app.scss';
import './widget.scss';


export function Widget() {

    
    const [showIntro, setShowIntro] = React.useState(false);
    const [consumptionData, setConsumptionData] = React.useState([
        {
            consumption_level: ' ',
            population_estimate_2030: 1.65,
            consumption_per_capita_kwh: 0,
            energy_demand_2030: 0
        },
        {
            consumption_level: 'Africa',
            population_estimate_2030: 1.65,
            consumption_per_capita_kwh: 560,
            energy_demand_2030: 924
        },
        {
            consumption_level: 'World',
            population_estimate_2030: 1.65,
            consumption_per_capita_kwh: 3265,
            energy_demand_2030: 5387
        },
        {
            consumption_level: 'OECD',
            population_estimate_2030: 1.65,
            consumption_per_capita_kwh: 7773,
            energy_demand_2030: 12826
        },
        {
            consumption_level: 'EU',
            population_estimate_2030: 1.65,
            consumption_per_capita_kwh: 9000,
            energy_demand_2030: 14850
        },
        {
            consumption_level: 'US',
            population_estimate_2030: 1.65,
            consumption_per_capita_kwh: 12744,
            energy_demand_2030: 21028
        }
    ]);
    const [consumptionScale, setConsumptionScale] = React.useState({});
    const [consumptionPerCapita, setConsumptionPerCapita] = React.useState(560);
    const [consumptionPerCapitaPercent, setConsumptionPerCapitaPercent] = React.useState(4.39);

    const [energyMixScale, setEnergyMixScale] = React.useState({
        0: '0',
        20.6: '20.6',
        33.7: '33.7',
        45.6: '45.6',
        75: '75',
        100: '100'
    });
    const [energyMix, setEnergyMix] = React.useState(20.6);
    const [emissions, setEmissions] = React.useState(560*20.6);
    const [emissionsScale, setEmissionsScale] = React.useState({
        0: '0'
    });
    const [emissionsPercent, setEmissionsPercent] = React.useState(0);

    const [fossilFuelMakeup, setFossilFuelMakeup] = React.useState(1106);

    const [lockedSlider, setLockedSlider] = React.useState('emissions');


    const [annotations, setAnnotations] = React.useState(
        {
            consumption: [
                {
                    value_start: 4,
                    value_end: 25.5,
                    title: "Did you know?",
                    text: "African average consumption is 560 kwh per capita per year. This is the same as the US in 1950."
                },
                {
                    value_start: 25.6,
                    value_end: 60.98,
                    title: "Did you know?",
                    text: "World average consumption is 3265 kwh per capita per year. This is the same as the US in 1970."
                },
                {
                    value_start: 60.99,
                    value_end: 99,
                    title: "Did you know?",
                    text: "OECD average consumption is 7773 kwh per capita per year. This is the same as the US in 2000."
                },
                {
                    value_start: 100,
                    value_end: 101,
                    title: "Did you know?",
                    text: "US average consumption in 2018 was 12744 kwh per capita"
                }
            ],
            energy_mix: [
                {
                    value_start: 20.6,
                    value_end: 33.6,
                    title: "Did you know?",
                    text: "The current energy mix is 20.6% renewable, 79.4% fossil fuel."
                },
                {
                    value_start: 33.7,
                    value_end: 100,
                    title: "Did you know?",
                    text: "The 2030 projected energy mix is 33.7% renewable, 66.3% fossil fuel."
                }

            ],
            emissions: [
                // {
                //     value_start: 0,
                //     value_end: 100,
                //     title: "Did you know?",
                //     text: "This is out most hopeful estimate."
                // },
                
            ]
        }

    );

    const [tooltips, setTooltips] = React.useState(
        {
            consumption: {
                position: '0%',
                text: ''
            },
            energyMix: {
                position: '45.6%',
                text: 'Most hopeful estimate'
            },
            emissions: {
                position: '0%',
                text: ''
            }
        }
    );

    const theme = {
        consumption: '#74258b',
        energy_mix: '#228a44',
        emissions: '#ff7700'
    }
    

    useEffect(() => {
        let scale = {};
        consumptionData.forEach((item, index) => {
            let percentage = (item.energy_demand_2030 / consumptionData[consumptionData.length - 1].energy_demand_2030) * 100; 
            scale[percentage] = item.consumption_level;
            setConsumptionScale(scale);
            console.log(consumptionData[consumptionData.length - 1].consumption_per_capita_kwh * (1106/1000000));
        });
    }, []);

    let changeConsumption = (value) => {
        let cpc = Math.round(consumptionData[consumptionData.length - 1].consumption_per_capita_kwh * (value/100));
        setConsumptionPerCapita(cpc);
        setConsumptionPerCapitaPercent(value);
    }

    let changeEnergyMix = (value) => {
        setEnergyMix(value);
    }

    let changeEmissions = (value) => {
        setEmissions(value);
         let consumption = emissions / ((1.65/100)*(100-energyMix) * (fossilFuelMakeup/1000000));
        setConsumptionPerCapita(consumption);
    }

    let changeFossilFuelMakeup = (value) => {
        setFossilFuelMakeup(value);
    }

    useEffect(() => {
        let co2 = ((consumptionPerCapita*1.65)/100)*(100-energyMix) * (fossilFuelMakeup/1000000);
        setEmissions(co2);
        setEmissionsPercent(co2/0.127);

    }, [consumptionPerCapita, energyMix, fossilFuelMakeup]);

   

    return (
        
        <>

            {/***** INTRO *****/}

            <div className={showIntro ? 'widget d-block' : 'widget d-none'}>
                <div className="intro-wrapper">
                    <div className="intro-content">
                        <h1>Energy Demand in Africa</h1>
                        <p className="intro-text">These interactive sliders show how changing consumption affects emissions and what percentage of renewables are needed to offset these emissions.</p>
                    </div>
                    <div className="intro-btn" onClick={() => setShowIntro(false)}>Start</div>
                </div>
            </div>

            <div className={showIntro ? 'widget d-none' : 'widget d-block'}>

                {/***** HEADER *****/}
                <header>
                    <h1>Projected GHG emissions<div className="subtitle">based on energy consumption and sources in Africa</div></h1>
                </header>

                <div class="sliders-wrapper">

                    {/***** CONSUMPTION *****/}

                    <div className="consumption slider-wrapper">
                        <div className="title-row">
                            <Row>
                                <Col>
                                    <h1>Energy Consumption
                                        {/* <div className={lockedSlider == 'consumption' ? 'lock-btn locked d-none d-md-inline-block' : 'lock-btn d-none d-md-inline-block'} onClick={() => setLockedSlider('consumption')}></div> */}
                                    </h1>
                                </Col>
                                <Col className="d-none d-md-block" md={6} lg={8}>
                                    <div className="annotation-small">
                                        Annual per capita value calculated based on a <a href="https://www.un.org/development/desa/pd/sites/www.un.org.development.desa.pd/files/wpp2022_summary_of_results.pdf" target="_blank">projected</a> 2050 population of 2.1bn in Africa
                                    </div>
                                </Col>
                                <Col className="d-md-none">
                                    <Row className="g-0">
                                        <Col>
                                            <h2 className="slider-value bg-consumption">{consumptionPerCapita.toLocaleString(undefined, {maximumFractionDigits: 2})} kwh</h2>
                                        </Col>
                                        {/* <Col xs={4}>
                                            <h3 className="slider-value-extra">{(consumptionPerCapitaPercent/((560/12744)*100)).toLocaleString(undefined, {maximumFractionDigits: 2})}x</h3>
                                        </Col> */}
                                    </Row>
                                </Col>
                            </Row>
                        </div>

                        <div className="slider-row">
                            <Row>
                                <Col>
                                    <div className="slider-container">
                                        <Slider
                                            min={0}
                                            startPoint={0}
                                            marks={consumptionScale}
                                            step={1}
                                            onChange={changeConsumption}
                                            value={consumptionPerCapitaPercent}
                                            disabled={lockedSlider == 'consumption'}
                                        />
                                    </div>
                                </Col>
                                {/* <Col xs="auto">
                                    <div className={lockedSlider == 'consumption' ? 'lock-btn locked d-md-none' : 'lock-btn d-md-none'} onClick={() => setLockedSlider('consumption')}></div>
                                </Col> */}
                                <Col md={2} className="ps-3 d-none d-md-block">
                                    <h2 className="slider-value bg-consumption">{consumptionPerCapita.toLocaleString(undefined, {maximumFractionDigits: 2})} kwh</h2>
                                    {/* <h3 className="slider-value-extra">{(consumptionPerCapitaPercent/((560/12744)*100)).toLocaleString(undefined, {maximumFractionDigits: 2})}x Current</h3> */}
                                </Col>
                            </Row>
                        </div>
                        
                        <div className="annotation-row">
                            <Row>
                                <Col className="d-flex align-items-center">
                                    <div className="annotation-wrapper">
                                        {
                                            annotations.consumption.map((item, index) => {
                                                if (consumptionPerCapitaPercent >= item.value_start && consumptionPerCapitaPercent <= item.value_end) {
                                                    return (
                                                        <Row className="annotation">
                                                            <Col xs={12} md="auto">
                                                                <h2 className="text-consumption">{item.title}</h2>
                                                            </Col>
                                                            <Col>
                                                                <p>{item.text}</p>
                                                            </Col>
                                                        </Row>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </div>

                    </div>

                    {/***** ENERGY MIX *****/}
                    
                    <div className="energymix slider-wrapper">
                        <div className="title-row">
                            <Row>
                                <Col>
                                    <h1>Renewables <span className="d-none d-md-inline">in Energy </span>Mix
                                        {/* <div className={lockedSlider == 'energyMix' ? 'lock-btn locked d-none d-md-inline-block' : 'lock-btn d-none d-md-inline-block'} onClick={() => setLockedSlider('energyMix')}></div> */}
                                    </h1>
                                </Col>
                                <Col className="d-md-none">
                                    <Row className="g-0">
                                        <Col>
                                            <h2 className="slider-value bg-energymix">{energyMix}%</h2>
                                        </Col>
                                        {/* <Col xs={4}>
                                            <h3 className="slider-value-extra">{(energyMix/20.6).toLocaleString(undefined, {maximumFractionDigits: 2})}x</h3>
                                        </Col> */}
                                    </Row>
                                </Col>
                                <Col xs="auto" className="d-none d-md-block">
                                    <div className="label">With fossil fuel mostly being </div>
                                    <div className="fossil-fuel-makeup"> 
                                        <Form.Select onChange={event => changeFossilFuelMakeup(event.target.value)} size="sm">
                                            <option value="453">Natural Gas</option>
                                            <option value="1024">Coal</option>
                                            <option value="1106" selected>Oil</option>
                                        </Form.Select>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <div className="fuel-select-row d-md-none">
                            <Row>
                                <Col>
                                    <div className="label">With fossil fuel mostly being </div>
                                </Col>
                                <Col xs="auto">
                                    <div className="fossil-fuel-makeup"> 
                                        <Form.Select onChange={event => changeFossilFuelMakeup(event.target.value)} size="sm">
                                            <option value="453">Natural Gas</option>
                                            <option value="1024">Coal</option>
                                            <option value="1106" selected>Oil</option>
                                        </Form.Select>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        {/* <div className="tooltip-row d-none d-md-block">
                            <div class="slider-tooltip" style={{left: tooltips.energyMix.position}}>
                                {tooltips.energyMix.text}
                            </div>
                        </div> */}
                        
                        <div className="slider-row">
                            <Row>
                                <Col>
                                    <div className="slider-container">
                                        <div class="slider-tooltip" style={{left: '45.6%'}}>
                                            <svg viewBox="0 0 100 125"><path d="M17.7,19.8c2.7-0.8,5.7-0.8,8.6-0.4c3,0.4,5.9,1.3,8.7,2.4c5.3,2.1,10.2,5,14.6,8.6  c9.4,7.8,16.2,18.2,20.4,29.6c1.6,4.4,2.8,8.8,3.8,13.4C73,72.3,72,71.1,71,69.9c-3.1-3.7-6.5-7.3-10.1-10.6  c-0.7-0.6-1.8-0.5-2.6-0.2c-0.4,0.1-1.8,0.9-1.1,1.5c3.4,3.2,6.7,6.6,9.7,10.2c1.5,1.8,2.9,3.6,4.3,5.4c0.7,0.9,1.4,1.8,2,2.8  c0.4,0.5,0.7,1,1.1,1.5c0.2,0.4,0.7,0.8,0.5,1.2c-0.1,0.4,0.1,0.6,0.4,0.8c0.4,0.3,1.3,0.4,1.6,0.4c0.9-0.1,1.9-0.4,2.3-1.2  c3.7-7.2,5.7-15.2,5.8-23.3c0-0.3-0.5-0.5-0.7-0.6c-0.5-0.1-1-0.1-1.5,0C82.1,58,81,58.4,81,59.2c-0.1,5.3-1,10.5-2.7,15.5  c-2.1-11.4-6.1-22.5-12.6-32.1c-6.6-9.7-15.9-17.9-26.8-22.4c-7.2-2.9-15-4.3-22.6-2.1c-0.5,0.2-1.7,0.8-1.1,1.5  C15.7,20.4,17.1,20,17.7,19.8z"/></svg><div>{tooltips.energyMix.text}</div>
                                        </div>
                                        <Slider
                                            min={0}
                                            startPoint={0}
                                            marks={energyMixScale}
                                            step={1}
                                            onChange={changeEnergyMix}
                                            value={energyMix}
                                            disabled={lockedSlider == 'energyMix'}
                                        />
                                    </div>
                                </Col>
                                {/* <Col xs="auto">
                                    <div className={lockedSlider == 'energyMix' ? 'lock-btn locked d-md-none' : 'lock-btn d-md-none'} onClick={() => setLockedSlider('energyMix')}></div>
                                </Col> */}
                                <Col md={2} className="ps-3 d-none d-md-block">
                                    <h2 className="slider-value bg-energymix">{energyMix}%</h2>
                                    {/* <h3 className="slider-value-extra">{(energyMix/20.6).toLocaleString(undefined, {maximumFractionDigits: 2})}x Current</h3> */}
                                </Col>
                            </Row>
                        </div>
                        

                        <div className="annotation-row">
                            <Row>
                                <Col className="d-flex align-items-center">
                                    <div className="annotation-wrapper">
                                        {
                                            annotations.energy_mix.map((item, index) => {
                                                if (energyMix >= item.value_start && energyMix <= item.value_end) {
                                                    return (
                                                        <Row className="annotation">
                                                            <Col xs={12} md="auto">
                                                                <h2 className="text-energymix">{item.title}</h2>
                                                            </Col>
                                                            <Col>
                                                                <p>{item.text}</p>
                                                            </Col>
                                                        </Row>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    {/***** EMISSIONS *****/}

                    
                    
                    <div className="emissions slider-wrapper">
                        
                        <div className="title-row">
                            <Row>
                                <Col>
                                    <h1>GHG Emissions
                                        {/* <div className={lockedSlider == 'emissions' ? 'lock-btn locked d-none d-md-inline-block' : 'lock-btn d-none d-md-inline-block'} onClick={() => setLockedSlider('emissions')}></div> */}
                                    </h1>
                                </Col>
                                <Col className="d-none d-md-block">
                                    <div className="annotation-small">
                                        Measured as gigatons (GT) of C0<sub>2</sub> equivalent emissions per year
                                    </div>
                                </Col>
                                <Col className="d-md-none">
                                    <Row className="g-0">
                                        <Col>
                                            <h2 className="slider-value bg-emissions">{emissions.toLocaleString(undefined, {maximumFractionDigits: 2})} Gt</h2>
                                        </Col>
                                        {/* <Col xs={4}>
                                            <h3 className="slider-value-extra">2x</h3>
                                        </Col> */}
                                    </Row>
                                </Col>
                            </Row>
                        </div>

                        {/* <div className="tooltip-row d-none d-md-block">
                            <div class="slider-tooltip" style={{left: tooltips.emissions.position}}>
                                {tooltips.emissions.text}
                            </div>
                        </div> */}

                        <div className="slider-row">
                            <Row>
                                <Col>
                                    <div className="slider-container">
                                        <Slider
                                            min={0}
                                            max={consumptionData[consumptionData.length - 1].consumption_per_capita_kwh * (1106/1000000)}
                                            startPoint={0}
                                            marks={emissionsScale}
                                            step={0.1}
                                            onChange={changeEmissions}
                                            value={emissions}
                                            disabled={lockedSlider == 'emissions'}
                                        />
                                    </div>
                                </Col>
                                {/* <Col xs="auto">
                                    <div className={lockedSlider == 'emissions' ? 'lock-btn locked d-md-none' : 'lock-btn d-md-none'} onClick={() => setLockedSlider('emissions')}></div>
                                </Col> */}
                                <Col md={2} className="ps-3 d-none d-md-block">
                                    <h2 className="slider-value bg-emissions">{emissions.toLocaleString(undefined, {maximumFractionDigits: 2})} Gt</h2>
                                    {/* <h3 className="slider-value-extra">Current African Emissions</h3> */}
                                </Col>           
                            </Row>
                        </div>

                        {/* <div className="tooltip-row d-md-none">
                            <div class="slider-tooltip" style={{left: tooltips.emissions.position}}>
                                {tooltips.emissions.text}
                            </div>
                        </div> */}

                        <div className="annotation-row">
                            <Row>
                                <Col className="d-flex align-items-center">
                                    <div className="annotation-wrapper">
                                        {/* {
                                            annotations.emissions.map((item, index) => {
                                                if (emissionsPercent >= item.value_start && emissionsPercent <= item.value_end) {
                                                    return (
                                                        <Row className="annotation">
                                                            <Col xs={12} md="auto">
                                                                <h2 className="text-emissions">{item.title}</h2>
                                                            </Col>
                                                            <Col>
                                                                <p>{item.text}</p>
                                                            </Col>
                                                        </Row>
                                                    )
                                                }
                                            })
                                        } */}
                                        <Row className="annotation">
                                            <Col xs="auto">
                                                <h2 className="text-emissions">CURRENT GLOBAL EMISSIONS</h2>
                                            </Col>
                                            <Col xs="auto">
                                                <p>36.8 GT</p>
                                            </Col>
                                            <Col xs="auto">
                                                <h2 className="text-emissions">GLOBAL TARGET BY 2050</h2>
                                            </Col>
                                            <Col xs="auto">
                                                <p>0 GT</p>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                    </div>

                </div>
            
            </div>

        </>
        
    );
}