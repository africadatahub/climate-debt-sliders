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

    
    const [showIntro, setShowIntro] = React.useState(true);
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
        0: '0GT'
    });
    const [emissionsPercent, setEmissionsPercent] = React.useState(0);

    const [fossilFuelMakeup, setFossilFuelMakeup] = React.useState(1106);

    const [lockedSlider, setLockedSlider] = React.useState('emissions');


    const [annotations, setAnnotations] = React.useState(
        {
            consumption: [
                {
                    value_start: 4,
                    value_end: 5,
                    title: "Did you know?",
                    text: "African average consumption is 560 kwh per capita per year. This is the same as the US in 1950."
                },
                {
                    value_start: 25.6,
                    value_end: 26.6,
                    title: "Did you know?",
                    text: "World average consumption is 3265 kwh per capita per year. This is the same as the US in 1970."
                },
                {
                    value_start: 60.99,
                    value_end: 71,
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
                    value_end: 21.6,
                    title: "Did you know?",
                    text: "The current energy mix is 20.6% renewable, 79.4% fossil fuel."
                },
                {
                    value_start: 33.7,
                    value_end: 34.7,
                    title: "Did you know?",
                    text: "The 2030 projected energy mix is 33.7% renewable, 66.3% fossil fuel."
                },
                {
                    value_start: 45.6,
                    value_end: 55.6,
                    title: "Did you know?",
                    text: "This is out most hopeful estimate."
                },

            ],
            emissions: [
               
                
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
                position: '0%',
                text: ''
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
                    </div>
                    <div className="intro-btn" onClick={() => setShowIntro(false)}>Start</div>
                </div>
            </div>

            <div className={showIntro ? 'widget d-none' : 'widget d-block'}>

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
                                    Annual per capita value calculated based on a projected African population of 1.6 billion
                                </div>
                            </Col>
                            <Col className="d-md-none">
                                <Row className="g-0">
                                    <Col>
                                        <h2 className="slider-value bg-consumption">{consumptionPerCapita.toLocaleString()} kwh</h2>
                                    </Col>
                                    <Col xs={4}>
                                        <h3 className="slider-value-extra">2x</h3>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>

                    <div className="tooltip-row d-none d-md-block">
                        <div class="slider-tooltip" style={{left: tooltips.consumption.position}}>
                            {tooltips.consumption.text}
                        </div>
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
                                <h2 className="slider-value bg-consumption">{consumptionPerCapita.toLocaleString()} kwh</h2>
                                <h3 className="slider-value-extra">2x Current</h3>
                            </Col>
                        </Row>
                    </div>

                    <div className="tooltip-row d-md-none">
                        <div class="slider-tooltip" style={{left: tooltips.consumption.position}}>
                            {tooltips.consumption.text}
                        </div>
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
                                    <Col xs={4}>
                                        <h3 className="slider-value-extra">2x</h3>
                                    </Col>
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

                    <div className="tooltip-row d-none d-md-block">
                        <div class="slider-tooltip" style={{left: tooltips.energyMix.position}}>
                            {tooltips.energyMix.text}
                        </div>
                    </div>
                    
                    <div className="slider-row">
                        <Row>
                            <Col>
                                <div className="slider-container">
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
                                <h3 className="slider-value-extra">2x Current</h3>
                            </Col>
                        </Row>
                    </div>

                    <div className="tooltip-row d-md-none">
                        <div class="slider-tooltip" style={{left: tooltips.energyMix.position}}>
                            {tooltips.energyMix.text}
                        </div>
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
                                <h1>CO<sub>2</sub> Emissions
                                    {/* <div className={lockedSlider == 'emissions' ? 'lock-btn locked d-none d-md-inline-block' : 'lock-btn d-none d-md-inline-block'} onClick={() => setLockedSlider('emissions')}></div> */}
                                </h1>
                            </Col>
                            <Col className="d-none d-md-block">
                                <div className="annotation-small">
                                ((consumptionPerCapita*1.65)/100)*(100-energyMix) * (fossilFuelMakeup/1000000)
                                </div>
                            </Col>
                            <Col className="d-md-none">
                                <Row className="g-0">
                                    <Col>
                                        <h2 className="slider-value bg-emissions">{emissions.toLocaleString()} Gt</h2>
                                    </Col>
                                    <Col xs={4}>
                                        <h3 className="slider-value-extra">2x</h3>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>

                    <div className="tooltip-row d-none d-md-block">
                        <div class="slider-tooltip" style={{left: tooltips.emissions.position}}>
                            {tooltips.emissions.text}
                        </div>
                    </div>

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
                                <h2 className="slider-value bg-emissions">{emissions.toLocaleString()} Gt</h2>
                                <h3 className="slider-value-extra">2x Current</h3>
                            </Col>           
                        </Row>
                    </div>

                    <div className="tooltip-row d-md-none">
                        <div class="slider-tooltip" style={{left: tooltips.emissions.position}}>
                            {tooltips.emissions.text}
                        </div>
                    </div>

                    <div className="annotation-row">
                        <Row>
                            <Col className="d-flex align-items-center">
                                <div className="annotation-wrapper">
                                    {
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
                                    }
                                </div>
                            </Col>
                        </Row>
                    </div>

                </div>

            </div>

        </>
        
    );
}