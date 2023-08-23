import React from 'react';
import { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Icon from '@mdi/react';
import { mdiPowerPlug, mdiAccountGroup, mdiWindPower, mdiBarrel, mdiSmog, mdiGasCylinder, mdiPineTreeFire, mdiMoleculeCo2 } from '@mdi/js';

import './app.scss';
import './widget.scss';


export function Widget() {

    

    const [consumptionData, setConsumptionData] = React.useState([
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
        0: '0%',
        20.6: '20.6% (Current)',
        33.7: '33.7% (2030)',
        45.6: '45.6%'
    });
    const [energyMix, setEnergyMix] = React.useState(20.6);
    const [emissions, setEmissions] = React.useState(560*20.6);
    const [emissionsPercent, setEmissionsPercent] = React.useState(0);

    const [fossilFuelMakeup, setFossilFuelMakeup] = React.useState(1106);

    const [tempIncrease, setTempIncrease] = React.useState(1.5);

    const [annotations, setAnnotations] = React.useState(
        {
            consumption: [
                {
                    value_start: 4,
                    value_end: 5,
                    title: "Africa Average",
                    text: "African average consumption is 560 kwh per capita per year. This is the same as the US in 1950."
                },
                {
                    value_start: 25.6,
                    value_end: 26.6,
                    title: "World Average",
                    text: "World average consumption is 3265 kwh per capita per year. This is the same as the US in 1970."
                },
                {
                    value_start: 60.99,
                    value_end: 71,
                    title: "OECD Average",
                    text: "OECD average consumption is 7773 kwh per capita per year. This is the same as the US in 2000."
                },
                {
                    value_start: 100,
                    value_end: 101,
                    title: "US Average",
                    text: "US average consumption in 2018 was 12744 kwh per capita"
                }
            ],
            energy_mix: [
                {
                    value_start: 20.6,
                    value_end: 21.6,
                    title: "Current Energy Mix",
                    text: "The current energy mix is 20.6% renewable, 79.4% fossil fuel."
                },
                {
                    value_start: 33.7,
                    value_end: 34.7,
                    title: "2030 Energy Mix",
                    text: "The 2030 projected energy mix is 33.7% renewable, 66.3% fossil fuel."
                }
            ],
            emissions: [
                {
                    value_start: 0,
                    value_end: 10,
                    title: "Current Emissions",
                    text: "At this rate, it is estimated that temperature will increase by 1.5 degrees by 2030."
                },
            ]
        }

    );
    
    
    
    
    const styles = {
        trackStyle: {
            backgroundColor: 'rgba(252, 195, 0)',
            height: '30px',
            borderRadius: '30px',
            top: '0px'
        },
        railStyle: {
            backgroundColor: 'transparent',
            height: '30px',
        },
        handleStyle: {
            borderRadius: '0',
            width: '10px',
            height: '50px',
            opacity: '0.3',
            top: '-5px'
        },
        dotStyle: {
            backgroundColor: '#000',
            borderRadius: '0px',
            borderTop: '0',
            borderLeft: '0',
            borderRight: '0',
            borderBottom: '0',
            width: '1px',
            height: '12px',
            opacity: '1'
        },
        energyMixTrackStyle: {
            backgroundColor: 'rgb(96, 206, 119)',
            height: '30px',
            borderRadius: '30px',
            top: '0px'
        },
        emissionsTrackStyle: {
            backgroundColor: 'rgb(181, 190, 189)',
            height: '30px',
            borderRadius: '30px',
            top: '0px'
        },
        emissionsDotStyle: {
            display: 'none'
        },
        emissionsHandleStyle: {
            display: 'none'
        },
        temperatureTrackStyle: {
            backgroundColor: 'none',
            background: 'linear-gradient(#e66465, #ff7700)',
            width: '30px',
        },
        temperatureDotStyle: {
            display: 'none'
        },
        temperatureHandleStyle: {
            display: 'none'
        }
    }
    

    useEffect(() => {
        let scale = {};
        consumptionData.forEach((item, index) => {
            let percentage = (item.energy_demand_2030 / consumptionData[consumptionData.length - 1].energy_demand_2030) * 100; 
            scale[percentage] = item.consumption_level;
            setConsumptionScale(scale);
        });
    }, []);

    changeConsumption = (value) => {
        let cpc = Math.round(consumptionData[consumptionData.length - 1].consumption_per_capita_kwh * (value/100));
        setConsumptionPerCapita(cpc);
        setConsumptionPerCapitaPercent(value);
    }

    changeEnergyMix = (value) => {
        setEnergyMix(value);
    }

    changeFossilFuelMakeup = (value) => {
        setFossilFuelMakeup(value);
    }

    useEffect(() => {
        let co2 = ((consumptionPerCapita*1.65)/100)*(100-energyMix) * (fossilFuelMakeup/1000000);
        setEmissions(co2);
        setEmissionsPercent(co2/0.127);

    }, [consumptionPerCapita, energyMix, fossilFuelMakeup]);

    return (
        <div className="widget">
            <div style={{backgroundColor: 'rgb(248, 211, 84, ' + (consumptionPerCapitaPercent/100 - 0.1) + ')'}} className="pt-4 px-5 pb-2 consumption">
                <Row className="consumption-text">
                    <Col md="auto">
                        <Row>
                            <Col xs="auto">
                                <div className="iconCircle">
                                    <Icon path={mdiPowerPlug} size={1.5} />
                                </div>
                            </Col>
                            <Col>
                                <div className="label">Consumption Per Capita / Year (2030)</div>
                                <h2>{consumptionPerCapita.toLocaleString()} kwh</h2>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="auto">
                        <Row>
                            <Col xs="auto">
                                <div className="iconCircle">
                                    <Icon path={mdiAccountGroup} size={1.5} />
                                </div>
                            </Col>
                            <Col>
                                <div className="label">Total for 1.6bn People / Year (2030)</div>
                                <h2>{(consumptionPerCapita*1.65).toLocaleString()} Twh</h2>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="d-flex align-items-center">
                        <div className="annotation">
                            {
                                annotations.consumption.map((item, index) => {
                                    if (consumptionPerCapitaPercent >= item.value_start && consumptionPerCapitaPercent <= item.value_end) {
                                        return (
                                            <div className="annotation">
                                                <h2>{item.title}</h2>
                                                <p>{item.text}</p>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </Col>
                </Row>
                <Row className="mt-2 mb-5">
                    <Col className="p-2">
                        <div className="slider-container">
                            <Slider
                                min={0}
                                startPoint={0}
                                marks={consumptionScale}
                                step={1}
                                onChange={changeConsumption}
                                value={consumptionPerCapitaPercent}
                                trackStyle={styles.trackStyle}
                                handleStyle={styles.handleStyle}
                                railStyle={styles.railStyle}
                                dotStyle={styles.dotStyle}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
            <div style={{backgroundColor: 'rgb(128, 202, 239,' + (energyMix/100 - 0.1) + ')'}} className="pt-2 px-5 pb-2 energymix">
                <Row className="py-3 consumption-text">
                    <Col xs="auto">
                        <Row>
                            <Col xs="auto">
                                <div className="iconCircle energymix-iconCircle">
                                    <Icon path={mdiWindPower} size={1.5} />
                                </div>
                            </Col>
                            <Col>
                                <div className="label">% Renewables in Energy Mix</div>
                                <h2>{energyMix}%</h2>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="auto">
                        <Row>
                            <Col xs="auto">
                                <div className="iconCircle energymix-iconCircle">
                                    <Icon path={fossilFuelMakeup == '1106' ? mdiBarrel : fossilFuelMakeup == '453' ? mdiGasCylinder : mdiPineTreeFire} size={1.5} />
                                </div>
                            </Col>
                            <Col xs="auto">
                                <div className="label">Fossil Fuel is Mostly</div> 
                                <Form.Select onChange={event => changeFossilFuelMakeup(event.target.value)} className="mt-1" size="sm">
                                    <option value="453">Natural Gas</option>
                                    <option value="1024">Coal</option>
                                    <option value="1106" selected>Oil</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="d-flex align-items-center">
                        <div className="annotation">
                            {
                                annotations.energy_mix.map((item, index) => {
                                    if (energyMix >= item.value_start && energyMix <= item.value_end) {
                                        return (
                                            <div className="annotation energymix-annotation">
                                                <h2>{item.title}</h2>
                                                <p>{item.text}</p>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col className="p-2">
                        <div className="slider-container">
                            <Slider
                                min={0}
                                startPoint={0}
                                marks={energyMixScale}
                                step={1}
                                onChange={changeEnergyMix}
                                value={energyMix}
                                trackStyle={styles.energyMixTrackStyle}
                                handleStyle={styles.handleStyle}
                                railStyle={styles.railStyle}
                                dotStyle={styles.dotStyle}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
            <div style={{backgroundColor: 'rgb(204, 210, 209,' + (emissionsPercent/100) + ')'}} className="pt-2 px-5 pb-2 emissions">
                <Row className="py-3 emission-text">
                    <Col xs="auto">
                        <Row>
                            <Col xs="auto">
                                <div className="iconCircle emissions-iconCircle">
                                    <Icon path={mdiSmog} size={1.5} />
                                </div>
                            </Col>
                            <Col xs="auto">
                                <div className="label">CO2 Emissions</div>
                                <h2>{emissions.toLocaleString()} Gt</h2>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col xs="auto">
                                <div className="iconCircle emissions-iconCircle">
                                    <Icon path={mdiMoleculeCo2} size={1.5} />
                                </div>
                            </Col>
                            <Col xs="auto">
                                <div className="label">% increase in Global Emissions</div>
                                <h2>{(emissions/(36.8-1.263) * 100).toLocaleString()} %</h2>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="d-flex align-items-center">
                        <div className="annotation">
                            {
                                annotations.emissions.map((item, index) => {
                                    if (consumptionPerCapitaPercent >= item.value_start && consumptionPerCapitaPercent <= item.value_end) {
                                        return (
                                            <div className="annotation emissions-annotation">
                                                <h2>{item.title}</h2>
                                                <p>{item.text}</p>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </Col>
                </Row>
                <Row className="mb-1">
                    <Col>
                        <div className="slider-container">
                            <Slider
                                min={0}
                                max={consumptionData[consumptionData.length - 1].consumption_per_capita_kwh * (1106/1000000)}
                                startPoint={0}
                                step={0.1}
                                onChange={changeConsumption}
                                value={emissions}
                                disabled
                                trackStyle={styles.emissionsTrackStyle}
                                handleStyle={styles.emissionsHandleStyle}
                                railStyle={styles.railStyle}
                                dotStyle={styles.emissionsDotStyle}
                            />
                        </div>
                    </Col>                
                </Row>
                <Row>
                    <Col>
                        <div className="caption">((consumptionPerCapita*1.65)/100)*(100-energyMix) * (fossilFuelMakeup/1000000)</div>
                    </Col>
                </Row>
            </div>
        </div>
        
    );
}