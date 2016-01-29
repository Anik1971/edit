import React from 'react';
class StoreTimings extends React.Component {
	constructor(props){
		super(props);	
	}	
	render(){
		const days = {"Monday": [{"close": 2259, "open": 830}], "Tuesday": [{"close": 1259, "open": 830}, {"close": 2259, "open": 1400}], "Friday": [{"close": 2259, "open": 830}], "Wednesday": [{"close": 2259, "open": 830}], "Thursday": [{"close": 2259, "open": 830}], "Sunday": [{"close": 2259, "open": 830}], "Saturday": [{"close": 2259, "open": 830}]}	
		const styles = {
			outerDivStyle: {
				padding: 20,
				borderBottom:'1px solid gray'
			},
			circleStyle: {
				height: 40,
				width: 40,
				borderRadius: '100%',
				background: '#76d1f2',
				lineHeight: "40px",
				textAlign: 'center'
			}
		};

		return (<div id="store-timings"> 
                    {Object.keys(days).map((day,index)=><div style={styles.outerDivStyle} key={index}><div style={styles.circleStyle}>{day.substring(0,2)}</div> {days[day].map(timing=><div>{timing.open} <span>to</span> {timing.close}</div>)}</div>)}     
                </div>);
	}
}
export default StoreTimings;